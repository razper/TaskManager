using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Data;
using TaskManager.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManager.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public TodosController(ApplicationDbContext applicationDbContext , UserManager<ApplicationUser> userManager)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
        }
        // GET: api/<TodosController>
        [HttpGet]
        public async Task<IEnumerable<TodoItem>> Get()
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
            var query = _applicationDbContext.Todos.Where(x => x.ApplicationUserID == applicationUser.Id);
            var todos = await query.ToListAsync();
            return todos;
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public async Task<TodoItem> Get(int id)
        {
            return await _applicationDbContext.Todos.FirstOrDefaultAsync(x => x.Id == id );
        }

        // POST api/<TodosController>
        [HttpPost]
        public async Task<TodoItem> Post([FromBody] TodoItem value)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
            value.ApplicationUser = applicationUser;
            value.ApplicationUserID = applicationUser.Id;
            _applicationDbContext.Todos.Add(value);
            await _applicationDbContext.SaveChangesAsync();
            return value;
        }

        // PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] TodoItem value)
        {
            ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
            value.ApplicationUser = applicationUser;
            value.ApplicationUserID = applicationUser.Id;
            _applicationDbContext.Todos.Update(value);
            await _applicationDbContext.SaveChangesAsync();
        }

        // DELETE api/<TodosController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _applicationDbContext.Todos.FindAsync(id);
            if(entity == null)
            {
                 return NotFound();
            }
            _applicationDbContext.Todos.Remove(entity);
            await _applicationDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
