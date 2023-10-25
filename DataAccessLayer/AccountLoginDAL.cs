using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer.Helper;
namespace DataAccessLayer
{
    public class AccountLoginDAL
    {
        DataHelper helper = new DataHelper();   
        public AccountLoginModel Login(string usName, string PassWord)
        {
            try
            {
                var tb = helper.ExcuteReader("Pro_Login", "@usName", "@pw", usName, PassWord);
                if (tb != null)
                {

                    AccountLoginModel acc = new AccountLoginModel();
                    acc.id = int.Parse(tb.Rows[0]["id"].ToString());
                    acc.UserName = tb.Rows[0]["UserName"].ToString();
                    acc.Role_id = int.Parse(tb.Rows[0]["Role_Id"].ToString());
                    acc.User_id = int.Parse(tb.Rows[0]["User_id"].ToString());
                    acc.Password = tb.Rows[0]["PassWord"].ToString();
                    return acc;
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
