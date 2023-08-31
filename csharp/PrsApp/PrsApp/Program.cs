using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PrsApp.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<PrsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevDb") ?? throw new InvalidOperationException("Connection string 'DevDb' not found.")));

// Add services to the container.

builder.Services.AddControllers();

//Remove/change before production
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.

//Remove/change before production
app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();

