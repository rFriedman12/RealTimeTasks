using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using RealTimeTasks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealTimeTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly IHubContext<TasksHub> _context;
        private string _connString;

        public TasksController(IHubContext<TasksHub> context, IConfiguration config)
        {
            _context = context;
            _connString = config.GetConnectionString("ConStr");
        }

        [Route("add")]
        [HttpPost]
        public void AddTask(TaskItem task)
        {
            var repo = new TasksRepository(_connString);
            repo.AddTask(task);
        }

        [Route("getall")]
        public List<TaskItem> GetAllTasks()
        {
            var repo = new TasksRepository(_connString);
            return repo.GetAllTasks();
        }

        [Route("starttask")]
        [HttpPost]
        public void StartTask(TaskItem task)
        {
            var repo = new TasksRepository(_connString);
            task.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.StartTask(task);
        }

        [Route("completetask")]
        [HttpPost]
        public void CompleteTask(TaskItem task)
        {
            var repo = new TasksRepository(_connString);
            repo.DeleteTask(task.Id);
        }
    }
}
