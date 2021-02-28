using System;

namespace ILoopAPI.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Duration { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }
        public string Project { get; set; }
        public bool Status { get; set; }

        public User User{get; set;}


    }
}