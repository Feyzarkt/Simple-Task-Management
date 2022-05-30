namespace TaskManagementWebApi.Models
{
    public class Board
    {
        public Guid BoardId { get; set; }
        public string Name { get; set; }
        public Guid OwnerId { get; set; }
    }
}
