using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer.Helper;
using System.Data;
using System.Xml.Linq;

namespace DataAccessLayer
{
    public class ObjectDAL
    {
        DataHelper helper = new DataHelper();
        List<ObjectModel> list = new List<ObjectModel>();

        public List<ObjectModel> GetList()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_List_Ob");
                if (tb != null)
                {
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ObjectModel model = new ObjectModel();
                        model.id = int.Parse(tb.Rows[i]["id"].ToString());
                        model.TenDoiTuong = tb.Rows[i]["TenDoiTuong"].ToString();
                        list.Add(model);
                    }
                    return list;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ObjectModel> Get(string ObName)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("GetObjectByName", "@name", ObName);
                if (tb != null)
                {
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ObjectModel model = new ObjectModel();
                        model.id = int.Parse(tb.Rows[i]["id"].ToString());
                        model.TenDoiTuong = tb.Rows[i]["TenDoiTuong"].ToString();
                        list.Add(model);
                    }
                    return list;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public ObjectModel GetByID(int id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("GetObjectById", "@id", id);
                if (tb != null)
                {
                    ObjectModel model = new ObjectModel();
                    model.id = int.Parse(tb.Rows[0]["id"].ToString());
                    model.TenDoiTuong = tb.Rows[0]["TenDoiTuong"].ToString();
                    list.Add(model);
                    return model;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Create(string obName)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Create_Ob", "@TenDoiTuong", obName);
                return reuslt;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int id)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Delete_Ob", "@id", id);
                return reuslt;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ObjectModel ob)
        {
            try
            {
                int reuslt = helper.ExcuteNonQuery("Pro_Update_Ob", "@id", "@TenDoiTuong", ob.id, ob.TenDoiTuong);
                return reuslt;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
