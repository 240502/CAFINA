using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ThongKe_KhachModel
    {
        public string fullName { get; set; }
        public string address { get; set; }
        public string ProductId { get; set; }
        public string title { get; set; }
        public int? price { get; set; }
        public int? amount { get; set; }
        public DateTime order_date { get; set; }
    }
}
