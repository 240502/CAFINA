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
    public class ThongKeDoanhThuDAL
    {
        DataHelper helper = new DataHelper();

        public List<ThongKeDoanhThuModel> ThongKeDoanhThu(int fr_month, int to_month, int year)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_ThongKeDoanhThu", "@fr_month", "@to_month", "@year", fr_month, to_month, year);

                if (tb != null)
                {
                    List<ThongKeDoanhThuModel> list = new List<ThongKeDoanhThuModel> ();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThongKeDoanhThuModel tk = new ThongKeDoanhThuModel();
                        tk.Thang = int.Parse(tb.Rows[i]["Tháng"].ToString());
                        tk.Nam = int.Parse(tb.Rows[i]["Năm"].ToString());

                        tk.DoanhThu = int.Parse(tb.Rows[i]["Doanh Thu"].ToString());
                        list.Add(tk);
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
    }
}
