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

        public UserModel GetUsById(int id)
        {
            try
            {
                var result = helper.ExcuteReader("Pro_Get_User_By_Id","@id",id);
                if (result != null)
                {
                    UserModel us = new UserModel();
                    us.Id = int.Parse(result.Rows[0]["id"].ToString());
                    us.FullName = result.Rows[0]["FullName"].ToString();
                    us.email = result.Rows[0]["email"].ToString();
                    us.phone_number = result.Rows[0]["Phone_Number"].ToString();
                    us.Birthday = DateTime.Parse(result.Rows[0]["BirthDay"].ToString());
                    us.Gender = result.Rows[0]["Gender"].ToString();
                    us.RoleId = int.Parse(result.Rows[0]["Role_Id"].ToString());
                    return us;
                }
                else return null;   

            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<UserModel> Search(string FullName,string email,string PhoneNumber)
        {
            try
            {
                var result = helper.ExcuteReader("Pro_Search_Us", "@FullName", "@Email", "@PhoneNumber",FullName,email,PhoneNumber);
                if (result != null)
                {
                    List<UserModel> listUs = new List<UserModel>();
                    for (int i = 0; i < result.Rows.Count; i++)
                    {
                        UserModel us = new UserModel();
                        us.Id = int.Parse(result.Rows[0]["id"].ToString());
                        us.FullName = result.Rows[0]["FullName"].ToString();
                        us.email = result.Rows[0]["email"].ToString();
                        us.phone_number = result.Rows[0]["Phone_Number"].ToString();
                        us.Birthday = DateTime.Parse(result.Rows[0]["BirthDay"].ToString());
                        us.Gender = result.Rows[0]["Gender"].ToString();
                        us.RoleId = int.Parse(result.Rows[0]["Role_Id"].ToString());
                        listUs.Add(us);
                    }
                    return listUs;
                    
                }
                else return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

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

    }
}
