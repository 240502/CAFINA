using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
namespace Businesss
{
    public class ThongKeDoanhThuBUS
    {
        ThongKeDoanhThuDAL tkDAL = new ThongKeDoanhThuDAL();
        public List<ThongKeDoanhThuModel> ThongKeDoanhThu(int fr_month, int to_month, int year)
        {
            return tkDAL.ThongKeDoanhThu(fr_month,to_month,year);
        }
    }
}
