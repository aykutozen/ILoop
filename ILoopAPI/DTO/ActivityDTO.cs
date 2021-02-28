using System;

namespace ILoopAPI.DTO
{
    public class ActivityDTO
    {

        public int Id { get; set; }
        public string Type { get; set; }
        public int Duration { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }
        public string Project { get; set; }
        public bool Status { get; set; }
        public UserForListDTO User { get; set; }
    }
}