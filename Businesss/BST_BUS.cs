using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using Model;
namespace Businesss
{
    public class BST_BUS
    {

        BST_DAL bst_DAL = new BST_DAL();
        
        public BSTModel GetById(int id)
        {
            BSTModel bst = bst_DAL.GetById(id);
            return bst;
        }

        public List<BSTModel> GetList()
        {
            return bst_DAL.GetList();
        }
        public BSTModel GetByName(string TenBST)
        {
            BSTModel bst = bst_DAL.GetByName(TenBST);
            return bst;
        }

        public int Create(string TenBST)
        {
            int result = bst_DAL.Create(TenBST);
            return result;
        }

        public int Delete(int id)
        {
            int result = bst_DAL.Delete(id);
            return result;
        }

        public int Update(BSTModel bst)
        {
            int result = bst_DAL.Update(bst);
            return result;
        }
    }
}
