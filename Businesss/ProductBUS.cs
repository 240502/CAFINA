using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;
namespace Businesss
{
    public class ProductBUS
    {
        List<ProductModel> ProductList ;  
        ProductDAL prodDal = new ProductDAL();
        public List<ProductModel> GetListProduct()
        {
            ProductList = prodDal.GetListProduct();
            return ProductList;
        
        }
        public List<ProductModel> SearchProduct(string value)
        {
            ProductList = prodDal.SearchProduct(value);
            if (ProductList.Count==0) return null;
            return ProductList;
        }
        public string CreateProduct(ProductModel product)
        {
            var result = prodDal.CreateProduct(product);
            return result;
        }
        public string UpdateProduct(ProductModel product)
        {
            GetListProduct();
            foreach(ProductModel pd in ProductList)
            {
            }    
            var result = prodDal.UpdateProduct(product);
            return result;
        }
        public string DeleteProduct(string productId) { 
            var result = prodDal.DeleteProduct(productId);
            return result;
        } public List<ProductModel> Search2(int pageIndex, int pageSize, out long total, string ProductName, int CateId)
        {
            ProductList = prodDal.Search2(pageIndex,pageSize,out total,ProductName,CateId);
            return ProductList;
        }
        public List<ProductModel> ThongKe5SanPhamBanChayNhat(DateTime ? fr_date,DateTime ? td_date)
        {
            ProductList = prodDal.ThongKe5SanPhamBanChayNhat(fr_date, td_date);
            return ProductList;
        }


    }
}
