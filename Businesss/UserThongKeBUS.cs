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
        public List<UserThongKeModel> ThongKeTop5UserTieuNhieuTienNhat(DateTime? fr_date, DateTime? to_date)
        {
            List<UserThongKeModel> reuslt = usDAL.ThongKeTop5UserTieuNhieuTienNhat(fr_date,to_date);
            return reuslt;
        }
    }
}
