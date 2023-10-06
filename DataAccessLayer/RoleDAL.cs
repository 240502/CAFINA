using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Helper;
using Model;

namespace DataAccessLayer
{
    public class RoleDAL
    {
        DataHelper helper = new DataHelper();

        public RoleModel GetRoById(int id)
        {
            try
            {
                var result = helper.ExcuteReader("Pro_Get_By_Id","@id",id);
                if (result != null)
                {
                    RoleModel role = new RoleModel();
                    role.Id = int.Parse(result.Rows[0]["id"].ToString());
                    role.RoName = result.Rows[0]["RoName"].ToString();
                    return role;

                }
                else return null;

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public RoleModel Search(string RoName)
        {
            try
            {
                var result = helper.ExcuteReader("Pro_Search_Role", "@RoName", RoName);
                if (result != null)
                {
                    RoleModel role = new RoleModel();
                    role.Id = int.Parse(result.Rows[0]["id"].ToString());
                    role.RoName = result.Rows[0]["RoName"].ToString();
                    return role;

                }
                else return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(string RoName)
        {
            var result = helper.ExcuteNonQuery("Pro_Create_Role","@RoName",RoName);
            return result;

        }

        public int Update(RoleModel role)
        {
            var result = helper.ExcuteNonQuery("Pro_Update_Role", "@id", "@RoName", role.Id,role.RoName);
            return result;

        }

        public int Delete(int id)
        {
            var result = helper.ExcuteNonQuery("Pro_Delete_Role", "@id", id );
            return result;

        }
    }
}
