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

        public List<ThongKeDoanhThuModel> ThongKeDoanhThu (DateTime? fr_date, DateTime ? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_ThongKeDoanhThu", "@fr_date", "@to_date", fr_date,to_date);

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
        public List<ThongKeDoanhThuModel> ThongKeDoanhThuTheoNgay(DateTime? fr_date, DateTime? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_ThongKeDoanhThuTheoNgayTrongThang", "@fr_date", "@to_date", fr_date, to_date);

                if (tb != null)
                {
                    List<ThongKeDoanhThuModel> list = new List<ThongKeDoanhThuModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        ThongKeDoanhThuModel tk = new ThongKeDoanhThuModel();
                        tk.Day = int.Parse(tb.Rows[i]["day"].ToString());
                        tk.Thang = int.Parse(tb.Rows[i]["day"].ToString());
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
