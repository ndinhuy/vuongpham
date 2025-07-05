using Gimji.Config;
using Gimji.DTO.Request.Payment;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using System.Net;
namespace Gimji.Utils
{
    public class Pay2SUtils
    {
        private readonly HttpClient _httpClient;
        private readonly Pay2SConfig _options;

        public Pay2SUtils(HttpClient httpClient, IOptions<Pay2SConfig> options)
        {
            _httpClient = httpClient;
            _options = options.Value;
        }

        public async Task<Dictionary<string, object>> CreatePaymentAsync(Pay2SRequestDTO input)
        {
            string endpoint = _options.BaseUrl;
            string orderId = input.OrderId ?? DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
            string requestId = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
            string formattedOrderInfo = _options.OrderDesc.Replace("{{orderid}}", orderId);

            // Parse bank accounts
            var bankList = new List<Dictionary<string, string>>();
            foreach (var line in input.BankAccounts.Split('\n'))
            {
                var parts = line.Split('|');
                if (parts.Length == 2)
                {
                    bankList.Add(new Dictionary<string, string>
                    {
                        { "account_number", parts[0].Trim() },
                        { "bank_id", parts[1].Trim() }
                    });
                }
            }

            // Raw hash
            string rawHash = $"accessKey={_options.AccessKey}&amount={input.Amount}&bankAccounts=Array&ipnUrl={_options.IpnUrl}&orderId={orderId}&orderInfo={formattedOrderInfo}&partnerCode={_options.PartnerCode}&redirectUrl={_options.RedirectUrl}&requestId={requestId}&requestType={_options.RequestType}";

            string signature = CreateSignature(rawHash, _options.SecretKey);

            var requestData = new
            {
                accessKey = _options.AccessKey,
                partnerCode = _options.PartnerCode,
                partnerName = _options.MerchantName,
                requestId,
                amount = input.Amount,
                orderId,
                orderInfo = formattedOrderInfo,
                orderType = _options.RequestType,
                bankAccounts = bankList,
                redirectUrl = _options.RedirectUrl,
                ipnUrl = _options.IpnUrl,
                requestType = _options.RequestType,
                signature
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(endpoint, content);
            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<Dictionary<string, object>>(result);
        }
        // Hàm tạo chữ ký HMAC SHA256
        private string CreateSignature(string rawData, string secretKey)
        {
            var key = Encoding.UTF8.GetBytes(secretKey);
            using (var hmac = new HMACSHA256(key))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }
        public bool ValidateSignature(string rspraw, string inputHash, string secretKey)
        {
            string myChecksum = PayLib.HmacSHA512(secretKey, rspraw);
            return myChecksum.Equals(inputHash, StringComparison.InvariantCultureIgnoreCase);
        }

    }

}
