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
        DataHelper helper = new DataHelper();
        List<ProductModel> ProductList = new List<ProductModel>();
        public ProductModel GetProductById(string productId)
        {
            DataTable tb = helper.ExcuteReader("GetbyId", "@productid", productId);

            if (tb != null)
            {
                ProductModel product = new ProductModel();
                product.ProductId = tb.Rows[0]["ProductId"].ToString();
                product.title = tb.Rows[0]["title"].ToString();
                product.price = int.Parse(tb.Rows[0]["price"].ToString());
                product.discount = int.Parse(tb.Rows[0]["discount"].ToString());
                product.description = tb.Rows[0]["description"].ToString();
                product.ChatLieu = tb.Rows[0]["ChatLieu"].ToString();
                product.HuongDanSuDung = tb.Rows[0]["HuongDanSuDung"].ToString();
                product.size = tb.Rows[0]["size"].ToString();
                product.color = tb.Rows[0]["color"].ToString();
                product.Object_id = tb.Rows[0]["Object_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[0]["Object_id"].ToString());
                product.Bst_id = tb.Rows[0]["Bst_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[0]["Bst_id"].ToString());
                product.CateDetailId = tb.Rows[0]["CateDt"] == DBNull.Value ? 0 : int.Parse(tb.Rows[0]["CateDt"].ToString());
                product.Created = tb.Rows[0]["Created"] == DBNull.Value ? DateTime.MinValue : DateTime.Parse(tb.Rows[0]["Created"].ToString());




                return product;
            }
            else return null;

        }

        public int CreateProduct(ProductModel product)
        {
            var result = helper.ExcuteNonQuery("InsertProduct",
                "@ma", "@ten", "@gia", "@giaGiam", "@mota", "@chatLieu", "@hd", "size", "@color", "@catedetailid", "@Object_id", "@Bst_id",
                product.ProductId, product.title, product.price, product.discount, product.description, product.ChatLieu, product.HuongDanSuDung, product.size, product.color, product.CateDetailId == 0 ? DBNull.Value : product.CateDetailId, product.Object_id == 0 ? DBNull.Value : product.Object_id, product.Bst_id == 0 ? DBNull.Value : product.Bst_id
            );
            return result;

        }
        public int UpdateProduct(ProductModel product)
        {
            var result = helper.ExcuteNonQuery(
                    "Pro_Update_Product",
                    "@ma", "@ten", "@gia", "@giaGiam", "@mota", "@chatLieu", "@hd", "size", "@color", "@catedetailid", "@Object_id", "@Bst_id",
                    product.ProductId, product.title, product.price, product.discount, product.description, product.ChatLieu, product.HuongDanSuDung, product.size, product.color, product.CateDetailId, product.Object_id, product.Bst_id
                );
            return result;
        }
        public int DeleteProduct(string productId)
        {
            var result = helper.ExcuteNonQuery(
                   "Pro_Delete_Product",
                   "@ma",
                   productId);
            return result;
        }
        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string ProductName)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Search_Product",
                "@page_index", "@page_size", "@tensp",
                pageIndex, pageSize, ProductName);
                if (tb.Rows.Count > 0)
                {
                    total = (long)tb.Rows[0]["RecordCount"];
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
                        product.Object_id = tb.Rows[i]["Object_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Object_id"].ToString());
                        product.Bst_id = tb.Rows[i]["Bst_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Bst_id"].ToString());
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
        public List<ProductModel> GetPhanTrang(int? pageIndex, int? pageSize, out int total)
        {
            total = 0;
            try
            {
                var result = helper.ExcuteReader("Pro_Get_All_Product", "@page_index", "@page_size", pageIndex, pageSize);
                if (result != null)
                {
                    total = int.Parse(result.Rows[0]["RecordCount"].ToString());
                    for (int i = 0; i < result.Rows.Count; i++)
                    {
                        ProductModel product = new ProductModel();
                        product.ProductId = result.Rows[i]["ProductId"].ToString();
                        product.title = result.Rows[i]["title"].ToString();
                        product.price = int.Parse(result.Rows[i]["price"].ToString());
                        product.discount = int.Parse(result.Rows[i]["discount"].ToString());
                        product.description = result.Rows[i]["description"].ToString();
                        product.ChatLieu = result.Rows[i]["ChatLieu"].ToString();
                        product.HuongDanSuDung = result.Rows[i]["HuongDanSuDung"].ToString();
                        product.size = result.Rows[i]["size"].ToString();
                        product.color = result.Rows[i]["color"].ToString();
                        product.CateDetailId = result.Rows[i]["CateDt"] == DBNull.Value ? 0 : int.Parse(result.Rows[i]["CateDt"].ToString());
                        product.Created = result.Rows[i]["Created"] == DBNull.Value ? DateTime.MinValue : DateTime.Parse(result.Rows[i]["Created"].ToString());
                        product.Object_id = result.Rows[i]["Object_id"] == DBNull.Value ? 0 : int.Parse(result.Rows[i]["Object_id"].ToString());
                        product.Bst_id = result.Rows[i]["Bst_id"] == DBNull.Value ? 0 : int.Parse(result.Rows[i]["Bst_id"].ToString());
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

        public List<ProductModel> GetByBST(int pageSize, int pageIndex, out int total, string TenBST)
        {
            try
            {
                total = 0;
                DataTable tb = helper.ExcuteReader("Pro_Get_ByBST", "@pageIndex", "@pageSize", "@TenBst", pageIndex, pageSize, TenBST);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ProductModel product = new ProductModel();
                        product.ProductId = tb.Rows[i]["ProductId"].ToString();
                        product.title = tb.Rows[i]["title"].ToString();
                        product.price = int.Parse(tb.Rows[i]["price"].ToString());
                        product.description = tb.Rows[i]["description"].ToString();
                        product.discount = int.Parse(tb.Rows[i]["discount"].ToString());
                        product.ChatLieu = tb.Rows[i]["ChatLieu"].ToString();
                        product.size = tb.Rows[i]["size"].ToString();
                        product.color = tb.Rows[i]["color"].ToString();
                        product.Object_id = tb.Rows[i]["Object_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Object_id"].ToString());
                        product.Bst_id = tb.Rows[i]["Bst_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Bst_id"].ToString());
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

        public List<ProductModel> GetRecommend(int pageIndex, int PageSize, out int total,string gender)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_Recommend", "@pageIndex", "@pageSize", "@gender", pageIndex, PageSize, gender);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
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
                        product.Object_id = tb.Rows[i]["Object_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Object_id"].ToString());
                        product.Bst_id = tb.Rows[i]["Bst_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Bst_id"].ToString());
                        product.CateDetailId = tb.Rows[i]["CateDt"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["CateDt"].ToString());
                        product.Created = tb.Rows[i]["Created"] == DBNull.Value ? DateTime.MinValue : DateTime.Parse(tb.Rows[i]["Created"].ToString());
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

        public List<ProductModel> GetByObName_BstName(int pageIndex, int pageSize, out int total, string BstName, string ObjectName)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetProductViewAll", "@pageIndex", "@pageSize", "@tenbst", "@tendoituong", pageIndex, pageSize, BstName, ObjectName);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
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
                        ProductList.Add(product);
                    }
                    return ProductList;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ProductModel> GetProductByCateName (string cateName)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetByCateName", "@cateName",cateName);
                if (tb != null)
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
                        product.Object_id = tb.Rows[i]["Object_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Object_id"].ToString());
                        product.Bst_id = tb.Rows[i]["Bst_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Bst_id"].ToString());
                        ProductList.Add(product);
                    }
                    return ProductList;
                }
                else return null;
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public List<ProductModel> GetProductByCateDetailName(string cateDetailName)
        {
           try{
                DataTable tb = helper.ExcuteReader("Pro_GetProducByCateDetailName", "@DetailName", cateDetailName);
                if (tb != null)
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
                        product.Object_id = tb.Rows[i]["Object_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Object_id"].ToString());
                        product.Bst_id = tb.Rows[i]["Bst_id"] == DBNull.Value ? 0 : int.Parse(tb.Rows[i]["Bst_id"].ToString());
                        ProductList.Add(product);
                    }
                    return ProductList;
                }
                else return null;
            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }

}
