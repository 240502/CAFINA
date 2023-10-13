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
    public class BST_DAL
    {
        DataHelper helper = new DataHelper();

        public BSTModel GetById(int id)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_BST_ById","@id",id);
                if (tb != null)
                {
                    BSTModel bst = new BSTModel();
                    bst.id = int.Parse(tb.Rows[0]["id"].ToString());
                    bst.TenBST = tb.Rows[0]["TenBST"].ToString();
                    return bst;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BSTModel GetByName(string TenBST)
        {
            try
            {
                DataTable tb = helper.ExcuteReader("Pro_Get_BST_ByName", "@name", TenBST);
                if (tb != null)
                {
                    BSTModel bst = new BSTModel();
                    bst.id = int.Parse(tb.Rows[0]["id"].ToString());
                    bst.TenBST = tb.Rows[0]["TenBST"].ToString();
                    return bst;
                }
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Create(string TenBST)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Create_BST", "@name", TenBST);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(BSTModel bst)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Update_BST", "@id","@name", bst.id,bst.TenBST);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int id)
        {
            try
            {
                int result = helper.ExcuteNonQuery("Pro_Delete_BST", "@id", id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
