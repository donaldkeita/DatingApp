using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {

        public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
            IConfiguration config)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    // configurations
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // the server will validate the token by setting to true
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        // Issuer - API server
                        ValidateIssuer = false,
                        // Audience - Angular application
                        ValidateAudience = false,
                    };
                });

            return services;
        }
    }
}
