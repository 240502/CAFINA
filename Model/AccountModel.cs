using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AccountModel
    {
        public int id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int User_id { get; set; }
        public int Role_id { get; set; }

    }
}
