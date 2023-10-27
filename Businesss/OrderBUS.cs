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
        
        public int CreateOrder(OrderModel order)
        {
            var result = orderDAL.CreateOrder(order);
            return result;
        }
        public int DeleteOrder(string orderId)
        {
            var result = orderDAL.DeleteOrder(orderId);
            return result;
        }
        public List<OrderModel> SearchOrder(int pageIndex,int pageSize,out long total,string name)
        {
            var result = orderDAL.SearchOrder(pageIndex,pageSize,out total,name);
            return result;
        }
        public int UpdateOrder(OrderModel order)
        {
            var result = orderDAL.UpdateOrder(order);
            return result;
        }
       
        public List<OrderModel> GetOrderByUser(int? pageIndex,int ? pageSize, out int total, string ? email)
        {
            var result = orderDAL.GetOrderByUser(pageIndex,pageSize,out total,email);
            return result;
        }
    }
}
