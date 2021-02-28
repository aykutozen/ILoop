using System.Collections.Generic;
using System.Threading.Tasks;
using ILoopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ILoopAPI.Data
{
    public class Repository : IRepository
    {

        private readonly ILoopContext _context;
        public Repository(ILoopContext context)
        {
            _context = context;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(i => i.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
             var users = await _context.Users.ToListAsync();
            return users;
        }
        public async Task<bool> SaveChanges()
        {
             return await _context.SaveChangesAsync() > 0;
        }
    }
}