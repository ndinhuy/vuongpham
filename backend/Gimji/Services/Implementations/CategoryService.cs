using Gimji.Data;
using Gimji.DTO;
using Gimji.DTO.Request.Category;
using Gimji.Models;
using Gimji.Repository.Implementations;
using Gimji.Repository.Interface;
using Gimji.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Gimji.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository repository;

        public CategoryService(ICategoryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<ResDTO<IEnumerable<CategoryCode>>> GetAllCategory(int pageNumber = 1, int pageSize = 10)
        {
            var all = await repository.GetAllCategory();
            var paged = all.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new ResDTO<IEnumerable<CategoryCode>>
            {
                Code = 200,
                Message = "Lấy danh sách danh mục thành công",
                Data = paged,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = all.Count()
            };
        }

        public async Task<ResDTO<CategoryCode>> GetCategoryById(string id)
        {
            var category = await repository.GetCategoryById(id);
            if (category == null)
                return new ResDTO<CategoryCode> { Code = 404, Message = "Không tìm thấy danh mục", Data = null };

            return new ResDTO<CategoryCode> { Code = 200, Message = "Thành công", Data = category };
        }

        public async Task<ResDTO<IEnumerable<CategoryCode>>> GetCategoryByName(string name)
        {
            var list = await repository.GetCategoryByName(name);
            return new ResDTO<IEnumerable<CategoryCode>>
            {
                Code = 200,
                Message = "Tìm danh mục gần giống thành công",
                Data = list
            };
        }

        public async Task<ResDTO<string>> AddCategory(addCategoryCode dto)
        {
            var category = new CategoryCode
            {
                Name = dto.Name,
                Description = dto.Description,
                Image = dto.Image
            };
            await repository.AddCategory(category);
            return new ResDTO<string> { Code = 200, Message = "Thêm danh mục thành công", Data = category.CodeValue };
        }

        public async Task<ResDTO<string>> UpdateCategory(string codeValue, updateCategoryCode dto)
        {
            var category = await repository.GetCategoryById(codeValue);
            if (category == null)
                return new ResDTO<string> { Code = 404, Message = "Không tìm thấy danh mục", Data = null };

            category.Name = dto.Name;
            category.Description = dto.Description;
            category.Image = dto.Image;
            await repository.UpdateCategory(category);

            return new ResDTO<string> { Code = 200, Message = "Cập nhật thành công", Data = category.CodeValue };
        }

        public async Task<ResDTO<string>> DeleteCategory(string id)
        {
            var category = await repository.GetCategoryById(id);
            if (category == null)
                return new ResDTO<string> { Code = 404, Message = "Không tìm thấy danh mục", Data = null };

            // TODO: Check if any product belongs to this category before delete
            await repository.DeleteCategory(category);
            return new ResDTO<string> { Code = 200, Message = "Xoá danh mục thành công", Data = id };
        }

    }
}
