using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer.Helper;
using System.Data;
using System.Diagnostics;

namespace DataAccessLayer
{
    public class Order_DetailsDAL
    {
        DataHelper helper = new DataHelper();
        public List<Order_Details> GetListOrderByUsId(int usid)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetOrderByUsId", "@usid", usid);
                if (tb != null)
                {
                     List<Order_Details> list = new List<Order_Details>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        Order_Details order_Details = new Order_Details();
                        order_Details.OrderId = int.Parse(tb.Rows[i]["OrderId"].ToString());
                        order_Details.ProductId = tb.Rows[i]["ProductId"].ToString();
                        order_Details.price = int.Parse(tb.Rows[i]["Price"].ToString());
                        order_Details.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        order_Details.Od_id = int.Parse(tb.Rows[i]["Od_id"].ToString());
                        order_Details.size = tb.Rows[i]["size"] ==DBNull.Value ? "": tb.Rows[i]["size"].ToString();
                        list.Add(order_Details);

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

        public List<Order_Details> GetListOrderDetailByOdId(int odId)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetOrderDetailByOrderId", "@odId",odId);
                if (tb != null)
                {
                    List<Order_Details> list = new List<Order_Details>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        Order_Details order_Details = new Order_Details();
                        order_Details.OrderId = int.Parse(tb.Rows[i]["OrderId"].ToString());
                        order_Details.Od_id = int.Parse(tb.Rows[i]["Od_id"].ToString());
                        order_Details.ProductId = tb.Rows[i]["ProductId"].ToString();
                        order_Details.Amount = int.Parse(tb.Rows[i]["Amount"].ToString());
                        order_Details.price = int.Parse(tb.Rows[i]["Price"].ToString());
                        order_Details.size = tb.Rows[i]["size"] != DBNull.Value ? tb.Rows[i]["size"].ToString() : "";
                        list.Add(order_Details);

                    }
                    return list;

                }
                else return null;

            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
