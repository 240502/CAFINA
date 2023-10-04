using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;

namespace Businesss
{
    public class CategoryBUS
    {
        CategoryDAL cateDAL =new CategoryDAL();
        List<CategoryModel> listCate;
        public int Create(CategoryModel cate)
        {
            var result = cateDAL.Create(cate);
            return result;
        }

        public int Update(CategoryModel cate)
        {
            var result = cateDAL.Update(cate);
            return result;
        }
        public int Delete(int cateId)
        {
            var result = cateDAL.Delete(cateId);
            return result;
        }

    }
}
