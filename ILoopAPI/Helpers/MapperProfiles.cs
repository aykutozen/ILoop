using AutoMapper;
using ILoopAPI.DTO;
using ILoopAPI.Models;

namespace ILoopAPI.Helpers
{
    public class MapperProfiles:Profile
    {
        public MapperProfiles()
        {
            CreateMap<User,UserForListDTO>();
            CreateMap<Activity,ActivityDTO>().ForMember(dest=>dest.User,opt=>
            opt.MapFrom(src=>src.User)
            );          
        }
    }
}