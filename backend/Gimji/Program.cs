using Gimji.Config;
using Gimji.Data;
using Gimji.Repository;
using Gimji.Repository.Implementations;
using Gimji.Repository.Interface;
using Gimji.Services.Implementations;
using Gimji.Services.Interface;
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

// cau hinh pay2s
builder.Services.Configure<Pay2SConfig>(builder.Configuration.GetSection("Pay2SConfig"));
builder.Services.AddHttpClient<Pay2SUtils>();

// add jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // T? ??ng l?y access_token t? cookie n?u không có trong header
                var accessToken = context.Request.Cookies["access_token"];
                if (!string.IsNullOrEmpty(accessToken) && string.IsNullOrEmpty(context.Token))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
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

// repository + interface
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
// service + interface

builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddScoped<IRoleRepository , RoleService>();
builder.Services.AddScoped<IUserRepository, UserServices>();
builder.Services.AddScoped<ImageRepository , ImageService>();


builder.Services.AddSingleton<JwtUtils>();
builder.Services.AddSingleton<BcryptUtils>();

builder.Services.AddScoped<IDbSeeder, DbSeeder>();

builder.Services.AddHttpContextAccessor();
// add authorization 
// add Cross-Origin Resource Sharing
builder.Services.AddCors();

// add authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("authenticated", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("USER", policy => policy.RequireRole("USER"));
    options.AddPolicy("ADMIN", policy => policy.RequireRole("ADMIN"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Origin FE
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // ? Cho phép g?i credentials (cookies, auth)
    });
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
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyPostgresDbContext>();
    db.Database.Migrate(); // ?? T? ??ng update database n?u ch?a có
}

// G?I SEED ? ?ÂY ?
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<IDbSeeder>();
    await seeder.SeedAsync();
}

var env = builder.Environment;
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}




app.UseCors();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "images")),
    RequestPath = "/images"
});

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
