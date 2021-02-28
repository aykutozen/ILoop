using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace ILoopAPI.Models
{

    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDay { get; set; }
        public string Address { get; set; }
        public DateTime StartDate { get; set; }
      
       public List<Activity> Activities{get; set;}
    }
}