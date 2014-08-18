using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest
{

    using System.Configuration;
    using System.Net.Http;
    using System.Net.Http.Headers;

    public class BaseHandler
    {

        protected HttpClient _client;

        public BaseHandler() 
        {
            HttpClientHandler handler = new HttpClientHandler();
            _client = new HttpClient(handler);
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _client.BaseAddress = new Uri(ConfigurationManager.AppSettings["TestBaseUrl"]);

        }
    }
}
