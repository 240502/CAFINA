using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataAccessLayer;
using Model;

namespace Businesss
{
    public class RoleBUS
    {
        RoleDAL roleDAL = new RoleDAL();
        public RoleModel Get_Role_By_Id(int id)
        {
            var result =roleDAL.GetRoById(id);
            return result;
        }
        public RoleModel Search(string RoName)
        {
            var result = roleDAL.Search(RoName);
            return result;
        }
        public int Create (string RoName)
        {
            var result = roleDAL.Create(RoName);
            return result;
        }
        public int Delete (int id)
        {
            var result = roleDAL.Delete(id);
            return result;
        }
        public int Update(RoleModel role)
        {
            var result = roleDAL.Update(role);
            return result;
        }
    }
}
