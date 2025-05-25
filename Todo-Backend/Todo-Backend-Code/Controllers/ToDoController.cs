using Microsoft.AspNetCore.Mvc;
using ToDoApi.Models;
using ToDoApi.Services;

namespace ToDoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService;

        public ToDoController(ToDoService toDoService) =>
            _toDoService = toDoService;

        [HttpGet]
        public async Task<List<ToDo>> Get() =>
            await _toDoService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<ToDo>> Get(string id)
        {
            var todo = await _toDoService.GetAsync(id);

            if (todo is null)
                return NotFound();

            return todo;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ToDo newToDo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _toDoService.CreateAsync(newToDo);
            return CreatedAtAction(nameof(Get), new { id = newToDo.Id }, newToDo);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, [FromBody] ToDo updatedToDo)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var todo = await _toDoService.GetAsync(id);

            if (todo is null)
                return NotFound();

            updatedToDo.Id = todo.Id;
            await _toDoService.UpdateAsync(id, updatedToDo);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var todo = await _toDoService.GetAsync(id);

            if (todo is null)
                return NotFound();

            await _toDoService.RemoveAsync(id);
            return NoContent();
        }
    }
}
