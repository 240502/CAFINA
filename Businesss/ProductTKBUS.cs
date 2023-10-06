
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
namespace Businesss
{
    public class ProductTKBUS
    {
        ProductTKDAL prodDal = new ProductTKDAL();
        public List<ThongKeSoLuongBanProductModel> ThongKeSanPhamBanChay(DateTime? fr_date, DateTime? td_date)
        {
            var result = prodDal.ThongKeSanPhamBanChay(fr_date, td_date);
            return result != null ? result : null;
        }

    }
}
