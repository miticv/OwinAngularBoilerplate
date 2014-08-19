using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using OwinAngularBoilerplate.Models;
using System;

namespace OwinAngularBoilerplate
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser, int>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser, int> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new CustomUserStore(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser, int>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            #region RegisterTwoFactorProvider
            //manager.RegisterTwoFactorProvider("PhoneCode", new PhoneNumberTokenProvider<ApplicationUser, int>
            //{
            //    MessageFormat = "Your security code is: {0}"
            //});
            //manager.RegisterTwoFactorProvider("EmailCode", new EmailTokenProvider<ApplicationUser, int>
            //{
            //    Subject = "Security Code",
            //    BodyFormat = "Your security code is: {0}"
            //});
            //manager.EmailService = new EmailService();
            //manager.SmsService = new SmsService();
            #endregion

            #region UserLockoutEnabled
            manager.UserLockoutEnabledByDefault = true; // Convert.ToBoolean(ConfigurationManager.AppSettings["UserLockoutEnabledByDefault"].ToString());
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(15); // TimeSpan.FromMinutes(Double.Parse(ConfigurationManager.AppSettings["DefaultAccountLockoutTimeSpan"].ToString()));
            manager.MaxFailedAccessAttemptsBeforeLockout = 5; // Convert.ToInt32(ConfigurationManager.AppSettings["MaxFailedAccessAttemptsBeforeLockout"].ToString());
            #endregion

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser, int>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
