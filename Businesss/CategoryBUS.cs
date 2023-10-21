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

        public List<CategoryModel> GetList()
        {
            return cateDAL.GetList();
        }
        public List<CategoryModel> GetCateByObId(int obId)
        {
            return cateDAL.GetCateByObId(obId);
        }
        public CategoryModel Get(int id)
        {
            var result = cateDAL.GetCateById(id);
            return result;
        }

        public CategoryModel Search(string CateName)
        {
            var result = cateDAL.Search(CateName);
            return result;
        }
        public int Create(string  cateName,int obId)
        {
            var result = cateDAL.Create(cateName,obId);
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
