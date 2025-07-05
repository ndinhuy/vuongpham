namespace Gimji.Config
{
    public class Pay2SConfig
    {
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public string MerchantName { get; set; }
        public string PartnerCode { get; set; }
        public string RedirectUrl { get; set; }
        public string BaseUrl { get; set; }
        
        public string IpnUrl { get; set; }
        public string RequestType { get; set; } = "pay2s";
        public string OrderDesc { get; set; } = "DH{{orderid}}";
    }
}
