using DataAccessLayer;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Businesss
{
    public class Order_DetailsBUS
    {
        Order_DetailsDAL od = new Order_DetailsDAL();
        public List<Order_Details> GetListOrderByUsId(int usid)
        {
            return od.GetListOrderByUsId(usid);
        }
    }
}
