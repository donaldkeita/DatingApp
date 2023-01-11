﻿using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow; // Utc is equivalent to GMT
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        // In Entity Framework term, it is referred as navigation property
        public List<Photo> Photos { get; set; } = new();


        //public int GetAge() { return DateOfBirth.CalculateAge(); }

        // DateOfBirth = CalculateAge(DateOfBirth);    <===>    DateOfBirth.CalculateAge()
    }
}
