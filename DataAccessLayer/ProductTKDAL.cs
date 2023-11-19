
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
        public List<ThongKeSoLuongBanProductModel> ThongKeSanPhamBanChay(int fr_month,int to_month, int year)
        {
            try
            {
                DataTable tb = helper.ExcuteReader(
                    "Pro_ThongKe_SanPham_BanChay",
                    "@fr_month","@to_month", "@year",
                    fr_month,to_month, year
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
                        product.Object_id = tb.Rows[i]["Object_id"] != DBNull.Value ?  int.Parse(tb.Rows[i]["Object_id"].ToString()) : 0 ;
                        product.CateDt = tb.Rows[i]["CateDt"] != DBNull.Value ? int.Parse(tb.Rows[i]["CateDt"].ToString()) : 0;
                        product.Bst_id = tb.Rows[i]["Bst_id"] != DBNull.Value ? int.Parse(tb.Rows[i]["Bst_id"].ToString()) : 0;
                        product.created = tb.Rows[i]["created"] != DBNull.Value ? DateTime.Parse(tb.Rows[i]["created"].ToString()) : DateTime.MinValue;
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


        public List<ProductTKSLBanModel> ThongKeSLBanProduct(int fr_month, int to_month, int year)
        {
            try
            {
                DataTable tb = helper.ExcuteReader(
                    "Pro_ThongKeSLSPBanRa",
                     "@fr_month", "@to_month", "@year",
                    fr_month, to_month, year
                );
                if (tb != null)
                {
                    List<ProductTKSLBanModel> list = new List<ProductTKSLBanModel> ();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ProductTKSLBanModel product = new ProductTKSLBanModel();
                        product.month = int.Parse(tb.Rows[i]["month"].ToString());
                        product.year = int.Parse(tb.Rows[i]["year"].ToString());
                        product.total = int.Parse(tb.Rows[i]["total"].ToString());
                        list.Add(product);
                    }
                    
                    return list;

                }
                else return null;
                
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
