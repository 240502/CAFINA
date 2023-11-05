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

        public List<CategoryDetailsModel> GetList()
        {
            return cateDAL.GetList();
        }
        public int Create(CategoryDetailsModel cate)
        {
            return cateDAL.Create(cate);
        }
        public int Update (CategoryDetailsModel cate)
        {
            return cateDAL.Update(cate);
        }    
        public int Delete(int id)
        {
            return cateDAL.Delete(id);
        }

        public CategoryDetailsModel GetById(int id)
        {
            return cateDAL.GetById(id);
        }
    }
}
