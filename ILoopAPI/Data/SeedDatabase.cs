using System.Linq;
using System.Threading.Tasks;
using ILoopAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace ILoopAPI.Data
{
    public class SeedDatabase
    {
        public static async Task Seed(RoleManager<Role> roleManager, UserManager<User> userManager)
        {
            if (!roleManager.Roles.Any())
            {
                var adminRole = new Role();
                adminRole.Name = "Admin";
                await roleManager.CreateAsync(adminRole);

                var defaultRole = new Role();
                defaultRole.Name = "Default";
                await roleManager.CreateAsync(defaultRole);

            }
            if (!userManager.Users.Any())
            {
                User user = new User()
                {
                    Name = "Aykut",
                    Surname = "Özen",
                    UserName = "aykut.ozen",
                    Email = "ayktozn20@gmail.com",
                    Phone = "5556665522",
                    BirthDay = new System.DateTime(1996, 10, 26),
                    Address = "Topraklık mah. 2020 sk. no:4 daire:2 Denizli",
                    StartDate = new System.DateTime(2019, 12, 23)

                };
                await userManager.CreateAsync(user, "Aabc11*");
                await userManager.AddToRoleAsync(user, "Default");
                User user2 = new User()
                {
                    Name = "Ali",
                    Surname = "Akkaya",
                    UserName = "ali.akkaya",
                    Email = "aliakkaya@gmail.com",
                    Phone = "5556665524",
                    BirthDay = new System.DateTime(1996, 10, 26),
                    Address = "Üsküdar mah 212 sok. no:30 daire:2 İstanbul",
                    StartDate = new System.DateTime(2019, 12, 23)

                };
                await userManager.CreateAsync(user2, "Aabc11*");
                await userManager.AddToRoleAsync(user2, "Default");


                User admin = new User()
                {
                    Name = "Murat",
                    Surname = "Markaryan",
                    UserName = "murat.markaryan",
                    Email = "murat.markaryan@gmail.com",
                    Phone = "5556665523",
                    BirthDay = new System.DateTime(1996, 10, 26),
                    Address = "Levent mah. 2021 sk. no:5 daire:4 İstanbul",
                    StartDate = new System.DateTime(2019, 12, 23)

                };
                await userManager.CreateAsync(admin, "Aabc11*");
                await userManager.AddToRoleAsync(admin, "Admin");
            }


        }
    }
}