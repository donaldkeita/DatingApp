using API.Middleware;
using API.Extensions;
using API.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();


//------------------  Configure the HTTP pipeline  --------------------------

//   1. ExceptionHandler
app.UseMiddleware<ExceptionMiddleware>();

// 6. CORS (Cross-Origin Resource Sharing)
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("https://localhost:4200"));  // x stand for policy

// 7. Authentication
app.UseAuthentication();

// 8. Authorization
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope(); // give access to all services we have in the program class
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
