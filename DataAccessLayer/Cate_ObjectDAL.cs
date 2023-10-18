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
    public class Cate_ObjectDAL
    {
        DataHelper helper = new DataHelper();
        public List<Cate_ObjectModel> Get(string CateName,string ObjectName)
        {

            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_By_CateName_And_ObjectName", "@catename", "@objectname",CateName,ObjectName);
                if (tb != null)
                {
                    List<Cate_ObjectModel> list = new List<Cate_ObjectModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        Cate_ObjectModel model = new Cate_ObjectModel();
                        model.id = int.Parse(tb.Rows[i]["id"].ToString());
                        model.CateName = tb.Rows[i]["CateName"].ToString();
                        model.TenDoiTuong = tb.Rows[i]["TenDoiTuong"].ToString();
                        list.Add(model);
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
    }
}
