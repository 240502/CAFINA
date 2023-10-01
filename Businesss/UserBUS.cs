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
        List<UserModel> userList ;
        private string secret;
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

        public List<UserModel> ThongKeSoTienUs(DateTime? fr_date ,DateTime ? to_date)
        {
            userList = userDAL.ThongKeTop5UserTieuNhieuTienNhat(fr_date,to_date);
            return userList;

        }
      
    }
}
