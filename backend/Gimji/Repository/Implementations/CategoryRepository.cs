using Gimji.DTO.Request.Category;
using Gimji.Models;
using System.Threading.Tasks;

namespace Gimji.Repository.Implementations
{
    public interface CategoryRepository
    {
        Task<bool> DoesItemExist(string id);
        Task<IEnumerable<CategoryCode>> GetAllCategory();
        Task<CategoryCode> GetCategoryById(string id);
        Task<CategoryCode> GetCategoryByName( string name);
        Task AddCateogory(addCategoryCode categoryCode);
        Task UpdateCategory(string CodeValue,updateCategoryCode updateCategoryCode);
        Task DeleteCategory(string id);
    }
}
