
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
        public List<ThongKeSoLuongBanProductModel> ThongKeSanPhamBanChay(DateTime? fr_month,DateTime? to_month)
        {
            var result = prodDal.ThongKeSanPhamBanChay(fr_month,to_month);
            return result != null ? result : null;
        }
        public List<ProductTKSLBanModel> ThongKeSLBanProduct(DateTime? fr_month, DateTime? to_month)
        {
            return prodDal.ThongKeSLBanProduct(fr_month,to_month);
        }
    }
}
