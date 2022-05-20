using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using Domain;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// add services to container

builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
})
                .AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Configure http request pipeline

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}

// app.UseHttpsRedirection();

app.UseRouting();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception exception)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(exception, "An error occured during migration");
}

await app.RunAsync();


// namespace API
// {
//     public class Program
//     {
//         public static async Task Main(string[] args)
//         {
//             AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
//             var host = CreateHostBuilder(args).Build();

//             using var scope = host.Services.CreateScope();

//             var services = scope.ServiceProvider;

//             try
//             {
//                 var context = services.GetRequiredService<DataContext>();
//                 var userManager = services.GetRequiredService<UserManager<AppUser>>();
//                 await context.Database.MigrateAsync();
//                 await Seed.SeedData(context, userManager);
//             }
//             catch (Exception exception)
//             {
//                 var logger = services.GetRequiredService<ILogger<Program>>();
//                 logger.LogError(exception, "An error occured during migration");
//             }

//             await host.RunAsync();
//         }

//         public static IHostBuilder CreateHostBuilder(string[] args) =>
//             Host.CreateDefaultBuilder(args)
//                 .ConfigureWebHostDefaults(webBuilder =>
//                 {
//                     webBuilder.UseStartup<Startup>();
//                 });
//     }
// }
