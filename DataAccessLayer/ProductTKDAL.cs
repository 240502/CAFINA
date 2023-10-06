
using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Helper;
namespace DataAccessLayer
{
    public class ProductTKDAL
    {   
        DataHelper helper = new DataHelper();
        public List<ThongKeSoLuongBanProductModel> ThongKeSanPhamBanChay(DateTime? fr_date, DateTime? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader(
                    "Pro_ThongKe_SanPham_BanChay",
                    "@fr_date", "@to_date",
                    fr_date, to_date
                );
                List<ThongKeSoLuongBanProductModel> tk = new List<ThongKeSoLuongBanProductModel>();
                if (tb != null)
                {
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThongKeSoLuongBanProductModel product = new ThongKeSoLuongBanProductModel();
                        product.ProductId = tb.Rows[i]["ProductId"].ToString();
                        product.title = tb.Rows[i]["title"].ToString();
                        product.price = int.Parse(tb.Rows[i]["price"].ToString());
                        product.discount = int.Parse(tb.Rows[i]["discount"].ToString());
                        product.description = tb.Rows[i]["description"].ToString();
                        product.ChatLieu = tb.Rows[i]["ChatLieu"].ToString();
                        product.HuongDanSuDung = tb.Rows[i]["HuongDanSuDung"].ToString();
                        product.size = tb.Rows[i]["size"].ToString();
                        product.color = tb.Rows[i]["color"].ToString();
                        product.CateId = int.Parse(tb.Rows[i]["CateId"].ToString());
                        product.SoLuongBan = int.Parse(tb.Rows[i]["Số lượng bán"].ToString());
                        tk.Add(product);
                    }
                }
                else
                {
                    tk = null;
                }
                return tk;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
