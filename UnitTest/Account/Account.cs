using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace UnitTest
{

    using System.Threading.Tasks;
    using System.Net;
    using System.Net.Http;
    using System.Collections.Generic;
    using ServiceStack.Text;
    using OwinAngularBoilerplate.Models;
    using UnitTest.Models;

    [TestClass]
    public class Account : BaseHandler
    {
        [TestMethod]
        [TestCategory("UserInfo")]
        public async Task UserInfo_Unauthorized()
        {
            HttpResponseMessage response = await _client.GetAsync("api/Account/UserInfo");
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        [TestCategory("UserInfo")]
        public async Task UserInfo_Register()
        {
            RegisterBindingModel model = new RegisterBindingModel()
            {
                Email = String.Format("unittest_{0}@testing.registration.com", DateTime.Now.Ticks),
                Password = "Test!23",
                ConfirmPassword = "Test!23"
            };

            string str = ServiceStack.Text.JsonSerializer.SerializeToString(model, typeof(RegisterBindingModel));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _client.PostAsync("api/Account/Register", theContent);
            response.EnsureSuccessStatusCode();

            /* delete this user afterwards from DB?? */

        }

        [TestMethod]
        [TestCategory("UserInfo")]
        public async Task UserInfo_LogIn_GetInfo()
        {

            TokenRequestModel model = new TokenRequestModel()
            {
                username = "miticv@gmail.com", //miticv%40gmail.com
                password = "Test!234",
                grant_type = "password"
            };
            string str = String.Format("username={0}&password={1}&grant_type={2}", Uri.EscapeUriString(model.username), Uri.EscapeUriString(model.password), Uri.EscapeUriString(model.grant_type));

            /* Log In */            
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("Token", theContent);
            response.EnsureSuccessStatusCode();
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            /* Take token */
            string responseBody = await response.Content.ReadAsStringAsync();
            LoginTokenModel tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<LoginTokenModel>(responseBody);
            Assert.IsNotNull(tweb.access_token);
            Assert.AreEqual("bearer", tweb.token_type);
            Assert.AreEqual(model.username, tweb.userName);

            /* Get UserInfo using Token */
            _client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", tweb.access_token));
            response = await _client.GetAsync("api/Account/UserInfo");
            response.EnsureSuccessStatusCode();
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            /* clean up (remove Authorization used to get UserInfo) */
            _client.DefaultRequestHeaders.Remove("Authorization");
            Assert.AreEqual(false, _client.DefaultRequestHeaders.Contains("Authorization"));

        }

        [TestMethod]
        [TestCategory("UserInfo")]
        public async Task UserInfo_Logout_NotAllowed()
        {
            /* Logout */
            HttpResponseMessage response = await _client.GetAsync("api/Account/Logout");
            Assert.AreEqual(HttpStatusCode.MethodNotAllowed, response.StatusCode); /*  is not allowed for Token driven API indentity  */
        }


    }
}
