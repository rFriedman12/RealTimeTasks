using Microsoft.EntityFrameworkCore;
using System;

namespace RealTimeTasks.Data
{
    public class TasksDataContext : DbContext
    {
        private string _connString;

        public TasksDataContext(string connString)
        {
            _connString = connString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connString);
        }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
