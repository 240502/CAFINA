using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;

namespace Businesss
{
    public class StatusBUS
    {
        StatusDAL StatusDAL = new StatusDAL();

        public List<StatusModel> GetListStatus()
        {
            return StatusDAL.GetList();
        }
        public StatusModel GetStatusById(int id)
        {
            return StatusDAL.GetStatusById(id);
        }
    }
}
