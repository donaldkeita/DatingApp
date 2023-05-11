using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")] // route : attribute ,  .../[controller] is a place holder
    [ApiController]             // ApiController : attribute

    public class BaseApiController : ControllerBase
    {
    
    }
}
