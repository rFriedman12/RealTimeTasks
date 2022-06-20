using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using RealTimeTasks.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealTimeTasks.Web
{
    public class TasksHub : Hub
    {
        private string _connString;

        public TasksHub(IConfiguration config)
        {
            _connString = config.GetConnectionString("ConStr");
        }

        public void TaskUpdated()
        {
            var repo = new TasksRepository(_connString);
            Clients.All.SendAsync("updatedTasks", repo.GetAllTasks());
        }
    }
}
