﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest.Models
{
    public class TokenRequestModel
    {
        public string username { get; set; }
        public string password { get; set; }
        public string grant_type { get; set; }
    }
}
