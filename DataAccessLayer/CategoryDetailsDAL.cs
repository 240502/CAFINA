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
    public class CategoryDetailsDAL
    {
        DataHelper helper = new DataHelper();
        public List<CategoryDetailsModel> Get(int catid,string objectName)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_CateDetails", "@cateid", "@objectname", catid, objectName);
                var count = tb.Rows.Count;
                if (tb != null)
                {
                    List<CategoryDetailsModel> list = new List<CategoryDetailsModel>();


                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        CategoryDetailsModel cate = new CategoryDetailsModel();
                        cate.id = int.Parse(tb.Rows[i]["id"].ToString());
                        cate.DetailName = tb.Rows[i]["DetailName"].ToString();
                        cate.CateId = int.Parse(tb.Rows[i]["CateId"].ToString());
                        cate.ObjectId = int.Parse(tb.Rows[i]["Object_id"].ToString());
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
    }
}
