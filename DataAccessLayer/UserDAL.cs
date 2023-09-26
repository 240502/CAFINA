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
    public class UserDAL
    {
        DataHelper helper = new DataHelper();
        public List<UserModel> ThongKeTop5UserTieuNhieuTienNhat(DateTime? fr_date, DateTime? to_date)
        {
            try
            {
                DataTable tb = helper.ExcuteReader(
                    "Pro_ThongKe_User",
                    "@fr_date","@to_date",
                    fr_date,to_date
                );
                List<UserModel> listUser = new List<UserModel>();
                if (tb != null)
                {
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        UserModel us = new UserModel();
                        us.Id = int.Parse(tb.Rows[i]["id"].ToString());
                        us.FullName = tb.Rows[i]["FullName"].ToString();
                        us.email = tb.Rows[i]["email"].ToString();
                        us.phone_number = tb.Rows[i]["Phone_Number"].ToString();
                        us.Birthday = DateTime.Parse(tb.Rows[i]["BirthDay"].ToString());
                        us.Gender = tb.Rows[i]["Gender"].ToString();
                        us.RoleId = int.Parse(tb.Rows[i]["Role_Id"].ToString());
                        us.TongTienMua = int.Parse(tb.Rows[i]["Tổng tiền mua"].ToString());
                        listUser.Add(us);

                    }
                }
                else listUser = null;

                return listUser;

            }catch (Exception ex)
            {
                throw ex;
            }
        }
        public UserModel Login (string email,string PassWord)
        {
            try
            {
                var  tb = helper.ExcuteReader("Pro_Login","@email","@PassWord",email,PassWord);
                if (tb != null)
                {

                    UserModel user = new UserModel();
                    user.Id = int.Parse(tb.Rows[0]["id"].ToString());
                    user.FullName = tb.Rows[0]["FullName"].ToString();
                    user.email = tb.Rows[0]["email"].ToString();
                    user.phone_number = tb.Rows[0]["Phone_Number"].ToString();
                    user.Gender = tb.Rows[0]["Gender"].ToString();
                    user.RoleId = int.Parse(tb.Rows[0]["Role_Id"].ToString());
                    user.PassWord = tb.Rows[0]["PassWord"].ToString();
                    user.Birthday = DateTime.Parse(tb.Rows[0]["BirthDay"].ToString());
                    return user;
                }
                else return null;

            }catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
