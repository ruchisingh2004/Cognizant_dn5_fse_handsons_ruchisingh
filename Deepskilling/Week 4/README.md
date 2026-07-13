# Week 4 - JWT Authentication in ASP.NET Core Web API

## Objective
Implement JWT (JSON Web Token) Authentication in an ASP.NET Core Web API to secure endpoints and allow access only to authenticated users.

---

## Technologies Used
- ASP.NET Core Web API
- C#
- JWT (JSON Web Token)
- Swagger UI
- Visual Studio Code
- .NET 10

---

## Project Structure

JwtAuthApi
├── Controllers
│ ├── AuthController.cs
│ └── SecureController.cs
├── Models
│ ├── LoginModel.cs
│ └── User.cs
├── Properties
│ └── launchSettings.json
├── appsettings.json
├── Program.cs
└── README.md

---

## Features Implemented
- Created a Login API endpoint.
- Generated JWT tokens for valid users.
- Configured JWT Authentication and Authorization.
- Protected API endpoints using `[Authorize]`.
- Tested APIs using Swagger UI.

---

## JWT Configuration

### appsettings.json

```json
"Jwt": {
  "Key": "ThisIsMySuperSecretJwtKeyForWeek4Lab12345",
  "Issuer": "MyAuthServer",
  "Audience": "MyApiUsers"
}
```

---

## API Endpoints

### Login Endpoint

**POST**
```
/api/Auth/login
```

**Request Body**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### Protected Endpoint

**GET**
```
/api/Secure/data
```

**Response (Authorized User)**

```json
"This is protected data."
```

**Response (Unauthorized User)**

```
401 Unauthorized
```

---

## Execution Steps

1. Create an ASP.NET Core Web API project.
2. Install required NuGet packages.
3. Configure JWT settings in `appsettings.json`.
4. Configure Authentication and Authorization in `Program.cs`.
5. Create `AuthController` to generate JWT tokens.
6. Create `SecureController` and secure it using `[Authorize]`.
7. Run the application using:

```bash
dotnet run
```

8. Test APIs using Swagger UI.

---

## Output

- JWT token generated successfully after login.
- Protected API returned `401 Unauthorized` when accessed without a token.
- Only authenticated users can access secured endpoints.

---

## Learning Outcomes

- Understood the concept of JWT Authentication.
- Learned to generate and validate JWT tokens.
- Implemented Authentication and Authorization in ASP.NET Core Web API.
- Secured API endpoints using bearer tokens.

---

**Status:** Completed ✅  
**Module:** Deepskilling Week 4 - Microservices Architecture using ASP.NET Core Web API  
**Topic:** JWT Authentication in ASP.NET Core Web API