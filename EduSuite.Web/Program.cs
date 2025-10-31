using EduSuite.Data.EduSuite.Data;
using EduSuite.Services.Implementation;
using EduSuite.Services.Interface;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register DbContext with MySQL
builder.Services.AddDbContext<EduSuiteDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("EduSuiteConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("EduSuiteConnection"))
    ));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";       // redirect when not logged in
        options.LogoutPath = "/Account/Logout";     // logout endpoint
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.SlidingExpiration = true;
    });

// Register Session
builder.Services.AddSession();

// Register your custom services (Business Layer)
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ILookupService, LookupService>();

// Add MVC services
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
app.UseRouting();

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

// Area route FIRST
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

// Default route AFTER
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();
