using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;
namespace Businesss
{
    public class Cate_ObjectBUS
    {
        Cate_ObjectDAL cate_ob = new Cate_ObjectDAL();
        public List<Cate_ObjectModel> get(string CateName,string ObjectName)
        {
            return cate_ob.Get(CateName,ObjectName);
        }
    }
}
