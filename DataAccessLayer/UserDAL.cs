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

        public int? Create_User(UserModel us)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Pro_Create_User",
                    "@FullName", "@email", "@Phone_Number", "@BirthDay", "@Gender", "@Role_Id", "@PassWord",
                    us.FullName,us.email,us.phone_number,us.Birthday,us.Gender,us.RoleId,us.PassWord
                );
                return result;
              
            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public int Update_User(UserModel us)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                   "Pro_Update_User",
                   "User_id","@FullName", "@email", "@Phone_Number", "@BirthDay", "@Gender", "@Role_Id", "@PassWord",
                   us.Id,us.FullName, us.email, us.phone_number, us.Birthday, us.Gender, us.RoleId, us.PassWord
               );
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Delete_User(int usId) 
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                   "Pro_Delete_User",
                   "User_id",
                    usId
               );
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
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
      

    }
}
