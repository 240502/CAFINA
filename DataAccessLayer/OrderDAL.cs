using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Helper;
using Model;


namespace DataAccessLayer
{
    public class OrderDAL
    {
        DataHelper helper = new DataHelper();
        List<OrderModel> listOrder = new List<OrderModel>();

        public OrderModel GetById(int id)
        {
    
            try
            {
                DataTable tb = helper.ExcuteReader(
                 
                    "Pro_GetById_Order",
                    "@orderId",
                    id
                );
                OrderModel order = new OrderModel();
                if (tb.Rows.Count >0)
                {
                    order.order_Details = new List<Order_Details> ();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        Order_Details detail = new Order_Details();
                        order.Id = int.Parse(tb.Rows[i]["ID"].ToString());
                        order.User_Id = int.Parse(tb.Rows[i]["User_id"].ToString());
                        order.FullName = tb.Rows[i]["fullName"].ToString();
                        order.email = tb.Rows[i]["email"].ToString();
                        order.phone_number = tb.Rows[i]["phone_number"].ToString();
                        order.address = tb.Rows[i]["address"].ToString();
                        order.note = tb.Rows[i]["note"].ToString();
                        order.order_Date = DateTime.Parse(tb.Rows[i]["order_date"].ToString());
                        order.status = int.Parse(tb.Rows[i]["status"].ToString());
                        detail.Od_id = int.Parse(tb.Rows[i]["Od_id"].ToString());
                        detail.ProductId = tb.Rows[i]["ProductId"].ToString();
                        detail.price = int.Parse(tb.Rows[i]["Price"].ToString());
                        detail.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        order.order_Details.Add(detail );

                    }
                    return order;
                }
                else
                {
                    return null;
                }
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }
        public string  CreateOrder(OrderModel order)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Pro_Create_Order",
                    "@user_id", "@fullName", "@email", "@phone_number", "@address", "@note", "@order_date", "@status", "@list_json_order_detail",
                    order.User_Id, order.FullName, order.email, order.phone_number, order.address, order.note, order.order_Date, order.status, order.order_Details != null ? MessageConvert.SerializeObject(order.order_Details) : null
                
                );

                return result;
            }
            catch(Exception ex) {
                throw ex;
            }


        }
        public string DeleteOrder(string orderId)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Pro_Delete_Order",
                    "@orderId",
                    orderId
                );
                return result;

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public string UpdateOrder(OrderModel order)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Update_Order",
                    "@orderId", "@user_id", "@fullName", "@email", "@phone_number", "@address", "@note", "@order_date", "@status", "@list_json_order_detail",

                    order.Id,order.User_Id, order.FullName, order.email, order.phone_number, order.address, order.note, order.order_Date, order.status, order.order_Details != null ? MessageConvert.SerializeObject(order.order_Details) : null

                );

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public List<OrderModel> SearchOrder(int pageIndex,int pageSize, out long total, string name)
        {
            total = 0;
            try
            {
                var tb = helper.ExcuteReader(
                 
                    "Pro_Search_Order",  
                    "@name","@page_index","@page_size",
                    name,pageIndex,pageSize
               );

                if (tb!=null)
                {

                    total = (long)tb.Rows[0]["recordcount"];
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        OrderModel Order = new OrderModel();
                        Order_Details Order_Detail = new Order_Details();
                        Order.Id = int.Parse(tb.Rows[i]["id"].ToString());
                        Order.User_Id = int.Parse(tb.Rows[i]["user_id"].ToString());
                        Order.FullName = tb.Rows[i]["fullName"].ToString();
                        Order.email = tb.Rows[i]["email"].ToString();
                        Order.phone_number = tb.Rows[i]["phone_number"].ToString();
                        Order.address = tb.Rows[i]["address"].ToString();
                        Order.note = tb.Rows[i]["note"].ToString();
                        Order.order_Date = DateTime.Parse(tb.Rows[i]["order_date"].ToString());
                        Order.status = int.Parse(tb.Rows[i]["status"].ToString());
                        Order_Detail.Od_id = int.Parse(tb.Rows[i]["id"].ToString());
                        Order_Detail.ProductId = tb.Rows[i]["ProductId"].ToString();
                        Order_Detail.price = int.Parse(tb.Rows[i]["price"].ToString());
                        Order_Detail.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        Order.order_Details = new List<Order_Details> { Order_Detail };
                        listOrder.Add(Order);


                    }
                }
                else listOrder = null ;
                    return listOrder;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public List<ThongKe_KhachModel> listTk(int page, int page_size, out long total, string fullname,DateTime ? ngaybd,DateTime ? ngaykt)
        {
            try
            {
                List<ThongKe_KhachModel> listtk = new List<ThongKe_KhachModel>();

                total = 0;
                var tb = helper.ExcuteReader(
                    "Pro_ThongKe_Khach",
                    "@page_index", "@page_size", "@fullname", "@ngaybd", "@ngaykt",
                    page, page_size, fullname, ngaybd, ngaykt
                );
                if (tb != null)
                {
                    total = (long)tb.Rows[0]["RecordCount"];
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThongKe_KhachModel tk = new ThongKe_KhachModel();
                        tk.fullName = tb.Rows[i]["fullName"].ToString();
                        tk.addrees = tb.Rows[i]["addrees"].ToString();
                        tk.ProductId = tb.Rows[i]["ProductId"].ToString();
                        tk.title = tb.Rows[i]["title"].ToString();
                        tk.price = int.Parse(tb.Rows[i]["price"].ToString());
                        tk.amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        tk.order_date = DateTime.Parse(tb.Rows[i]["order_date"].ToString());
                        listtk.Add(tk);
                    }
                }
                else listtk = null;
                return listtk;
            }
            catch(Exception ex)
            {
                throw ex;
            }
           
        }
    }
}
