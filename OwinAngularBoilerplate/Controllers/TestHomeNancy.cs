
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OwinAngularBoilerplate.Controllers
{
    using OwinAngularBoilerplate.Models;
    using Nancy;

    public class TestHomeNancy : NancyModule
    {
        public TestHomeNancy() //:base("Views/Test/")
        {
            //Nancy.ModelBinding? Nancy.Response?
            //Before += context => {
            //    context.Items.Add("time", DateTime.UtcNow);
            //    if (false) return new NotFoundResponse(); 
            //};

            Get["/"] = p => View["Views/Test/Home.cshtml", new TestModel() { Name = "hola" }]; //{ return "hi!"; };  

            //Post["/"] = p => { 
                                    
            //};
        }
    }
}