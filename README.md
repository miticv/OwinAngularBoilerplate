OwinAngularBoilerplate
======================


##What is this?
Startup boilerplate using lightweight [Owin](http://owin.org/), [Identity](http://www.asp.net/identity) together with [Angular](https://angularjs.org/) with [Typescript](http://typescript.codeplex.com/). 

##Best practices
* For angular it follows [angular js styleguide](https://github.com/johnpapa/angularjs-styleguide) organising modules by [features](http://www.pluralsight.com/courses/angularjs-patterns-clean-code).
* For animation is using [animate.css](http://daneden.github.io/animate.css/)
* For performance consider $watch vs $emit,$broadcast, $digest & $on event model [performance](http://jsperf.com/angualr-scope-watch-vs-scope-events/5)
* Use [grunt](http://gruntjs.com/) based build [template](http://joshdmiller.github.io/ng-boilerplate/)
* Use Service to pass state between Controllers [Passing State via Services](https://rclayton.silvrback.com/passing-state-via-services)

##Technologies
* [Owin](http://owin.org/) ([Katana](https://katanaproject.codeplex.com/) - .NET implementation of OWIN)
* [WebApi](http://www.asp.net/web-api) (.NET Web Api works great with OWIN)
* [NancyMVC](http://nancyfx.org/) (Not using .NET MVC since it heavily relies on System.Web)
* [Identity](http://www.asp.net/identity) (modified to use Integer as a key instead of GUID as a key)
* [Angular](https://angularjs.org/)
* [Typescript](http://typescript.codeplex.com/) (using best practices implementing angular with TS)
* [Angular UI](http://angular-ui.github.io/)
* [Bootstrap](http://getbootstrap.com/)



