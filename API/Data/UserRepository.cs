using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper) { 

            _context = context; 
            _mapper = mapper;
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
            var minDobDateTime = minDob.ToDateTime(TimeOnly.MinValue);

            var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));
            var maxDobDateTime = maxDob.ToDateTime(TimeOnly.MinValue);

            query = query.Where(u => u.DateOfBirth >= minDobDateTime && u.DateOfBirth <= maxDobDateTime);

            return await PagedList<MemberDTO>.CreateAsync(
                query.AsNoTracking().ProjectTo<MemberDTO>(_mapper.ConfigurationProvider), 
                userParams.PageNumber, 
                userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
            return user;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // if the number of state entries written to the database is greater than 0, then
            //    the method SaveChangesAsync() return True
            //    otherwise it return False
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            // we just inform the Entity Framework tracker that an entity has been updated
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
