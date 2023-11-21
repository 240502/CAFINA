using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using Microsoft.Extensions.Configuration;

namespace Businesss
{
    public class UserBUS
    {
        UserDAL userDAL = new UserDAL();
        UserThongKeDAL usThongke = new UserThongKeDAL();

        List<UserModel> userList ;
        private string secret;


        public int TotalUser()
        {
            return userDAL.TotalUser();
        }
        public List<UserModel> GetList(int pageIndex,int pageSize, out int total)
        {
            return userDAL.GetListUs(pageIndex,pageSize,out total);
        }

        public UserModel Get(int id)
        {
            var result = userDAL.GetUsById(id);
            return result;
        }

        public List<UserModel> Search(string value,int pageIndex,int pageSize,out int total)
        {
            var result = userDAL.Search(value,pageIndex,pageSize,out total);
            return result;
        }
        public int? Create_User (UserModel us)
        {
            var result = userDAL.Create_User (us);
            return result;
        }
        public int? Delete_User(int usId)
        {
            var result = userDAL.Delete_User(usId);
            return result;
        }
        public int? Update_User(UserModel us)
        {
            var result = userDAL.Update_User(us);
            return result;
        }

       
      
    }
}
