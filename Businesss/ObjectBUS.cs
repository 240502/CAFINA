using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;
namespace Businesss
{
    public class ObjectBUS
    {
        ObjectDAL obDAL = new ObjectDAL();
        public List<ObjectModel> Get(string obName)
        {
            return obDAL.Get(obName);
        }

        public ObjectModel GetByID(int id)
        {
            return obDAL.GetByID(id);
        }

        public List<ObjectModel> GetList()
        {
            return obDAL.GetList();
        }

        public int Create (string ObName)
        {
            return obDAL.Create(ObName);
        }

        public int Delete(int id)
        {
            return obDAL.Delete(id);
        }

        public int Update(ObjectModel model)
        {
            return obDAL.Update(model);
        }
    }
}
