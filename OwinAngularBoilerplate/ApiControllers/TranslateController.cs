
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace OwinAngularBoilerplate.ApiControllers
{
    using Newtonsoft.Json.Linq;
    using OwinAngularBoilerplate.Models;
    using System.Web.Http;

    [RoutePrefix("api/Translate")]
    public class TranslateController : ApiController    
    {
        //en-US => en
        //sr-Cyrl-RS => sr-Cyrl
        //sr-Latn-RS => sr-Latn
        //zh-CN => zh
        //it-IT => it

        //GET /api/translate/en/
        [Route("en")]
        public JToken GetEn()
        {
            JToken json = JObject.Parse(
                @"{
                    
                'menu': {
                    'language': 'language',
                    'english': 'English',
                    'serbian': 'Serbian',
                    'serbiancyrilic': 'Serbian Cyrilic',
                    'italian': 'Italian',
                    'chinese': 'Chinese',
                    'login':'login', 
                    'register':'register',
                    'test':'test', 
                    'invalidpage': 'invalid page',
                    'logout':'logout',
                    'logedinpage':'my page'
                  },  
                 
                  'title_login':'Login',
                  'title_register':'Register',
                  'inp_email': 'Email address',
                  'inp_password': 'Password',
                  'inp_passwordconfirm': 'Confirm Password',
                  'btn_login':'Login', 
                  'btn_register':'Register', 

                  'applicationname': 'Boilerplate',
                  'loggedin': 'Logged in!',
                  'registered':'Registered!',
                  'wrongcredentals':'Wrong credentials!',
                  'cannotregister':'Cannot register!',
                  'noaccess':'No Access',
                  'loaded':'loaded',
                  'pleasewait':'Please Wait',                  
                  'sessionrefreshed': 'session refreshed',
                  'refreshtokenexpired': 'refresh token expired'
                }"
            );
            return json;
        }

        //GET /api/translate/sr-Cyrl/
        [Route("sr-Cyrl")]
        public JToken GetSrCyrl()
        {
            JToken json = JObject.Parse(
                @"{
                'menu': {
                    'language': 'језик',
                    'english': 'Енглески',
                    'serbian': 'Српски',
                    'serbiancyrilic': 'Српски Ћирилица',
                    'italian': 'Италиански',
                    'chinese': 'Кинески',
                    'login':'логин', 
                    'register':'регистрација',
                    'test':'тест', 
                    'invalidpage': 'непостојећа страна',
                    'logout':'излогуј се',
                    'logedinpage':'моја страна'
                  }, 

                  'title_login':'Улогуј се',
                  'title_register':'Регистрација',
                  'inp_email': 'Емаил адреса',
                  'inp_password': 'Лозинка',
                  'inp_passwordconfirm': 'Потврди Лозинку',
                  'btn_login':'Улогуј се', 
                  'btn_register':'Региструј се', 


                  'applicationname': 'Темплејт',
                  'loggedin': 'Улогован!',
                  'registered':'Регистрован!',
                  'wrongcredentals':'Нетачна креденција!',
                  'cannotregister':'Регистрација неуспешна!',
                  'noaccess':'Немате приступ',
                  'loaded':'учитан',
                  'pleasewait':'Молимо чекајте',
                  'sessionrefreshed': 'сесија је освежена',
                  'refreshtokenexpired': 'токен је истеко'
                }"
            );
            return json;
        }

        //GET /api/translate/sr-Latn/
        [Route("sr-Latn")]
        public JToken GetSrLatin()
        {
            JToken json = JObject.Parse(
                @"{

                'menu': {
                    'language': 'jezik',
                    'english': 'Engleski',
                    'serbian': 'Srpski',
                    'serbiancyrilic': 'Srpski Ćirilica',
                    'italian': 'Italianski',
                    'chinese': 'Kineski',
                    'login':'logovanje', 
                    'register':'registracija',
                    'test':'test', 
                    'invalidpage': 'nepostojeća strana',
                    'logout':'izloguj se',
                    'logedinpage':'moja strana'
                  }, 


                  'title_login':'Uloguj se',
                  'title_register':'Registracija ',
                  'inp_email': 'Email adresa',
                  'inp_password': 'Lozinka',
                  'inp_passwordconfirm': 'Potvrdi Lozinku',
                  'btn_login':'Uloguj se', 
                  'btn_register':'Registruj se', 

                  'applicationname': 'Templejt',
                  'loggedin': 'Ulogovan!',
                  'registered':'Registrovan!',
                  'wrongcredentals':'Netačna kredencija!',
                  'cannotregister':'Registracija neuspešna!',
                  'noaccess':'Nemate pristup',
                  'loaded':'učitan',
                  'pleasewait':'Molimo sačekajte',
                  'sessionrefreshed': 'sesija je osvezena',
                  'refreshtokenexpired': 'token je istekao'
                }"
            );
            return json;
        }

        //GET /api/translate/zh/
        [Route("zh")]
        public JToken GetZh()
        {
            JToken json = JObject.Parse(
                @"{

                'menu': {
                    'language': '语言',
                    'english': '英语',
                    'serbian': '塞尔维亚- 拉丁',
                    'serbiancyrilic': '塞尔维亚语',
                    'italian': '意大利语',
                    'chinese': '中文',
                    'login':'登录', 
                    'register':'注册',
                    'test':'测试', 
                    'invalidpage': '无效页面',
                    'logout':'注销',
                    'logedinpage':'我的网页'
                  }, 

                  'title_login':'登录进您的账号',
                  'title_register':'注册新帐号',
                  'inp_email': '电子邮箱',
                  'inp_password': '密码',
                  'inp_passwordconfirm': '重输密码',
                  'btn_login':'登录', 
                  'btn_register':'注册', 

                  

                  'applicationname': '模板',
                  'loggedin': '登录!',
                  'registered':'注册!',
                  'wrongcredentals':'错误的凭据!',
                  'cannotregister':'甘特寄存器!',
                  'noaccess':'没有访问',
                  'loaded':'加载',
                  'pleasewait':'请稍候',                                    
                  'sessionrefreshed': '会话刷新',
                  'refreshtokenexpired': '刷新令牌过期'
                }"
            );
            return json;
        }

        //GET /api/translate/it/
        [Route("it")]
        public JToken GetIt()
        {
            JToken json = JObject.Parse(
                @"{

                'menu': {
                    'language': 'Lingua',
                    'english': 'Inglese',
                    'serbian': 'Serbo Latino',
                    'serbiancyrilic': 'Serbo',
                    'italian': 'Italiano',
                    'chinese': 'Cinese',
                    'login':'Logare', 
                    'register':'Registrati',
                    'test':'test', 
                    'invalidpage': 'pagina non valida',
                    'logout':'disconnettersi',
                    'logedinpage':'mia pagina'
                  }, 

                  'title_login':'Accedi al tuo account',
                  'title_register':'Registra un nuovo account',
                  'inp_email': 'E-mail',
                  'inp_password': 'Parola d\'ordine',
                  'inp_passwordconfirm': 'Ripeti la password',
                  'btn_login':'Logare', 
                  'btn_register':'Registro', 

                  'applicationname': 'sagoma',
                  'loggedin': 'Connesso!',
                  'registered':'registrato!',
                  'wrongcredentals':'Credenziali errate!',
                  'cannotregister':'Impossibile registrare!',
                  'noaccess':'nessun accesso',
                  'loaded':'caricato',
                  'pleasewait':'attendere prego',
 
                  'sessionrefreshed': 'sessione aggiornato',
                  'refreshtokenexpired': 'aggiornare gettone scaduto'
                }"
            );
            return json;
        }

        //GET /api/translate/dev/
        [Route("dev")]
        public JToken GetDev()
        {
            JToken json = JObject.Parse(
                @"{
                  
                }"
            );
            return json;
        }

        //GET /api/translate/en-us/
        [Route("en-us")]
        public JToken GetEnUs()
        {
            JToken json = JObject.Parse(
                @"{

                }"
            );
            return json;
        }

        //GET /api/translate/zh-cn/
        [Route("zh-cn")]
        public JToken GetZhCn()
        {
            JToken json = JObject.Parse(
                @"{

                }"
            );
            return json;
        }

        //GET /api/translate/it-it/
        [Route("it-it")]
        public JToken GetItIt()
        {
            JToken json = JObject.Parse(
                @"{

                }"
            );
            return json;
        }

        //GET /api/translate/sr/
        [Route("sr")]
        public JToken GetSr()
        {
            JToken json = JObject.Parse(
                @"{

                }"
            );
            return json;
        }

        //GET /api/translate/en-ca/
        [Route("en-ca")]
        public JToken GetEnCa()
        {
            JToken json = JObject.Parse(
                @"{
                  'word': 'wordyCA',
                  'word_plural': '__count__ words',

                  'numbers': {
                    'one': 'one',
                    'two': 'two',
                    'three': 'three'
                  },

                  'html': {
                    'strong': 'Some <strong>bolded</strong> text.',
                    'param': 'Your score: <strong>__score__</strong>',
                    'characters': 'Symbols &amp; &#8220;Quotes&#8221;'
                  }
                }"
            );
            return json;
        }
    }
}