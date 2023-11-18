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
    public class ProductViewTotalDAL
    {
        DataHelper helper = new DataHelper();
        public ProductViewTotalModel GetTotalProductViewInMonth(int month,int year)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetTotalProductViewInMonth","@month","@year",month,year);
                if (tb != null)
                {
                    ProductViewTotalModel model = new ProductViewTotalModel();
                    model.month = int.Parse(tb.Rows[0]["month"].ToString());
                    model.year = int.Parse(tb.Rows[0]["year"].ToString());
                    model.total = int.Parse(tb.Rows[0]["totalProductView"].ToString());
                    return model;
                }
                else return null;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
