using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
namespace Businesss
{
    public class ProductViewTotalBUS
    {
        ProductViewTotalDAL ProductViewTotalDAL = new ProductViewTotalDAL();
        public ProductViewTotalModel GetTotalProductViewInMonth(int month, int year)
        {
            return ProductViewTotalDAL.GetTotalProductViewInMonth(month, year);
        }
    }
}
