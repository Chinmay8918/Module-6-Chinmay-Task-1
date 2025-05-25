using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Models
{
    public class ToDo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title can't exceed 100 characters")]
        public string Title { get; set; } = null!;

        // ✅ Store checklist items as a list of strings
        public List<string> Description { get; set; } = new();

        public bool IsCompleted { get; set; }
    }
}
