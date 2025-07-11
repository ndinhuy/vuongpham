﻿using Gimji.DTO;
using Gimji.Models;

namespace Gimji.Repository.Interface
{
    public interface IRoleRepository
    {
        Task<ResDTO<object>> GetRoles(int page = 1, int limit = 10, string? keyword = null);
        Task<ResDTO<Role>> GetRoleById(string id);
        Task<ResDTO<Role>> CreateRole(string roleName);
        Task<ResDTO<Role>> UpdateRole(string id, string roleName);
        Task<ResDTO<Role>> DeleteRole(string id);
    }
}
