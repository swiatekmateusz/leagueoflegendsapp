(window.webpackJsonpleagueoflegendsapp=window.webpackJsonpleagueoflegendsapp||[]).push([[0],{23:function(e,n,t){e.exports=t(34)},33:function(e,n,t){},34:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(19),l=t.n(c),o=t(7),u=t(8),m=t(10),i=t(9),s=t(11),p=t(6),h=t(5),E=t(20),g=function(e){function n(){var e,t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=Object(m.a)(this,(e=Object(i.a)(n)).call.apply(e,[this].concat(r)))).state={region:"EUN1",nickname:""},t.regions=[{name:"EUNE",value:"EUN1"},{name:"EUW",value:"EUW1"}],t.handleInputs=function(e){t.setState(Object(E.a)({},e.target.name,e.target.value))},t}return Object(s.a)(n,e),Object(u.a)(n,[{key:"render",value:function(){var e=this.state,n=e.nickname,t=e.region;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mainpage"},r.a.createElement("div",{className:"bg-image"},r.a.createElement("div",{className:"content-warpper"},r.a.createElement("header",null,r.a.createElement("h1",null,"LOL.react"),r.a.createElement("h2",null,"Type your summoner name")),r.a.createElement("div",{className:"search-form"},r.a.createElement("input",{type:"text",name:"nickname",onChange:this.handleInputs,value:n}),r.a.createElement("select",{onChange:this.handleInputs,name:"region"},this.regions.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.name)})),r.a.createElement(p.b,{to:n?"/".concat(t,"/summoner/").concat(n):"",className:"button"}))))))}}]),n}(a.Component),v=function(e){function n(){var e,t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=Object(m.a)(this,(e=Object(i.a)(n)).call.apply(e,[this].concat(r)))).state={},t}return Object(s.a)(n,e),Object(u.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return console.log(this.props),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"SummonerPage"))}}]),n}(a.Component),b=function(){return r.a.createElement(h.c,null,r.a.createElement(h.a,{path:"/",exact:!0,component:g}),r.a.createElement(h.a,{path:"/:region/summoner/:nickname",component:v}))},f=(t(33),function(e){function n(){return Object(o.a)(this,n),Object(m.a)(this,Object(i.a)(n).apply(this,arguments))}return Object(s.a)(n,e),Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(b,null))}}]),n}(a.Component));l.a.render(r.a.createElement(f,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.307f344d.chunk.js.map