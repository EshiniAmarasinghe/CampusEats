using System.Text;
using CampusEats.Api.Data;
using CampusEats.Api.Models;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.
builder.Services.AddControllers();

// Add DbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// Registered as Scoped because AppDbContext is Scoped by default
builder.Services.AddScoped<IMenuService, MenuService>();

// 2. JWT Configuration
var jwt = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwt["Key"]!);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt => opt.TokenValidationParameters = new()
    {
        ValidateIssuer = true,
        ValidIssuer = jwt["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwt["Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = true
    });
builder.Services.AddAuthorization();

// 3. Configure Swagger/OpenAPI with Bearer Token UI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "Paste ONLY the token - no 'Bearer' prefix."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme { Reference = new OpenApiReference 
            { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
            Array.Empty<string>()
        }
    });
});

// 4. Build the application
var app = builder.Build();

// 5. Seed Data safely
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    try 
    {
        // This will only run if the database and tables actually exist
        if (!db.MenuItems.Any())
        {
            db.MenuItems.AddRange(
                new MenuItem { Name = "Kottu Roti", Price = 750m, Category = "Mains" },
                new MenuItem { Name = "Fried Rice", Price = 850m, Category = "Mains" },
                new MenuItem { Name = "Watalappan", Price = 350m, Category = "Dessert" }
            );
            db.SaveChanges();
        }
    }
    catch
    {
        // We catch and ignore errors here during the very first migration
        // because the database tables do not exist yet.
    }
}

// 6. Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Auth Middleware (ORDER MATTERS: Authentication must come before Authorization)
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();