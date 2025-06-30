using Gimji.Config;
using Gimji.Data;
using Gimji.Repository.Implementations;
using Gimji.Repository.Interface;
using Gimji.Services.Implementations;
using Gimji.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MyPostgresDbContext>(options =>
    options.UseNpgsql(connectionString));

// c?u hình VN PAY
builder.Services.Configure<VNPaySettings>(builder.Configuration.GetSection("VNPay"));

// add jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
// dependency injection
builder.Services.AddScoped<CategoryRepository, CategoryService>();

builder.Services.AddScoped<ProductRepository , ProductService>();
builder.Services.AddScoped<IRoleRepository , RoleService>();
builder.Services.AddScoped<IUserRepository, UserServices>();
builder.Services.AddScoped<ImageRepository , ImageService>();

builder.Services.AddSingleton<JwtUtils>();
builder.Services.AddSingleton<BcryptUtils>();

builder.Services.AddHttpContextAccessor();
// add authorization 
// add Cross-Origin Resource Sharing
builder.Services.AddCors();

// add authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("authenticated", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("user", policy => policy.RequireRole("USER"));
    options.AddPolicy("admin", policy => policy.RequireRole("ADMIN"));
});

//
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// add controller
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

var env = builder.Environment;
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}


app.UseCors(optins => optins.WithOrigins("http://localhost:3000")
.AllowAnyMethod()
.AllowAnyHeader());

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "images")),
    RequestPath = "/images"
});

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
