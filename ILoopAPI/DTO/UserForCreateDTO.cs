using System;
using System.ComponentModel.DataAnnotations;

namespace ILoopAPI.DTO
{
    public class UserForCreateDTO
    {
        [Required]
        [StringLength(25,MinimumLength=3)]
        public string Name { get; set; }
        [Required]
        [StringLength(25,MinimumLength=3)]
        public string Surname { get; set; }
        [Required]
        [StringLength(25,MinimumLength=8)]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDay { get; set; }
        public string Address { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public string Password { get; set; }
    }
}