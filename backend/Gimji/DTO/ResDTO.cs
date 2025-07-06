namespace Gimji.DTO
{
    public class ResDTO<T>
    {
        public int Code { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }

        // Phân trang (tuỳ chọn)
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int? TotalItems { get; set; }
    }
}
