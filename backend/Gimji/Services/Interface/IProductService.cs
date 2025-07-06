using Gimji.DTO.Request.Product;
using Gimji.DTO.Respone.Product;
using Gimji.DTO;
using Gimji.Models;
using Gimji.DTO.Respone.Image;

namespace Gimji.Services.Interface
{
    public interface IProductService
    {
        Task<ResDTO<IEnumerable<Product>>> GetAllProduct(
            string? search, decimal? from, decimal? to,
            string? sortBy, int? limit, int? page = 1);

        Task<ResDTO<IEnumerable<Product>>> GetProductByCategory(
            string categoryCode, string? search, decimal? from, decimal? to,
            string? sortBy, int? limit, int? page = 1);

        Task<ResDTO<Product>> GetProductById(string id);

        Task<ResDTO<Product>> GetProductByName(string name);

        Task<ResDTO<string>> AddProduct(addProduct addProduct);

        Task<ResDTO<string>> UpdateProduct(string id, ProductDTO productDTO);

        Task<ResDTO<string>> DeleteProduct(string id);

        Task<ResDTO<ImageResponeDTO>> SaveImages(IFormFile imageFile);
        Task<ResDTO<Product>> GetProductBySlug(string slug);


    }
}
