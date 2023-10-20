using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;

namespace Businesss
{
    public class CategoryDetailsBUS
    {
        CategoryDetailsDAL cateDAL = new CategoryDetailsDAL();
        public List<CategoryDetailsModel> Get(int cateId, string objectName)
        {
            return cateDAL.Get(cateId, objectName);
        }
    }
}
