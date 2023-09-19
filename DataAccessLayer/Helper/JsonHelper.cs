using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
namespace DataAccessLayer.Helper
{
    public static class MessageConvert
    {
        private static readonly JsonSerializerSettings Settings;
        static MessageConvert()
        {
            Settings = new JsonSerializerSettings
            {
                Formatting = Formatting.None,
                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        public static string SerializeObject(this object obj)
        {
            if (obj == null)
                return "";
            return JsonConvert.SerializeObject(obj, Settings);
        }

        public static T DeserializeObject<T>(this string json)
        {

            return JsonConvert.DeserializeObject<T>(json, Settings);

        }

        public static Object DeserializeObject(this string json, Type type)
        {
            try
            {
                return JsonConvert.DeserializeObject(json, type, Settings);
            }
            catch
            {
                return null;
            }
        }
    }
    public class JsonHelper
    {
    }
}
