using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("api/[controller]")] // route : attribute ,  .../[controller] is a place holder
    [ApiController]             // ApiController : attribute

    public class BaseApiController : ControllerBase
    {
    
    }
}
