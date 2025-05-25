using ToDoApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ToDoApi.Services
{
    public class ToDoService
    {
        private readonly IMongoCollection<ToDo> _todoCollection;

        public ToDoService(IOptions<ToDoDatabaseSettings> toDoDatabaseSettings)
        {
            var mongoClient = new MongoClient(toDoDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(toDoDatabaseSettings.Value.DatabaseName);
            _todoCollection = mongoDatabase.GetCollection<ToDo>(toDoDatabaseSettings.Value.ToDoCollectionName);
        }

        public async Task<List<ToDo>> GetAsync() =>
            await _todoCollection.Find(_ => true).ToListAsync();

        public async Task<ToDo?> GetAsync(string id) =>
            await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(ToDo newToDo) =>
            await _todoCollection.InsertOneAsync(newToDo);

        public async Task UpdateAsync(string id, ToDo updatedToDo) =>
            await _todoCollection.ReplaceOneAsync(x => x.Id == id, updatedToDo);

        public async Task RemoveAsync(string id) =>
            await _todoCollection.DeleteOneAsync(x => x.Id == id);
    }
}
