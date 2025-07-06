
using Gimji.DTO.Request.Category;
using Gimji.DTO;
using Gimji.Models;

namespace Gimji.Services.Interface
{
    public interface ICategoryService
    {
        Task<ResDTO<IEnumerable<CategoryCode>>> GetAllCategory(int pageNumber = 1, int pageSize = 10);
        Task<ResDTO<CategoryCode>> GetCategoryById(string id);
        Task<ResDTO<IEnumerable<CategoryCode>>> GetCategoryByName(string name);
        Task<ResDTO<string>> AddCategory(addCategoryCode categoryCode);
        Task<ResDTO<string>> UpdateCategory(string codeValue, updateCategoryCode updateCategoryCode);
        Task<ResDTO<string>> DeleteCategory(string id);
    }
}
