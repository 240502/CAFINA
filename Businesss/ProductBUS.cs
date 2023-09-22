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
        public List<ProductModel> GetAll()
        {
            ProductList = prodDal.GetAll();
            return ProductList != null ? ProductList : null;
        }
        public List<ProductModel> PhanTrangDSProduct(int page,int pageSize)
        {
            List<ProductModel> ProductList1 = GetAll();
            if(ProductList1.Count < pageSize && page !=1) {
                page = 1;
            }
            ProductList = prodDal.PhanTrangDSProduct(page, pageSize);
            return ProductList !=null ? ProductList:null;
        }
        public ProductModel GetProductById(string productId)
        {
            var reuslt = prodDal.GetProductById(productId);
            return reuslt!=null ? reuslt : null;
        
        }
        public List<ProductModel> SearchProduct(string value)
        {
            ProductList = prodDal.SearchProduct(value);
            return ProductList!=null ? ProductList:null;
        }
        public string CreateProduct(ProductModel product)
        {
            var result = prodDal.CreateProduct(product);
            return result;
        }
        public string UpdateProduct(ProductModel product)
        {
           
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
        public List<ThongKeSoLuongBanProductModel> ThongKeSanPhamBanChay(DateTime ? fr_date,DateTime ? td_date)
        {
            var result = prodDal.ThongKeSanPhamBanChay(fr_date, td_date);
            return result != null ? result:null;
        }


    }
}
