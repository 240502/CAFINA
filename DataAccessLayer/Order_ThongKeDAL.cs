
using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataAccessLayer.Helper;
using System.Diagnostics.Metrics;
using Microsoft.VisualBasic;

namespace DataAccessLayer
{
    public class Order_ThongKeDAL
    {
        DataHelper helper = new DataHelper();

        public List<ThongKeOrderByMonthModel> ThongKeSLOrderTheoThang(DateTime? fr_date, DateTime? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_ThongKe_SLOrderTheoThang", "@fr_date", "@to_date", fr_date, to_date);
                if (tb != null)
                {
                    List<ThongKeOrderByMonthModel> list = new List<ThongKeOrderByMonthModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThongKeOrderByMonthModel model = new ThongKeOrderByMonthModel();
                        model.month = int.Parse(tb.Rows[i]["month"].ToString());
                        model.year = int.Parse(tb.Rows[i]["year"].ToString());
                        model.totalOrder = int.Parse(tb.Rows[i]["total"].ToString());
                        list.Add(model);
                    }
                  
                    return list;
                }
                else return null;

            }catch (Exception ex)
            {
                return null ;
            }
        }


        public int GetTotalOrder()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Total_Order");
                if (tb != null)
                {
                    int result =  int.Parse(tb.Rows[0]["total"].ToString());
                    return result;
                }
                else return 0;

            }catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ThongKe_Order_By_KhachModel> ThongKeSoLuongDonHangTheoKH(int page, int page_size, out int total, string fullname, DateTime? ngaybd, DateTime? ngaykt)
        {
            try
            {
                List<ThongKe_Order_By_KhachModel> listtk = new List<ThongKe_Order_By_KhachModel>();

                total = 0;
                var tb = helper.ExcuteReader(
                    "Pro_ThongKe_Khach",
                    "@page_index", "@page_size", "@fullname", "@ngaybd", "@ngaykt",
                    page, page_size, fullname, ngaybd, ngaykt
                );

                if (tb != null)
                {
                    total = (int)tb.Rows[0]["RecordCount"];
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThongKe_Order_By_KhachModel tk = new ThongKe_Order_By_KhachModel();
                        tk.fullName = tb.Rows[i]["fullName"].ToString();
                        tk.address = tb.Rows[i]["address"].ToString();
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
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public ThongKe_SLOrderModel ThongKeSoLuongDonHangTheoTgian(DateTime? fr_date, DateTime? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader(
                    "Pro_ThongKe_SoLuongDonHang",
                    "@fr_date", "@to_date",
                    fr_date, to_date
                );
                if (tb != null)
                {
                    ThongKe_SLOrderModel tk = new ThongKe_SLOrderModel();
                    tk.fr_date = tb.Rows[0]["fr_date"] != null ? tb.Rows[0]["fr_date"].ToString() : null;
                    tk.to_date = tb.Rows[0]["to_date"] != null ? tb.Rows[0]["to_date"].ToString() : null;
                    tk.TongDonHang = int.Parse(tb.Rows[0]["total"].ToString());
                    return tk;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
