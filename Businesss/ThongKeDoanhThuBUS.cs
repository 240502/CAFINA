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
        public List<ThongKeDoanhThuModel> ThongKeDoanhThu(DateTime? fr_date,DateTime? to_date)
        {
            return tkDAL.ThongKeDoanhThu(fr_date, to_date);
        }

        public List<ThongKeDoanhThuModel> ThongKeDoanhThuTheoNgay(DateTime? fr_date, DateTime? to_date)
        {
            return tkDAL.ThongKeDoanhThuTheoNgay(fr_date, to_date);
        }
    }
}
