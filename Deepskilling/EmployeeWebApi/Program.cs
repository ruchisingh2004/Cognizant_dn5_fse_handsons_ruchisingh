using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

// -------------------- BUILDER --------------------
var builder = WebApplication.CreateBuilder(args);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// -------------------- JWT CONFIG --------------------
var secretKey = "mysuperdupersecretkeyforjwtauthentication12345";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = "mySystem",
        ValidAudience = "myUsers",
        IssuerSigningKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

builder.Services.AddAuthorization();

// -------------------- APP BUILD --------------------
var app = builder.Build();

// Swagger middleware
app.UseSwagger();
app.UseSwaggerUI();

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// -------------------- TOKEN API --------------------
app.MapGet("/api/auth/token", () =>
{
    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(secretKey));

    var creds = new SigningCredentials(
        key,
        SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.Role, "Admin"),
        new Claim("UserId", "1")
    };

    var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
        issuer: "mySystem",
        audience: "myUsers",
        claims: claims,
        expires: DateTime.Now.AddMinutes(10),
        signingCredentials: creds
    );

    return Results.Ok(new
    {
        token = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler()
            .WriteToken(token)
    });
});

// -------------------- HARD CODED EMPLOYEES --------------------
var employees = new List<Employee>
{
    new Employee(1, "Ravi", "IT"),
    new Employee(2, "Anita", "HR"),
    new Employee(3, "John", "Finance")
};

// -------------------- GET ALL (PROTECTED) --------------------
app.MapGet("/employees", [Authorize] () =>
{
    return Results.Ok(employees);
});

// -------------------- PUT UPDATE (PROTECTED) --------------------
app.MapPut("/employees/{id}", [Authorize] (int id, Employee input) =>
{
    if (id <= 0)
        return Results.BadRequest("Invalid employee id");

    var emp = employees.FirstOrDefault(e => e.Id == id);

    if (emp == null)
        return Results.BadRequest("Invalid employee id");

    emp.Name = input.Name;
    emp.Department = input.Department;

    return Results.Ok(emp);
});

// -------------------- RUN --------------------
app.Run();

// -------------------- MODEL --------------------
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }

    public Employee(int id, string name, string department)
    {
        Id = id;
        Name = name;
        Department = department;
    }
}