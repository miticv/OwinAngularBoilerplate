using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using OwinAngularBoilerplate.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;


namespace OwinAngularBoilerplate.Repository
{
    public class ResourceRepository : IDisposable
    {
        private ResourceContext _ctx;

        public ResourceRepository()
        {
            _ctx = new ResourceContext();
        }

        public void Dispose()
        {
            _ctx.Dispose();
        }


        public List<Resource> GetAllResources()
        {
            return _ctx.Resources.ToList();
        }

        public List<ResourceResult> GetAllResources(string lang)
        {
            if (lang.Equals("en")) {
                return _ctx.Resources.Where(i => !String.IsNullOrEmpty(i.English)).Select(i => new ResourceResult { Group = i.ResourceGroup, Code = i.ResourceCode, Value = i.English }).ToList<ResourceResult>();
            }
            else if (lang.Equals("zh"))
            {
                return _ctx.Resources.Where(i => !String.IsNullOrEmpty(i.Chinese)).Select(i => new ResourceResult { Group = i.ResourceGroup, Code = i.ResourceCode, Value = i.Chinese }).ToList<ResourceResult>();
            }
            else if (lang.Equals("sr-latn"))
            {
                return _ctx.Resources.Where(i => !String.IsNullOrEmpty(i.SerbianLatin)).Select(i => new ResourceResult { Group = i.ResourceGroup, Code = i.ResourceCode, Value = i.SerbianLatin }).ToList<ResourceResult>();
            }
            else if (lang.Equals("sr-cyrl"))
            {
                return _ctx.Resources.Where(i => !String.IsNullOrEmpty(i.Serbian)).Select(i => new ResourceResult { Group = i.ResourceGroup, Code = i.ResourceCode, Value = i.Serbian }).ToList<ResourceResult>();
            }
            else if (lang.Equals("it"))
            {
                return _ctx.Resources.Where(i => !String.IsNullOrEmpty(i.Italian)).Select(i => new ResourceResult { Group = i.ResourceGroup, Code = i.ResourceCode, Value = i.Italian }).ToList<ResourceResult>();
            }
            else 
            {
                return new List<ResourceResult>();
            }
        }


    }
}