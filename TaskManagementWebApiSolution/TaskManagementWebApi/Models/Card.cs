namespace TaskManagementWebApi.Models
{
    public class Card
    {
        public Guid? CardId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid BoardId { get; set; }
        public DateTime Deadline { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
}
