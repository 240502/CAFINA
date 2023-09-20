using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Helper;
using Model;
namespace DataAccessLayer
{
    public class ProductDAL
    {
        DataHelper helper=new DataHelper();
        List<ProductModel> ProductList = new List<ProductModel>();

        public List<ProductModel> GetListProduct()
        {
            DataTable tb = new DataTable();
            tb = helper.ExcuteReader("GetAll");
            if (tb.Rows.Count>0)
            {
                for (int i = 0; i < tb.Rows.Count; i++)
                {
                    ProductModel product = new ProductModel();
                    product.ProductId = tb.Rows[i]["ProductId"].ToString();
                    product.title = tb.Rows[i]["title"].ToString();
                    product.price = int.Parse(tb.Rows[i]["price"].ToString());
                    product.discount = int.Parse(tb.Rows[i]["discount"].ToString());
                    product.description = tb.Rows[i]["description"].ToString();
                    product.ChatLieu = tb.Rows[i]["ChatLieu"].ToString();
                    product.HuongDanSuDung = tb.Rows[i]["HuongDanSuDung"].ToString();
                    product.size = tb.Rows[i]["size"].ToString();
                    product.color = tb.Rows[i]["color"].ToString();
                    if (tb.Rows[i]["CateId"] == DBNull.Value)
                        product.CateId = 0;
                    else

                        product.CateId = int.Parse(tb.Rows[i]["CateId"].ToString());
                    ProductList.Add(product);
                }
                return ProductList;

            }
            else return null;
            
        }
        public List<ProductModel> SearchProduct(string value)
        {
            DataTable tb = new DataTable();

            string searchString = value.TrimEnd().TrimStart().Replace(" ", " and ");
            tb = helper.ExcuteReader("SearchProduct","@string",searchString);
            for (int i = 0; i < tb.Rows.Count; i++)
            {
                ProductModel product = new ProductModel();
                product.ProductId = tb.Rows[i]["ProductId"].ToString();
                product.title = tb.Rows[i]["title"].ToString();
                product.price = int.Parse(tb.Rows[i]["price"].ToString());
                product.discount = int.Parse(tb.Rows[i]["discount"].ToString());
                product.description = tb.Rows[i]["description"].ToString();
                product.ChatLieu = tb.Rows[i]["ChatLieu"].ToString();
                product.HuongDanSuDung = tb.Rows[i]["HuongDanSuDung"].ToString();
                product.size = tb.Rows[i]["size"].ToString();
                product.color = tb.Rows[i]["color"].ToString();
                if (tb.Rows[i]["CateId"] == DBNull.Value)
                    product.CateId = 0;
                else

                    product.CateId = int.Parse(tb.Rows[i]["CateId"].ToString());
                ProductList.Add(product);
            }
            return ProductList;
        }
        public string CreateProduct(ProductModel product)
        {
            var result = helper.ExcuteNonQuery("InsertProduct",
                "@ma", "@ten", "@gia", "@giaGiam", "@mota", "@chatLieu", "@hd", "size", "@color", "cateid",
                product.ProductId, product.title, product.price, product.discount, product.description, product.ChatLieu, product.HuongDanSuDung, product.size, product.color, product.CateId
            );
            return result;

        }
        public string UpdateProduct(ProductModel product)
        {
            var result = helper.ExcuteNonQuery(
                    "Pro_Update_Product",
                    "@ma", "@ten", "@gia", "@giaGiam", "@mota", "@chatLieu", "@hd", "size", "@color", "cateid",
                    product.ProductId, product.title, product.price, product.discount, product.description, product.ChatLieu, product.HuongDanSuDung, product.size, product.color, product.CateId
                );
            return result;
        }
        public string DeleteProduct(string productId)
        {
            var result = helper.ExcuteNonQuery(
                   "Pro_Delete_Product",
                   "@ma",
                   productId);
            return result;
        }
        public List<ProductModel> Search2(int pageIndex,int pageSize,out long total, string ProductName,int CateId)
        {
            total = 0;
            try
            {
                    DataTable tb = helper.ExcuteReader("Pro_Search_Product",
                    "@page_index","@page_size", "@tensp", "@loaisp",
                    pageIndex,pageSize,ProductName, CateId);
                if (tb.Rows.Count > 0)
                {
                    total = (long)tb.Rows[0]["RecordCount"];
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ProductModel product = new ProductModel();
                        product.ProductId = tb.Rows[i]["ProductId"].ToString();
                        product.title = tb.Rows[i]["title"].ToString();
                        if (tb.Rows[i]["CateId"] == DBNull.Value)
                            product.CateId = 0;
                        else
                            product.CateId = int.Parse(tb.Rows[i]["CateId"].ToString());
                        ProductList.Add(product);
                    }
                    return ProductList;
                }
                else return null;
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ProductModel> ThongKeSanPhamBanChay(DateTime? fr_date , DateTime ? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader(
                    "Pro_ThongKe_SanPham_BanChay",
                    "@fr_date", "@to_date",
                    fr_date,to_date
                );
                if (tb!=null)
                {
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ProductModel product = new ProductModel();
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
                        ProductList.Add(product);
                    }
                }
                else
                {
                    ProductList = null;
                }
                return ProductList;
            }
            catch(Exception ex )
            {
                throw ex;
            }
        }
      

        
    }
    
}
