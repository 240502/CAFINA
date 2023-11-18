using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;

namespace Businesss
{
    public class ProductViewsBUS
    {
        ProductViewsDAL productViewDAL = new ProductViewsDAL();

        public ProductViewModel GetProductViewByProductId(string productId, int date, int month, int year)
        {
            return productViewDAL.GetProductViewByProductId(productId,date,month,year);

        }
        public int CreateProductView(ProductViewModel productViewModel)
        {
            return productViewDAL.CreateProductView(productViewModel);
        }

        public int DeleteProductView(int id)
        {
            return productViewDAL.DeleteProductView(id);
        }
        public int UpdateProductView(ProductViewModel productViewModel)
        {
            return productViewDAL.UpdateProductView(productViewModel);
        }

    }
}
