using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class AuthenticateModel
    {
        [Required]
        public string ? Email { get; set; }
        [Required]

        public string ? Password { get; set; }
    }
    public class AppSettings
    {
        public string Secret { get; set; }
    }
}
