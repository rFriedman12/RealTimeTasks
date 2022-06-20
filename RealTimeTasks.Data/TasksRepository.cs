using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealTimeTasks.Data
{
    public class TasksRepository
    {
        private string _connString;

        public TasksRepository(string connString)
        {
            _connString = connString;
        }

        public void AddUser(User user, string password)
        {
            var context = new TasksDataContext(_connString);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User LogIn(string email, string password)
        {
            var context = new TasksDataContext(_connString);
            User user = context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return null;
            }

            bool passwordIsValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return passwordIsValid ? user : null;
        }

        public User GetByEmail(string email)
        {
            var context = new TasksDataContext(_connString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddTask(TaskItem task)
        {
            var context = new TasksDataContext(_connString);
            context.Tasks.Add(task);
            context.SaveChanges();
        }

        public List<TaskItem> GetAllTasks()
        {
            var context = new TasksDataContext(_connString);
            return context.Tasks.Include(t => t.User).ToList();
        }

        public void StartTask(TaskItem task)
        {
            var context = new TasksDataContext(_connString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Tasks SET UserId = {task.UserId} WHERE Id = {task.Id}");
        }

        public void DeleteTask(int id)
        {
            var context = new TasksDataContext(_connString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Tasks WHERE Id = {id}");
        }
    }
}
