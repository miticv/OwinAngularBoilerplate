
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

        //GET /api/translate/dev/
        [Route("dev")]
        public JToken GetDev()
        {
            JToken json = JObject.Parse(
                @"{
                  'word': 'wordy',
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

        //GET /api/translate/en/
        [Route("en")]
        public JToken GetEn()
        {
            JToken json = JObject.Parse(
                @"{
                  'word': 'wordy',
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

        //GET /api/translate/en-us/
        [Route("en-us")]
        public JToken GetEnUs()
        {
            JToken json = JObject.Parse(
                @"{
                  'word': 'wordy',
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