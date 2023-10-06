
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;
namespace Businesss
{
    public class Order_ThongKeBUS
    {
        Order_ThongKeDAL odTk = new Order_ThongKeDAL(); 
        public List<ThongKe_Order_By_KhachModel> ThongKeSoLuongDonHangTheoKH(int page, int page_size, out int total, string fullname, DateTime? ngaybd, DateTime? ngaykt)
        {
            List<ThongKe_Order_By_KhachModel> result = odTk.ThongKeSoLuongDonHangTheoKH(page, page_size, out total, fullname, ngaybd, ngaykt);
            return result;
        }
        public ThongKe_SLOrderModel ThongKeSoLuongDonHangTheoTgian(DateTime? fr_date, DateTime? to_date)
        {
            ThongKe_SLOrderModel order = odTk.ThongKeSoLuongDonHangTheoTgian(fr_date,to_date);
            return order;
           
        }
    }
}
