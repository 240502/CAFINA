
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
        public List<ThongKeSoLuongBanProductModel> ThongKeSanPhamBanChay(int fr_month,int to_month,int year)
        {
            var result = prodDal.ThongKeSanPhamBanChay(fr_month,to_month, year);
            return result != null ? result : null;
        }
        public List<ProductTKSLBanModel> ThongKeSLBanProduct(int fr_month, int to_month, int year)
        {
            return prodDal.ThongKeSLBanProduct(fr_month,to_month, year);
        }
    }
}
