namespace TaskManagementWebApi.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string? Name { get; set; }
        public string? eMail { get; set; }
        public string? password { get; set; }

    }
}
