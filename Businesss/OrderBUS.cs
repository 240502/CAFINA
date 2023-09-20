using DataAccessLayer;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Businesss
{
    public class OrderBUS
    {
        OrderDAL orderDAL = new OrderDAL();
        public OrderModel GetById(int id)
        {
            OrderModel orderModel = orderDAL.GetById(id);
            return orderModel;
        }
        public string CreateOrder(OrderModel order)
        {
            var result = orderDAL.CreateOrder(order);
            return result;
        }
        public string DeleteOrder(string orderId)
        {
            var result = orderDAL.DeleteOrder(orderId);
            return result;
        }
        public List<OrderModel> SearchOrder(int pageIndex,int pageSize,out long total,string name)
        {
            var result = orderDAL.SearchOrder(pageIndex,pageSize,out total,name);
            return result;
        }
        public string UpdateOrder(OrderModel order)
        {
            var result = orderDAL.UpdateOrder(order);
            return result;
        }
        public List<ThongKe_KhachModel> ThongKe(int page,int pageSize , out int total, string fullname,DateTime? ngaybd, DateTime ?ngaykt)
        {
            var result = orderDAL.listTk(page,pageSize,out total,fullname,ngaybd,ngaykt);
            return result;
        }
        public ThongKe_OrderModel ThongKe_Order(DateTime? fr_date,DateTime? to_date)
        {
            var result = orderDAL.ThongKeSoLuongDonHang(fr_date, to_date);
            return result;
        }
    }
}
