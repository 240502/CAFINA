using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;

namespace Businesss
{
    public class UserBUS
    {
        UserDAL userDAL = new UserDAL();
        List<UserModel> userList ;  
        public List<UserModel> ThongKeSoTienUs(DateTime? fr_date ,DateTime ? to_date)
        {
            userList = userDAL.ThongKeTop5UserTieuNhieuTienNhat(fr_date,to_date);
            return userList;

        }
    }
}
