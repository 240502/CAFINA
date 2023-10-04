using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Helper;
using Model;
namespace DataAccessLayer
{
    public class CategoryDAL
    {
        DataHelper helper = new DataHelper();
        public int Create(CategoryModel cate)
        {
            try
            {
                var result = helper.ExcuteNonQuery("Pro_Create_Cate","@id","@CateName",cate.id,cate.CateName);
                return result;
            }catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete( int cateId)
        {
            try
            {
                var result = helper.ExcuteNonQuery("Pro_Delete_Cate", "@id", cateId);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(CategoryModel cate)
        {
            try
            {
                var result = helper.ExcuteNonQuery("Pro_Update_Cate", "@id", "@CateName", cate.id, cate.CateName);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
