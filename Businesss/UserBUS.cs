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

        public List<UserModel> GetList(int pageIndex,int pageSize, out int total)
        {
            return userDAL.GetListUs(pageIndex,pageSize,out total);
        }

        public UserModel Get(int id)
        {
            var result = userDAL.GetUsById(id);
            return result;
        }

        public List<UserModel> Search(string FullName, string email,string PhoneNumber)
        {
            var result = userDAL.Search(FullName,email,PhoneNumber);
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

        public List<UserThongKeModel> ThongKeSoTienUs(DateTime? fr_date ,DateTime ? to_date)
        {
            List<UserThongKeModel>  result= usThongke.ThongKeTop5UserTieuNhieuTienNhat(fr_date,to_date);
            return result;
        }
      
    }
}
