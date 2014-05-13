using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Nancy;

[assembly: OwinStartup(typeof(OwinAngularBoilerplate.Startup))]
namespace OwinAngularBoilerplate
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            ConfigureWebApi(app);
            ConfigureNancy(app);
        }
    }
}
