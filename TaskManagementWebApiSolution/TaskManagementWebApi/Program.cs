//using Microsoft.Data.SqlClient;

//string connectionString = "Data Source = localhost; Initial Catalog = TaskManagementdb; Persist Security Info=True; User ID = sa; Password = yourStrong**Password;Encrypt=False";

//SqlConnection connection = new SqlConnection(connectionString);

//connection.Open();

//Console.WriteLine("connection succesfully opened");

//connection.Close();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();

