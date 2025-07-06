using Gimji.Data;
using Gimji.DTO;
using Gimji.DTO.Request.Product;
using Gimji.DTO.Respone.Image;
using Gimji.DTO.Respone.Product;
using Gimji.Models;
using Gimji.Repository.Implementations;
using Gimji.Repository.Interface;
using Gimji.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Gimji.Services.Implementations
{
    public class ProductService : IProductService
    {

        private readonly ICategoryRepository categoryRepository;

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IProductRepository productRepository;

        public ProductService(
                              ICategoryRepository categoryRepository,

                              IHttpContextAccessor httpContextAccessor,
                              IProductRepository productRepository)
        {

            this.categoryRepository = categoryRepository;

            this.httpContextAccessor = httpContextAccessor;
            this.productRepository = productRepository;
        }

        public async Task<ResDTO<string>> AddProduct(addProduct addProduct)
        {
            var category = await categoryRepository.GetCategoryById(addProduct.categoryId);
            if (category == null)
            {
                return new ResDTO<string> { Code = 404, Message = "Không tìm thấy danh mục", Data = null };
            }

            var product = new Product
            {
                name = addProduct.name,
                price = addProduct.price,
                description = addProduct.description,
                nsn = addProduct.nsn,
                Slug = GenerateSlug(addProduct.name),
                image1 = addProduct.image1,
                image2 = addProduct.image2,
                image3 = addProduct.image3,
                category = category
            };

            await productRepository.AddProduct(product);
            return new ResDTO<string> { Code = 200, Message = "Thêm sản phẩm thành công", Data = product.productID };
        }

        public async Task<ResDTO<string>> DeleteProduct(string id)
        {
            var exist = await productRepository.DoesItemExist(id);
            if (!exist)
                return new ResDTO<string> { Code = 404, Message = "Không tìm thấy sản phẩm", Data = null };

            await productRepository.DeleteProduct(id);
            return new ResDTO<string> { Code = 200, Message = "Xoá sản phẩm thành công", Data = id };
        }

        public async Task<ResDTO<Product>> GetProductById(string id)
        {
            var product = await productRepository.GetProductById(id);
            if (product == null)
                return new ResDTO<Product> { Code = 404, Message = "Không tìm thấy sản phẩm", Data = null };

            product.ImageSrc = GetImageUrl(product.image1);
            return new ResDTO<Product> { Code = 200, Message = "Lấy sản phẩm thành công", Data = product };
        }

        public async Task<ResDTO<Product>> GetProductByName(string name)
        {
            var product = await productRepository.GetProductByName(name);
            if (product == null)
                return new ResDTO<Product> { Code = 404, Message = "Không tìm thấy sản phẩm theo tên", Data = null };

            product.ImageSrc = GetImageUrl(product.image1);
            return new ResDTO<Product> { Code = 200, Message = "Lấy sản phẩm thành công", Data = product };
        }

        public async Task<ResDTO<IEnumerable<Product>>> GetAllProduct(string? search, decimal? from, decimal? to, string? sortBy, int? limit, int? page = 1)
        {
            var products = await productRepository.GetAllProduct(search, from, to, sortBy, limit, page);
            foreach (var p in products)
            {
                p.ImageSrc = GetImageUrl(p.image1);
            }
            return new ResDTO<IEnumerable<Product>>
            {
                Code = 200,
                Message = "Lấy danh sách sản phẩm thành công",
                Data = products,
                PageNumber = page,
                PageSize = limit,
                TotalItems = products.Count()
            };
        }

        public async Task<ResDTO<IEnumerable<Product>>> GetProductByCategory(string categoryCode, string? search, decimal? from, decimal? to, string? sortBy, int? limit, int? page = 1)
        {
            var products = await productRepository.GetProductByCategory(categoryCode, search, from, to, sortBy, limit, page);
            foreach (var p in products)
            {
                p.ImageSrc = GetImageUrl(p.image1);
            }
            return new ResDTO<IEnumerable<Product>>
            {
                Code = 200,
                Message = "Lấy danh sách sản phẩm theo danh mục thành công",
                Data = products,
                PageNumber = page,
                PageSize = limit,
                TotalItems = products.Count()
            };
        }

        public async Task<ResDTO<string>> UpdateProduct(string id, ProductDTO productDTO)
        {
            var product = await productRepository.GetProductById(id);
            if (product == null)
                return new ResDTO<string> { Code = 404, Message = "Không tìm thấy sản phẩm cần cập nhật", Data = null };

            var category = await categoryRepository.GetCategoryById(productDTO.categoryId);
            if (category == null)
                return new ResDTO<string> { Code = 404, Message = "Không tìm thấy danh mục", Data = null };

            product.name = productDTO.name;
            product.image1 = productDTO.image1;
            product.image2 = productDTO.image2;
            product.image3 = productDTO.image3;
            product.description = productDTO.description;
            product.nsn = productDTO.nsn;
            product.Slug = GenerateSlug(productDTO.name);
            product.category = category;

            await productRepository.UpdateProduct(product);
            return new ResDTO<string> { Code = 200, Message = "Cập nhật sản phẩm thành công", Data = product.productID };
        }

        public async Task<ResDTO<ImageResponeDTO>> SaveImages(IFormFile imageFile)
        {
            try
            {
                string imageName = await productRepository.SaveImages(imageFile);
                ImageResponeDTO res = new ImageResponeDTO();
                res.fileName = imageName;
                return new ResDTO<ImageResponeDTO> { Code = 200, Message = "Tải ảnh thành công", Data = res };
            }
            catch (Exception ex)
            {
                return new ResDTO<ImageResponeDTO> { Code = 500, Message = "Lỗi khi lưu ảnh: " + ex.Message, Data = null };
            }
        }

        // =================== Helper ===================
        private string GetImageUrl(string fileName)
        {
            var request = httpContextAccessor.HttpContext.Request;
            return $"{request.Scheme}://{request.Host}{request.PathBase}/images/{fileName}";
        }

        public string GenerateSlug(string name)
        {
            string slug = name.ToLowerInvariant()
                .Replace(" ", "-")
                .Replace("đ", "d")
                .Normalize(System.Text.NormalizationForm.FormD);

            // Loại bỏ ký tự không phải chữ cái
            slug = new string(slug.Where(c => char.IsLetterOrDigit(c) || c == '-').ToArray());

            return slug;
        }
        public async Task<ResDTO<Product>> GetProductBySlug(string slug)
        {
            var product = await productRepository.GetProductBySlug(slug);
            if (product == null)
            {
                return new ResDTO<Product>
                {
                    Code = 404,
                    Message = "Không tìm thấy sản phẩm theo đường dẫn (slug)",
                    Data = null
                };
            }

            return new ResDTO<Product>
            {
                Code = 200,
                Message = "Lấy sản phẩm theo slug thành công",
                Data = product
            };
        }

    }
}
