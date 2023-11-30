using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using DataAccessLayer;
namespace Businesss
{
    public class GaleryBUS
    {
        GaleryDAL galeryDAL = new GaleryDAL();
        
        public GaleryModel GetByProductId(string productId)
        {
            GaleryModel galery= galeryDAL.GetByProductId(productId);
            return galery;
        } 
        public int Create(GaleryModel galery)
        {
            return galeryDAL.Create(galery);
        }


        public int Update(GaleryModel galery)
        {
            return galeryDAL.Update(galery);
        }
        public int Delete(string productid)
        {
            return galeryDAL.Delete(productid);
        }
    }
}
