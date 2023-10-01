using DataAccessLayer.Helper;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class UserLoginDAL
    {
        DataHelper helper = new DataHelper();
        public UserLoginModel Login(string email, string PassWord)
        {
            try
            {
                var tb = helper.ExcuteReader("Pro_Login", "@email", "@PassWord", email, PassWord);
                if (tb != null)
                {

                    UserLoginModel user = new UserLoginModel();
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

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
