using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer.Helper;
using System.Data;

namespace DataAccessLayer
{
    public class ProductViewsDAL
    {
        DataHelper helper = new DataHelper();

        public ProductViewModel GetProductViewByProductId(string productId,int date, int month,int year)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_ProductViews_ByProductId","@productId","@date","@month","@year",productId,date,month,year);
                if (tb != null)
                {
                    ProductViewModel model = new ProductViewModel();
                    model.ProductId = tb.Rows[0]["ProductId"].ToString();
                    model.count = int.Parse(tb.Rows[0]["count"].ToString());
                    model.id = int.Parse(tb.Rows[0]["id"].ToString());
                    model.dateView = tb.Rows[0]["dateView"] != DBNull.Value ? DateTime.Parse(tb.Rows[0]["dateView"].ToString()) : DateTime.MinValue;

                    return model;
                }
                else return null;

            }catch (Exception ex)
            {
                return null;
            }
        }

        public int CreateProductView(ProductViewModel productView)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Create_ProductViews", "@productId", "@count", productView.ProductId, productView.count);
                return result;

            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateProductView(ProductViewModel productView)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Update_ProductViews", "@id","@productId", "@count","@dateView",productView.id,productView.ProductId, productView.count,productView.dateView);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteProductView(int id)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Delete_ProductViews", "@id", id);
                return reuslt;

            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
