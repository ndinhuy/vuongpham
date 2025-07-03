namespace Gimji.DTO.Request.Payment
{
    public class Pay2SRequestDTO
    {
        public string OrderInfo { get; set; }
        public string Amount { get; set; }
        public string OrderId { get; set; } // optional
        public string BankAccounts { get; set; } // "9877644888|vcb\n88888888|tcb"
    }
}
