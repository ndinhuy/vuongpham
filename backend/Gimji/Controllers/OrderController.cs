using Gimji.DTO.Request.Order;
using Gimji.DTO;
using Gimji.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Gimji.Services.Interface;
using Microsoft.AspNetCore.Authorization;

namespace Gimji.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [AllowAnonymous]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        //[HttpGet]
        //public async Task<IActionResult> GetAllOrders([FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string? search = null)
        //{
        //    var response = await _orderService.GetAllOrdersAsync(page, limit, search);
        //    return StatusCode(response.Code, response);
        //}


        //// GET api/<OrderController>/5
        //[HttpGet("{orderId}")]
        //public async Task<IActionResult> GetOrderById(string orderId)
        //{
        //    var result = await _orderService.GetOrderByIdAsync(orderId);
        //    return StatusCode(result.Code, result);
        //}


        // POST api/<OrderController>
        
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO orderDto)
        {
            if (orderDto == null)
                return BadRequest(new ResDTO<Order> { Code = 400, Message = "Dữ liệu không hợp lệ" });

            var result = await _orderService.CreateOrder(orderDto);
            return StatusCode(result.Code, result);
          
        }
    }
}
