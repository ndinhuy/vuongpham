using Gimji.Config;
using Gimji.DTO.Request.Payment;
using Gimji.enums;
using Gimji.Repository;
using Gimji.Repository.Implementations;
using Gimji.Services.Interface;
using Gimji.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Web;

namespace Gimji.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly Pay2SUtils _pay2SUtils;
        private readonly IOrderService _orderService;
        public PaymentController(Pay2SUtils pay2SUtils , IOrderService orderService)
        {
            _pay2SUtils = pay2SUtils;
            _orderService = orderService;

        }
        // POST: PaymentController
  
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreatePayment([FromBody] Pay2SRequestDTO request)
        {
            if (string.IsNullOrWhiteSpace(request.Amount) || string.IsNullOrWhiteSpace(request.BankAccounts))
            {
                return BadRequest("Amount và BankAccounts là bắt buộc.");
            }

            try
            {
                var result = await _pay2SUtils.CreatePaymentAsync(request);
                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, $"Lỗi kết nối với Pay2S: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi nội bộ: {ex.Message}");
            }
        }
        //[HttpGet("redirect")]
        //public async Task<IActionResult> RedirectAfterPayment([FromQuery] string orderId, [FromQuery] string status)
        //{
        //    // Validate orderId
        //    var order = await _orderService.GetOrderByIdAsync(orderId);
        //    if (order == null)
        //    {
        //        return NotFound("Đơn hàng không tồn tại.");
        //    }

        //    // Cập nhật trạng thái đơn hàng nếu thanh toán thành công
        //    if (status == "success")
        //    {
        //        order.Status = OrderStatus.InProgress;
        //        await _orderService.UpdateOrderAsync(order);
        //    }

        //    // Trả về HTML thông báo thành công
        //    var html = $@"
        //    <html>
        //        <head><title>Thanh toán</title></head>
        //        <body style='font-family:sans-serif; text-align:center; padding-top: 50px'>
        //            <h1>✅ Thanh toán {(status == "success" ? "thành công" : "thất bại")}!</h1>
        //            <p>Đơn hàng: <strong>{order.id}</strong></p>
        //            <a href='https://your-frontend-site.com/order/{order.id}'>Xem chi tiết đơn hàng</a>
        //        </body>
        //    </html>
        //";

        //    return Content(html, "text/html");
        //}


    }
}
