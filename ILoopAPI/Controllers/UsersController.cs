using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ILoopAPI.Data;
using ILoopAPI.DTO;
using ILoopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ILoopAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IRepository _repository;
        private IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public UsersController(IRepository repository, IMapper mapper, UserManager<User> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repository.GetUsers();
            var result = _mapper.Map<IEnumerable<UserForListDTO>>(users);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);
            var result = _mapper.Map<UserForListDTO>(user);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserForCreateDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = new User()
            {
                Name = model.Name,
                Surname = model.Surname,
                UserName = model.UserName,
                Email = model.Email,
                Phone = model.Phone,
                BirthDay = model.BirthDay,
                Address = model.Address,
                StartDate = DateTime.Now
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return StatusCode(201);
            }
            return BadRequest(result.Errors);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDTO model)
        {
            if (id == 0 || !ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _repository.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Name = model.Name;
            user.Surname = model.Surname;
            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Phone = model.Phone;
            user.BirthDay = model.BirthDay;
            user.Address = model.Address;
            var result = await _repository.SaveChanges();

            if (result)
            {
                return StatusCode(201);
            }
            return BadRequest();
        }    
    }
}