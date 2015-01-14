using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace OwinAngularBoilerplate.Models
{
    public class Resource
    {
        [Key]
        public int ResourceId { get; set; }
        [Required]
        public string ResourceCode { get; set; }
        [Required]
        public string ResourceGroup { get; set; }
        [Required]
        public string English { get; set; }

        public string Chinese { get; set; }
        public string SerbianLatin { get; set; }
        public string Serbian { get; set; }
        public string Italian { get; set; }        

        public DateTime CreateDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public int LastUpdatedBy { get; set; }

    }

    public class ResourceResult
    {
        public string Group { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
    }

}