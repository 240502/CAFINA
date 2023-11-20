using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using Model;

namespace Businesss
{
    public class UserThongKeBUS
    {
        UserThongKeDAL usDAL = new UserThongKeDAL();
        public List<UserThongKeModel> ThongKeTop5UserTieuNhieuTienNhat(int fr_date, int to_date,int year)
        {
            List<UserThongKeModel> reuslt = usDAL.ThongKeTop5UserTieuNhieuTienNhat(fr_date,to_date,year);
            return reuslt;
        }
    }
}
