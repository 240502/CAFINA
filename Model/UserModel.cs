using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class UserModel
    {
        public int Id { get; set; } 
        public string FullName { get; set; }
        public string email { get; set; }
        public string phone_number { get; set; }
        public DateTime Birthday { get; set; }
         public string Gender { get; set; }
        public string Address { get; set; }
        public int TongTienMua { get; set; }
    }
}
