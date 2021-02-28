using ILoopAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ILoopAPI.Data
{
    public class ILoopContext:IdentityDbContext<User,Role,int>
    {
        public ILoopContext(DbContextOptions<ILoopContext> options):base(options)
        {
            
        }
        public DbSet<Activity> Activities{get; set;}
    }
}