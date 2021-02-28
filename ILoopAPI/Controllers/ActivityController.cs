using Microsoft.AspNetCore.Mvc;
using ILoopAPI.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using ILoopAPI.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ILoopAPI.DTO;
using AutoMapper;

namespace ILoopAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {

        private readonly ILoopContext _context;
        private IRepository _repository;
        private IMapper _mapper;

        public ActivityController(ILoopContext context, IRepository repository, IMapper mapper)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetActivities()
        {
            var activities = await _context.Activities.Include(x => x.User).OrderBy(x => x.Date).ToListAsync();
            var result = _mapper.Map<IEnumerable<ActivityDTO>>(activities);
            return Ok(result);
        }
        [HttpGet("GetActivitiesByUserId/{id}")]

        public async Task<ActionResult> GetActivitiesByUserId(int id)
        {
            var activities = await _context.Activities.Include(x => x.User).Where(x => x.User.Id == id).ToListAsync();
            var result = _mapper.Map<IEnumerable<ActivityDTO>>(activities);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("GetActivity/{id}")]
        public async Task<ActionResult> GetActivity(int id)
        {
            var activity = await _context.Activities.Include(x => x.User).FirstOrDefaultAsync(i => i.Id == id);
            var result = _mapper.Map<ActivityDTO>(activity);

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("GetActivityDates/{id}")]
        public async Task<ActionResult> GetActivityDates(int id)
        {
            var user = await _context.Users.Include(i => i.Activities).FirstOrDefaultAsync(i => i.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            List<DateTime> emptyActivityDates = new List<DateTime>();
            for (DateTime i = user.StartDate; i <= DateTime.Now; i = i.AddDays(1))
            {
                var u = user.Activities.FirstOrDefault(x => x.Date.Day == i.Day && x.Date.Month == i.Month && x.Date.Year == i.Year);
                if (u == null)
                {
                    emptyActivityDates.Add(i);
                }
            }

            return Ok(emptyActivityDates);
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(List<Activity> activities)
        {
            if (activities.Count() == 0)
            {
                return BadRequest();
            }
            foreach (Activity entity in activities)
            {
                User user = await _repository.GetUser(entity.User.Id);
                Activity activity = new Activity()
                {
                    Type = entity.Type,
                    Duration = entity.Duration,
                    Status = entity.Status,
                    Comment = entity.Comment,
                    Date = entity.Date,
                    Project = entity.Project,
                    User = user
                };

                _context.Activities.Add(activity);
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("SetStatusActivity")]
        public async Task<IActionResult> SetStatusActivity(ActivitySetStatusDTO item)
        {
            try
            {
                var activity = await _context.Activities.FindAsync(item.id);
                if (activity == null)
                {
                    return NotFound();
                }

                activity.Status = item.status;
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(int id, Activity entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            activity.Type = entity.Type;
            activity.Duration = entity.Duration;
            activity.Date = entity.Date;
            activity.Comment = entity.Comment;
            activity.Project = entity.Project;
            activity.Status = entity.Status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }
            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}