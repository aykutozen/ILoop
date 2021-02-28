using System;

namespace ILoopAPI.DTO
{
    public class UserForListDTO
    {
        public int Id{get; set;}
        public string Name { get; set; }
        public string Surname { get; set; }
        public string UserName{get; set;}
        public string Email { get; set; }

        public string Phone { get; set; }
        public DateTime BirthDay { get; set; }        
        public string Address { get; set; }
        public DateTime StartDate{get; set;}
    }
}