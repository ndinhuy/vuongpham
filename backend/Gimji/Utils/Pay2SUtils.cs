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
            string endpoint = "https://payment.pay2s.vn/v1/gateway/api/create";
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

        private string CreateSignature(string rawData, string secretKey)
        {
            var key = Encoding.UTF8.GetBytes(secretKey);
            using (var hmac = new HMACSHA256(key))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }
        public string CreateRequestUrl(string baseUrl, string vnp_HashSecret)
        {
            StringBuilder data = new StringBuilder();
            foreach (KeyValuePair<string, string> kv in _requestData)
            {
                if (!String.IsNullOrEmpty(kv.Value))
                {
                    data.Append(WebUtility.UrlEncode(kv.Key) + "=" + WebUtility.UrlEncode(kv.Value) + "&");
                }
            }
            string queryString = data.ToString();

            baseUrl += "?" + queryString;
            String signData = queryString;
            if (signData.Length > 0)
            {

                signData = signData.Remove(data.Length - 1, 1);
            }
            string vnp_SecureHash = HmacSHA512(vnp_HashSecret, signData);
            baseUrl += "vnp_SecureHash=" + vnp_SecureHash;

            return baseUrl;
        }
    }

}
