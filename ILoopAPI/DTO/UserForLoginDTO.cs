using System.ComponentModel.DataAnnotations;

namespace ILoopAPI.DTO
{
    public class UserForLoginDTO
    {
        [Required]
        public string UserName { get; set; }
         [Required]
        public string Password { get; set; }
    }
}