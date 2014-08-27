using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace UnitTest
{

    using System.Threading.Tasks;
    using System.Net;
    using System.Linq;
    using System.Net.Http;
    using System.Collections.Generic;
    using ServiceStack.Text;
    using OwinAngularBoilerplate.Models;
    using UnitTest.Models;

    [TestClass]
    public class Account : BaseHandler
    {

        #region private functions
        private async Task<LoginTokenModel> getAdminToken()
        {
            TokenRequestModel model = new TokenRequestModel()
            {
                username = "miticv@gmail.com",
                password = "Test!234",
                grant_type = "password"
            };
            string str = String.Format("username={0}&password={1}&grant_type={2}", Uri.EscapeUriString(model.username), Uri.EscapeUriString(model.password), Uri.EscapeUriString(model.grant_type));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("Token", theContent);
            response.EnsureSuccessStatusCode();
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            string responseBody = await response.Content.ReadAsStringAsync();
            LoginTokenModel tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<LoginTokenModel>(responseBody);

            return tweb;

        }

        private void clearToken()
        {
            _client.DefaultRequestHeaders.Remove("Authorization");
            Assert.AreEqual(false, _client.DefaultRequestHeaders.Contains("Authorization"));
        }
        #endregion

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
                Email = String.Format("unittest_{0:yyyy/MM/dd_HH-mm-ss-fff}@testing.registration.com", DateTime.Now),
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
        public async Task UserInfo_LockOut_User()
        {
            RegisterBindingModel model = new RegisterBindingModel()
            {
                Email = String.Format("unittest_{0:yyyy/MM/dd_HH-mm-ss-fff}@testing.registration.com", DateTime.Now),
                Password = "Test!23",
                ConfirmPassword = "Test!23"
            };

            string str = ServiceStack.Text.JsonSerializer.SerializeToString(model, typeof(RegisterBindingModel));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _client.PostAsync("api/Account/Register", theContent);
            response.EnsureSuccessStatusCode();

            /* delete this user afterwards from DB?? */
            /* ==============  Lock User ==================*/
            TokenRequestModel wrongLoginModel = new TokenRequestModel()
            {
                username = model.Email,
                password = "123",
                grant_type = "password"
            };
            str = String.Format("username={0}&password={1}&grant_type={2}", Uri.EscapeUriString(wrongLoginModel.username), Uri.EscapeUriString(wrongLoginModel.password), Uri.EscapeUriString(wrongLoginModel.grant_type));

            int triedToLock = 5;
            for (int i = 1; i <= triedToLock; i++)
            {
                /* Attempt Log In 1 */
                theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
                response = await _client.PostAsync("Token", theContent);
                Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
                string responseBody = await response.Content.ReadAsStringAsync();
                var tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<ErrorModel>(responseBody);

                if (i == triedToLock)
                {
                    //Assert.AreEqual(tweb.error, "invalid_grant");
                    Assert.AreEqual(tweb.error_description, "The user is locked out.", "User is not locked!");
                }
                //else
                //{
                //    Assert.AreEqual(tweb.error, "invalid_grant");
                //    Assert.AreEqual(tweb.error_description, "The user name or password is incorrect.");
                //}
            }

        }

        [TestMethod]
        [TestCategory("UserInfo")]
        public async Task UserInfo_LogIn_GetInfo()
        {

            TokenRequestModel model = new TokenRequestModel()
            {
                username = "miticv@gmail.com",
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
            clearToken();

        }

        //[TestMethod]
        //[TestCategory("UserInfo")]
        //public async Task UserInfo_Email_Not_Confirmed()
        //{

        //    TokenRequestModel wrongLoginModel = new TokenRequestModel()
        //    {
        //        username = "test@user.com",  //user whose lockout is not enabled 
        //        password = "Test!23",
        //        grant_type = "password"
        //    };
        //    string str = String.Format("username={0}&password={1}&grant_type={2}", Uri.EscapeUriString(wrongLoginModel.username), Uri.EscapeUriString(wrongLoginModel.password), Uri.EscapeUriString(wrongLoginModel.grant_type));

        //    StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
        //    HttpResponseMessage response = await _client.PostAsync("Token", theContent);
        //    Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        //    string responseBody = await response.Content.ReadAsStringAsync();
        //    var tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<ErrorModel>(responseBody);

        //    Assert.AreEqual(tweb.error_description, "The Email is not confirmed.");

        //}


        [TestMethod]
        [TestCategory("UserInfo")]
        public async Task UserInfo_Logout_NotAllowed()
        {
            /* Logout */
            HttpResponseMessage response = await _client.GetAsync("api/Account/Logout");
            Assert.AreEqual(HttpStatusCode.MethodNotAllowed, response.StatusCode); /*  is not allowed for Token driven API indentity  */
        }

        [TestMethod]
        [TestCategory("Roles")]
        public async Task Roles_Create_Delete_Add_Remove_Unauthorized()
        {
            CreateRoleModel modelCreate = new CreateRoleModel()
            {
                NewRole = "Admin"
            };

            string str = String.Format("NewRole={0}", Uri.EscapeUriString(modelCreate.NewRole));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("api/Account/AddRole", theContent);
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            DeleteRoleModel modelDelete = new DeleteRoleModel()
            {
                DeleteRole = "TestRole"
            };

            str = String.Format("DeleteRole={0}", Uri.EscapeUriString(modelDelete.DeleteRole));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/DeleteRole", theContent);
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            UserToRoleModel model = new UserToRoleModel()
            {
                Role = "Test",
                User = "miticv@gmail.com"
            };

            str = String.Format("Role={0}&User={1}", Uri.EscapeUriString(model.Role), Uri.EscapeUriString(model.User));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/AddUserToRole", theContent);
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            str = String.Format("Role={0}&User={1}", Uri.EscapeUriString(model.Role), Uri.EscapeUriString(model.User));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/RemoveUserRole", theContent);
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            response = await _client.GetAsync("api/Account/GetUserRoles" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

        }

        [TestMethod]
        [TestCategory("Roles")]
        public async Task Roles_Create_Existing_Role()
        {
            CreateRoleModel model = new CreateRoleModel()
            {
                NewRole = "Admin"
            };

            LoginTokenModel token = await getAdminToken();
            _client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", token.access_token));

            string str = String.Format("NewRole={0}", Uri.EscapeUriString(model.NewRole));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("api/Account/AddRole", theContent);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);

            string responseBody = await response.Content.ReadAsStringAsync();
            ErrorValidationModel tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<ErrorValidationModel>(responseBody);

            Assert.AreEqual(tweb.ModelState.FirstOrDefault().Value, "[Name Admin is already taken.]");

            clearToken();
        }

        [TestMethod]
        [TestCategory("Roles")]
        public async Task Roles_Create_Delete_Role()
        {
            DeleteRoleModel modelDelete = new DeleteRoleModel()
            {
                DeleteRole = "TestRole"
            };
            CreateRoleModel model = new CreateRoleModel()
            {
                NewRole = "TestRole"
            };

            LoginTokenModel token = await getAdminToken();
            _client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", token.access_token));

            string str = String.Format("NewRole={0}", Uri.EscapeUriString(model.NewRole));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("api/Account/AddRole", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            str = String.Format("DeleteRole={0}", Uri.EscapeUriString(modelDelete.DeleteRole));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/DeleteRole", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            clearToken();
        }

        [TestMethod]
        [TestCategory("Roles")]
        public async Task Roles_Add_Remove_User_to_Role()
        {

            UserToRoleModel model = new UserToRoleModel()
            {
                Role = "Test",
                User = "miticv@gmail.com"
            };

            LoginTokenModel token = await getAdminToken();
            _client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", token.access_token));

            //check if belongs to the role (it should not)
            HttpResponseMessage response = await _client.GetAsync("api/Account/GetUserRoles" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            string responseBody = await response.Content.ReadAsStringAsync();
            List<string> tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<List<string>>(responseBody);
            Assert.AreEqual(false, tweb.Contains(model.Role), String.Format("User {0} belongs to role {1}, can not test. Please remove {0} from {1} first.", model.User, model.Role));

            //Add it to the role:
            string str = String.Format("Role={0}&User={1}", Uri.EscapeUriString(model.Role), Uri.EscapeUriString(model.User));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/AddUserToRole", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            //check that belong to role:
            response = await _client.GetAsync("api/Account/GetUserRoles" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            responseBody = await response.Content.ReadAsStringAsync();
            tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<List<string>>(responseBody);
            Assert.AreEqual(true, tweb.Contains(model.Role));

            //remove from the role:
            str = String.Format("Role={0}&User={1}", Uri.EscapeUriString(model.Role), Uri.EscapeUriString(model.User));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/RemoveUserRole", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            //check that doesnt belong to role
            response = await _client.GetAsync("api/Account/GetUserRoles" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            responseBody = await response.Content.ReadAsStringAsync();
            tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<List<string>>(responseBody);
            Assert.AreEqual(false, tweb.Contains(model.Role));

            clearToken();
        }

        [TestMethod]
        [TestCategory("Claims")]
        public async Task Claims_Add_Remove_Get_from_User()
        {

            ClaimUserModel model = new ClaimUserModel()
            {
                User = "miticv@gmail.com",
                ClaimValue = "4",
                ClaimType = "int"
            };

            LoginTokenModel token = await getAdminToken();
            _client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", token.access_token));

            //Add it to the user:
            string str = String.Format("User={0}&ClaimValue={1}&ClaimType={2}", Uri.EscapeUriString(model.User), Uri.EscapeUriString(model.ClaimValue), Uri.EscapeUriString(model.ClaimType));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("api/Account/AddClaimToUser", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            //if add existing one - do not duplicate it!
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/AddClaimToUser", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            //check that claim exist for user:
            response = await _client.GetAsync("api/Account/GetUserClaims" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            string responseBody = await response.Content.ReadAsStringAsync();
            List<CustomUserClaim> tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<List<CustomUserClaim>>(responseBody);
            Assert.AreEqual(true, tweb.Where(c => c.ClaimType == model.ClaimType && c.ClaimValue == model.ClaimValue).Count() == 1);

            //remove from the user:
            str = String.Format("User={0}&ClaimValue={1}&ClaimType={2}", Uri.EscapeUriString(model.User), Uri.EscapeUriString(model.ClaimValue), Uri.EscapeUriString(model.ClaimType));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/RemoveClaimFromUser", theContent);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            //check that claim doesnt exist for user:
            response = await _client.GetAsync("api/Account/GetUserClaims" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            responseBody = await response.Content.ReadAsStringAsync();
            tweb = ServiceStack.Text.JsonSerializer.DeserializeFromString<List<CustomUserClaim>>(responseBody);
            Assert.AreEqual(true, tweb.Where(c => c.ClaimType == model.ClaimType && c.ClaimValue == model.ClaimValue).Count() == 0);

            clearToken();
        }

        [TestMethod]
        [TestCategory("Claims")]
        public async Task Claims_Add_Remove_Get_Unauthorized()
        {
            ClaimUserModel model = new ClaimUserModel()
            {
                User = "miticv@gmail.com",
                ClaimValue = "4",
                ClaimType = "int"
            };

            string str = String.Format("User={0}&ClaimValue={1}&ClaimType={2}", Uri.EscapeUriString(model.User), Uri.EscapeUriString(model.ClaimValue), Uri.EscapeUriString(model.ClaimType));
            StringContent theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            HttpResponseMessage response = await _client.PostAsync("api/Account/AddClaimToUser", theContent);
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            //check that claim exist for user:
            response = await _client.GetAsync("api/Account/GetUserClaims" + String.Format("?email={0}", Uri.EscapeUriString(model.User)));
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

            //remove from the role:
            str = String.Format("User={0}&ClaimValue={1}&ClaimType={2}", Uri.EscapeUriString(model.User), Uri.EscapeUriString(model.ClaimValue), Uri.EscapeUriString(model.ClaimType));
            theContent = new StringContent(str, System.Text.Encoding.UTF8, "application/x-www-form-urlencoded");
            response = await _client.PostAsync("api/Account/RemoveClaimFromUser", theContent);
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);

        }

    }
}
