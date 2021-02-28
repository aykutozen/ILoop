using System.Collections.Generic;
using System.Threading.Tasks;
using ILoopAPI.Models;

namespace ILoopAPI.Data
{
    public interface IRepository
    {
      public  Task<User> GetUser(int id);
       public Task<IEnumerable<User>> GetUsers();
       public  Task<bool> SaveChanges();
    }
}