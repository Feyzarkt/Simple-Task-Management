
using Microsoft.Data.SqlClient;
using System.Data.Common;

string dbProviderName = "Microsoft.Data.SqlClient";
DbProviderFactories.RegisterFactory(dbProviderName, SqlClientFactory.Instance);
DbProviderFactories.RegisterFactory("System.Data.SqlClient", SqlClientFactory.Instance);




//using Microsoft.Data.SqlClient;

//string connectionString = "Data Source = localhost; Initial Catalog = TaskManagementdb; Persist Security Info=True; User ID = sa; Password = yourStrong**Password;Encrypt=False";

//SqlConnection connection = new SqlConnection(connectionString);

//connection.Open();

//Console.WriteLine("connection succesfully opened");

//connection.Close();

var builder = WebApplication.CreateBuilder(args);



var devCorsPolicy = "devCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(devCorsPolicy, builder => {
        builder.WithOrigins("http://localhost:8000").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        //builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        //builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        //builder.SetIsOriginAllowed(origin => true);
    });
});




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
    app.UseCors(devCorsPolicy);
}


//app.UseAuthorization();

app.MapControllers();

app.Run();

