using DataAccessLayer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Businesss
{
    public class AccountLoginBUS
    {
        AccountLoginDAL accDAL = new AccountLoginDAL();
        private string secret;

        public AccountLoginModel Login(string uName, string PassWord)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();
            IConfigurationSection configuration1 = configuration.GetSection("AppSettings").GetSection("Secret");
            secret = configuration1.Value;
            // secret = configuration1.Value;
            AccountLoginModel acc = accDAL.Login(uName, PassWord);
            if (acc == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, acc.Role_id.ToString()),
                    new Claim(ClaimTypes.Email, acc.UserName)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            acc.token = tokenHandler.WriteToken(token);
            return acc;
        }
    }
}
