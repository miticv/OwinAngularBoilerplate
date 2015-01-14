OwinAngularBoilerplate
======================

##What is this?
Startup boilerplate using lightweight [Owin](http://owin.org/), [Identity](http://www.asp.net/identity) together with [Angular](https://angularjs.org/) and [Typescript](http://typescript.codeplex.com/). 

##Best practices
* For angular it follows [angular js styleguide](https://github.com/johnpapa/angularjs-styleguide) organising modules by [features](http://www.pluralsight.com/courses/angularjs-patterns-clean-code).
* Use Service to pass state between Controllers [Passing State via Services](https://rclayton.silvrback.com/passing-state-via-services)
* Using [animate.css](http://daneden.github.io/animate.css/) for animations 
* Use translation service for multi langual support [i18](http://i18next.com/) with angular [ng-i18next](https://github.com/i18next/ng-i18next)
* Use Identity with Refresh Tokens - Read more about advanteges of using refresh tokens [here](http://bitoftech.net/2014/07/16/enable-oauth-refresh-tokens-angularjs-app-using-asp-net-web-api-2-owin/).

##Technologies
* [Owin](http://owin.org/) ([Katana](https://katanaproject.codeplex.com/) - .NET implementation of OWIN)
* [WebApi](http://www.asp.net/web-api) (.NET Web Api works great with OWIN)
* [NancyMVC](http://nancyfx.org/) (Not using .NET MVC since it heavily relies on System.Web - at least until [vnext with MVC6](http://www.asp.net/vnext/overview/aspnet-vnext/aspnet-5-overview) is produciton ready )
* [Identity](http://www.asp.net/identity) (modified to use Integer as a key instead of GUID as a key)
* [Angular](https://angularjs.org/)
* [Typescript](http://typescript.codeplex.com/) (implementing angular together with [type difinitions](https://github.com/borisyankov/DefinitelyTyped))
* [Angular UI](http://angular-ui.github.io/)
* [Bootstrap](http://getbootstrap.com/)


##To to
* Use [grunt](http://gruntjs.com/) based build [template](http://joshdmiller.github.io/ng-boilerplate/)

##Other usefull references
* For performance consider $watch vs $emit,$broadcast, $digest & $on event model [performance](http://jsperf.com/angualr-scope-watch-vs-scope-events/5)

