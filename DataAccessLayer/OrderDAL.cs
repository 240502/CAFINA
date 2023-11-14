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


        public List<OrderModel> GetListOrderManage(int pageIndex, int pageSize, out int total,int status)
        {
            try
            {
                total = 0;
                DataTable tb = helper.ExcuteReader("Pro_GetListOrderManage", "@pageIndex", "@pageSize", "@status", pageIndex, pageSize,status);
                total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                if (tb != null)
                {
                    List<OrderModel> list = new List<OrderModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                           
                                OrderModel order = new OrderModel();
                                order.order_Details = new List<Order_Details>();
                                order.Id = int.Parse(tb.Rows[i]["ID"].ToString());
                                order.User_Id = int.Parse(tb.Rows[i]["User_id"].ToString());
                                order.FullName = tb.Rows[i]["fullName"].ToString();
                                order.email = tb.Rows[i]["email"].ToString();
                                order.phone_number = tb.Rows[i]["phone_number"].ToString();
                                order.address = tb.Rows[i]["address"].ToString();
                                order.note = tb.Rows[i]["note"].ToString();
                                order.order_Date = DateTime.Parse(tb.Rows[i]["order_date"].ToString());
                                order.status = int.Parse(tb.Rows[i]["status"].ToString());
                             
                                list.Add(order);

                    }
                    return list;
                }
                else return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
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
                if (tb.Rows.Count > 0)
                {
                    order.order_Details = new List<Order_Details>();
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
                        detail.OrderId = int.Parse(tb.Rows[i]["OrderId"].ToString());
                        detail.Od_id = int.Parse(tb.Rows[i]["Od_id"].ToString());
                        detail.ProductId = tb.Rows[i]["ProductId"].ToString();
                        detail.price = int.Parse(tb.Rows[i]["Price"].ToString());
                        detail.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        detail.size = tb.Rows[i]["size"] == DBNull.Value ? "" : tb.Rows[i]["size"].ToString();
                        order.order_Details.Add(detail);

                    }
                    return order;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public int CreateOrder(OrderModel order)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Pro_Create_Order",
                    "@user_id", "@fullName", "@email", "@phone_number", "@address", "@note", "@status", "@list_json_order_detail",
                    order.User_Id, order.FullName, order.email, order.phone_number, order.address, order.note, order.status, order.order_Details != null ? MessageConvert.SerializeObject(order.order_Details) : null

                );

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public int DeleteOrder(int orderId)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Pro_Delete_Order",
                    "@orderId",
                    orderId
                );
                return result;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public int UpdateOrder(OrderModel order)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Update_Order",
                    "@orderId", "@user_id", "@fullName", "@email", "@phone_number", "@address", "@note", "@order_date", "@status", "@list_json_order_detail",

                    order.Id, order.User_Id, order.FullName, order.email, order.phone_number, order.address, order.note, order.order_Date, order.status, order.order_Details != null ? MessageConvert.SerializeObject(order.order_Details) : null

                );

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public List<OrderModel> SearchOrder(int pageIndex, int pageSize, out long total, string name)
        {
            total = 0;
            try
            {
                var tb = helper.ExcuteReader(

                    "Pro_Search_Order",
                    "@name", "@page_index", "@page_size",
                    name, pageIndex, pageSize
               );

                if (tb != null)
                {
                    total = (long)tb.Rows[0]["recordcount"];
                    int order_id = 0;
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        OrderModel order = new OrderModel();
                        order.order_Details = new List<Order_Details>();
                        Order_Details order_Details = new Order_Details();
                        order.Id = int.Parse(tb.Rows[i]["id"].ToString());
                        order.User_Id = int.Parse(tb.Rows[i]["user_id"].ToString());
                        order.FullName = tb.Rows[i]["fullName"].ToString();
                        order.email = tb.Rows[i]["email"].ToString();
                        order.phone_number = tb.Rows[i]["phone_number"].ToString();
                        order.address = tb.Rows[i]["address"].ToString();
                        order.note = tb.Rows[i]["note"].ToString();
                        order.order_Date = DateTime.Parse(tb.Rows[i]["order_date"].ToString());
                        order.status = int.Parse(tb.Rows[i]["status"].ToString());
                        order_Details.ProductId = tb.Rows[i]["ProductId"].ToString();
                        order_Details.price = int.Parse(tb.Rows[i]["price"].ToString());
                        order_Details.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        order_Details.size = tb.Rows[i]["size"] == DBNull.Value ? "" : tb.Rows[i]["size"].ToString();
                        order.order_Details.Add(order_Details);
                        listOrder.Add(order);
                    }
                    return listOrder;
                }

                else return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<OrderModel> GetOrderByUser(int? pageIndex, int? pageSize, out int total, string? email)
        {
            total = 0;
            try
            {
                var tb = helper.ExcuteReader(
                    "GetOrderByUs",
                    "@page_index", "@page_size", "@email",
                    pageIndex, pageSize, email
                );
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        OrderModel order = new OrderModel();
                        order.order_Details = new List<Order_Details>();
                        Order_Details order_Details = new Order_Details();
                        order.Id = int.Parse(tb.Rows[i]["id"].ToString());
                        order.User_Id = int.Parse(tb.Rows[i]["user_id"].ToString());
                        order.FullName = tb.Rows[i]["fullName"].ToString();
                        order.email = tb.Rows[i]["email"].ToString();
                        order.phone_number = tb.Rows[i]["phone_number"].ToString();
                        order.address = tb.Rows[i]["address"].ToString();
                        order.note = tb.Rows[i]["note"].ToString();
                        order.order_Date = DateTime.Parse(tb.Rows[i]["order_date"].ToString());
                        order.status = int.Parse(tb.Rows[i]["status"].ToString());
                        order_Details.ProductId = tb.Rows[i]["ProductId"].ToString();
                        order_Details.price = int.Parse(tb.Rows[i]["price"].ToString());
                        order_Details.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        order_Details.size = tb.Rows[i]["size"] == DBNull.Value ? "" : tb.Rows[i]["size"].ToString();

                        order.order_Details.Add(order_Details);
                        listOrder.Add(order);
                    }
                    return listOrder;
                }
                else return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
