using System;
using System.Collections.Generic;
using System.ComponentModel;
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

        public int TotalUser()
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Total_User");
                if (tb != null)
                {
                    return int.Parse(tb.Rows[0]["total"].ToString());
                }
                else return 0;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<UserModel> GetListUs(int pageIndex, int pageSize,out int total)
        {
            total = 0;
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_ListUS", "@pageIndex", "@pageSize", pageIndex, pageSize);
                if (tb != null)
                {
                    total = int.Parse(tb.Rows[0]["RecordCount"].ToString());
                    List<UserModel> list = new List<UserModel>();
                    for (int i = 0; i < tb.Rows.Count; i++)
                    {
                        UserModel us = new UserModel();
                        us.Id = int.Parse(tb.Rows[i]["id"].ToString());
                        us.FullName = tb.Rows[i]["FullName"].ToString();
                        us.email = tb.Rows[i]["email"].ToString();
                        us.phone_number = tb.Rows[i]["Phone_Number"].ToString();
                        us.Birthday = DateTime.Parse(tb.Rows[i]["BirthDay"].ToString());
                        us.Gender = tb.Rows[i]["Gender"].ToString();
                        us.Address = tb.Rows[i]["Address"].ToString();
                        list.Add(us);
                    }
                    return list;
                }
                else return null;

            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public UserModel GetUsById(int id)
        {
            try
            {
                var result = helper.ExcuteReader("Pro_Get_User_By_Id", "@id",id);
                if (result != null)
                {
                    UserModel us = new UserModel();
                    us.Id = int.Parse(result.Rows[0]["id"].ToString());
                    us.FullName = result.Rows[0]["FullName"].ToString();
                    us.email = result.Rows[0]["email"].ToString();
                    us.phone_number = result.Rows[0]["Phone_Number"].ToString();
                    us.Birthday = DateTime.Parse(result.Rows[0]["BirthDay"].ToString());
                    us.Gender = result.Rows[0]["Gender"].ToString();
                    us.Address = result.Rows[0]["Address"].ToString();
                    return us;
                }
                else return null;   

            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<UserModel> Search(string value,int pageIndex,int pageSize,out int total)
        {
            total = 0;
            try
            {
                var result = helper.ExcuteReader("Pro_Search_Us", "@value","@pageIndex","@pageSize",value,pageIndex,pageSize);

                if (result != null)
                {
                    total = int.Parse(result.Rows[0]["RecordCount"].ToString());
                    List<UserModel> listUs = new List<UserModel>();
                    for (int i = 0; i < result.Rows.Count; i++)
                    {
                        UserModel us = new UserModel();
                        us.Id = int.Parse(result.Rows[i]["id"].ToString());
                        us.FullName = result.Rows[i]["FullName"].ToString();
                        us.email = result.Rows[i]["email"].ToString();
                        us.phone_number = result.Rows[i]["Phone_Number"].ToString();
                        us.Birthday = DateTime.Parse(result.Rows[i]["BirthDay"].ToString());
                        us.Gender = result.Rows[i]["Gender"].ToString();
                        us.Address = result.Rows[i]["Address"].ToString();
                        listUs.Add(us);
                    }
                    return listUs;
                    
                }
                else return null;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int? Create_User(UserModel us)
        {
            try
            {
                var result = helper.ExcuteNonQuery(
                    "Pro_Create_User",
                    "@FullName", "@email", "@Phone_Number", "@BirthDay", "@Gender", "@Address",
                    us.FullName,us.email,us.phone_number,us.Birthday,us.Gender,us.Address
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
                   "User_id","@FullName", "@email", "@Phone_Number", "@BirthDay", "@Gender", "@Address",
                   us.Id,us.FullName, us.email, us.phone_number, us.Birthday, us.Gender, us.Address
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

    }
}
