using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Helper
{
    public class DataHelper
    {
        string ConnectString = @"Data Source =LAPTOP-C3HMM5D6\SQLEXPRESS;Initial Catalog = Cafina; Integrated Security = True";
        SqlConnection connection;
        public DataHelper()
        {
            connection = new SqlConnection(ConnectString);
        }
        public DataHelper(string ConStr)
        {
            this.ConnectString = ConStr;
            connection = new SqlConnection(ConnectString);
        }
        public bool Open()
        {
            try
            {
                if(connection.State !=ConnectionState.Open)
                    connection.Open();
                return true;
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        public void Close()
        {
            if(connection.State != ConnectionState.Closed) 
                connection.Close();
        }
        public DataTable ExcuteReader(string ProcedureName,params object[] param_List)
        {
            DataTable tb = new DataTable();
            try
            {
                SqlCommand cmd = new SqlCommand { CommandType = CommandType.StoredProcedure,CommandText = ProcedureName};
                Open();
                cmd.Connection = connection;
                int paramterInput = (param_List.Length) / 2;
                for (int i = 0; i < paramterInput; i++)
                {
                    string paramName = Convert.ToString(param_List[i]);
                    object paramValue = param_List[i + paramterInput];
                    if (paramName.ToLower().Contains("json"))
                    {
                        cmd.Parameters.Add(new SqlParameter
                            {
                                ParameterName = paramName,
                                SqlDbType=SqlDbType.NVarChar,
                                Value = paramValue ?? DBNull.Value
                            }    
                        );
                    }
                    else
                    {
                        cmd.Parameters.Add(new SqlParameter(paramName,paramValue ?? DBNull.Value));
                    }
                }
                

                SqlDataAdapter ad = new SqlDataAdapter(cmd);
                ad.Fill(tb);
                ad.Dispose();
                cmd.Dispose();
                connection.Dispose();
            }
            catch(Exception ex) 
            {
                tb = null;
            }
            finally
            {
                Close();
            }
            return tb;
        }
        public int ExcuteNonQuery(string ProcedureName,params object[] param_List)
        {
            int  result = 0;
            try
            {
                SqlCommand cmd = new SqlCommand { CommandText=ProcedureName,CommandType=CommandType.StoredProcedure,Connection = connection};
                Open();
                int paramterInput = (param_List.Length) / 2;
                for (int i = 0; i < paramterInput; i++)
                {
                    string paramName = Convert.ToString(param_List[i]);
                    object paramValue = param_List[i+paramterInput];
                    if (paramName.ToLower().Contains("json"))
                    {
                        cmd.Parameters.Add(new SqlParameter { ParameterName = paramName, Value = paramValue, SqlDbType = SqlDbType.NVarChar });
                    }
                    else
                    {
                        cmd.Parameters.Add(new SqlParameter(paramName,paramValue));
                    }
                }
                result = cmd.ExecuteNonQuery();
                cmd.Dispose();
                connection.Dispose();
            }
            catch(Exception ex) 
            {
                result = -1;
            }finally 
            {
                Close();            
            }
            return result;
        }

      
    }
}
