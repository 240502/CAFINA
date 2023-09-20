using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class OrderModel
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public string FullName { get; set;}
        public string email { get; set;}
        public string phone_number { get; set;}
        public string address { get; set;}
         public string note { get;set;}
        public DateTime order_Date { get; set; }
        public int status { get; set; }
        public List<Order_Details> order_Details { get; set; }
     


    }
}
