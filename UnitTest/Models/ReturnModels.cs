using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest
{

    using System.Runtime.Serialization;

    [DataContract]
    public class LoginTokenModel
    {
        [DataMember(Name = "access_token")]
        public string access_token { get; set; }
        [DataMember(Name = "token_type")]
        public string token_type { get; set; }
        [DataMember(Name = "expires_in")]
        public int expires_in { get; set; }
        [DataMember(Name = "userName")]
        public string userName { get; set; }
        [DataMember(Name = ".issued")]
        public string issued { get; set; }
        [DataMember(Name = ".expires")]
        public string expires { get; set; }

    }
}
