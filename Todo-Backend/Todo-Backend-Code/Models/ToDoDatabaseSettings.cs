namespace ToDoApi.Models
{
    public class ToDoDatabaseSettings
    {
        public string ToDoCollectionName { get; set; } = null!;
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
    }
}
