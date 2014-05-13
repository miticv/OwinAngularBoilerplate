
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;

namespace OwinAngularBoilerplate
{
    using Nancy;
    using Nancy.Owin;

    public partial class Startup
    {
        private void ConfigureNancy(IAppBuilder app)
        {
            //Do not pass anyting through!
            //app.UseNancy();

            //pass through to next middleware if not found or f internal server error!
            app.UseNancy(options =>
              options.PerformPassThrough = context =>
                  context.Response.StatusCode == HttpStatusCode.NotFound
                  || context.Response.StatusCode == HttpStatusCode.InternalServerError
                  );

        }
    }
}