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
    public class StatusDAL
    {
        DataHelper helper = new DataHelper();

        public List<StatusModel> GetList()
        {
            try
            {
                List<StatusModel> list = new List<StatusModel>();
                DataTable tb = helper.ExcuteReader("Pro_GetListStatusManager");
                if (tb != null)
                {
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        StatusModel status = new StatusModel();
                        status.id = int.Parse(tb.Rows[i]["id"].ToString());
                        status.statusName = tb.Rows[i]["statusName"].ToString();
                        list.Add(status);
                    }
                    return list;
                }
                else return null;

                

            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public StatusModel GetStatusById(int id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_GetStatusById", "@id", id);
                if (tb != null)
                {
                    StatusModel status = new StatusModel();
                    status.id = int.Parse(tb.Rows[0]["id"].ToString());
                    status.statusName = tb.Rows[0]["statusName"].ToString();
                    return status;
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
