using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer.Helper;
using System.Data;
using System.Security.AccessControl;

namespace DataAccessLayer
{
    public class CategoryDetailsDAL
    {
        DataHelper helper = new DataHelper();
        public List<CategoryDetailsModel> Get(int catid,string objectName)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_CateDetails", "@cateid", "@objectname", catid, objectName);
                if (tb != null)
                {
                    List<CategoryDetailsModel> list = new List<CategoryDetailsModel>();


                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        CategoryDetailsModel cate = new CategoryDetailsModel();
                        cate.id = int.Parse(tb.Rows[i]["id"].ToString());
                        cate.DetailName = tb.Rows[i]["DetailName"].ToString();
                        cate.CateId = int.Parse(tb.Rows[i]["CateId"].ToString());
                        list.Add(cate);
                    }
                    return list;
                }
                else return null;
            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<CategoryDetailsModel> GetList()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_List_CateDetails");
                if (tb != null)
                {
                    List<CategoryDetailsModel> list = new List<CategoryDetailsModel>();


                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        CategoryDetailsModel cate = new CategoryDetailsModel();
                        cate.id = int.Parse(tb.Rows[i]["id"].ToString());
                        cate.DetailName = tb.Rows[i]["DetailName"].ToString();
                        list.Add(cate);
                    }
                    return list;
                }
                else return null;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int Create(CategoryDetailsModel cate)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Create_CateDetails", "@name", "@ob_id", "@cateid",cate.DetailName,cate.Object_id,cate.CateId);
                return result;
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public int Update(CategoryDetailsModel cate)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Update_CateDetails", "@id","@name", "@ob_id", "@cateid",cate.id, cate.DetailName, cate.Object_id, cate.CateId);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int  Delete(int id)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Delete_CateDetails","@id",id);
                return result;

            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public CategoryDetailsModel GetById(int id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetCateDetailById", "@id", id);
                if (tb != null)
                {
                    CategoryDetailsModel result = new CategoryDetailsModel();
                    result.id = int.Parse(tb.Rows[0]["id"].ToString());
                    result.DetailName = tb.Rows[0]["DetailName"].ToString();
                    result.Object_id = int.Parse(tb.Rows[0]["Object_id"].ToString());
                    result.CateId = int.Parse(tb.Rows[0]["CateId"].ToString());

                    return result;
                }
                else return null;   
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
