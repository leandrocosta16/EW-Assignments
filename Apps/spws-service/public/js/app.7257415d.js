(function(t){function e(e){for(var s,i,l=e[0],o=e[1],d=e[2],u=0,p=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s]);c&&c(e);while(p.length)p.shift()();return n.push.apply(n,d||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,l=1;l<a.length;l++){var o=a[l];0!==r[o]&&(s=!1)}s&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},r={app:0},n=[];function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var c=o;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("ListCrosswalks")],1)],1)},n=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("v-app",{attrs:{id:"inspire"}},[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.hdados,items:t.crosswalks,"sort-by":"id",search:t.search,"footer-props":{"items-per-page-options":[-1,5,20,50,100]}},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[t._v("SPWS CRUD ")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,r=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",r,!1),s),[t._v("New Item")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(" "+t._s(t.formTitle)+" ")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"LATITUDE"},model:{value:t.editedItem.latitude,callback:function(e){t.$set(t.editedItem,"latitude",e)},expression:"editedItem.latitude"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"LONGITUDE"},model:{value:t.editedItem.longitude,callback:function(e){t.$set(t.editedItem,"longitude",e)},expression:"editedItem.longitude"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"PEDESTRES AGORA"},model:{value:t.editedItem.nPedestrians,callback:function(e){t.$set(t.editedItem,"nPedestrians",e)},expression:"editedItem.nPedestrians"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"CARROS AGORA"},model:{value:t.editedItem.nCars,callback:function(e){t.$set(t.editedItem,"nCars",e)},expression:"editedItem.nCars"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"PEDESTRES TOTAL"},model:{value:t.editedItem.totalPedestrians,callback:function(e){t.$set(t.editedItem,"totalPedestrians",e)},expression:"editedItem.totalPedestrians"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"CARROS TOTAL"},model:{value:t.editedItem.totalCars,callback:function(e){t.$set(t.editedItem,"totalCars",e)},expression:"editedItem.totalCars"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.save()}}},[t._v("Save")])],1)],1)],1)],1),a("v-html",[a("br"),a("br")])]},proxy:!0},{key:"item.actions",fn:function(e){var s=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(s)}}},[t._v(" mdi-pencil ")]),a("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(s)}}},[t._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("Reset")])]},proxy:!0}])})],1)],1)},l=[],o=(a("c975"),a("a434"),a("96cf"),a("1da1")),d=a("bc3a"),c=a.n(d),u=a("cdd9").host,p={name:"ListCrosswalks",data:function(){return{search:"",dialog:!1,hdados:[{text:"ID",sortable:!0,value:"id",class:"subtitle-1"},{text:"LATITUDE",sortable:!0,value:"latitude",class:"subtitle-1"},{text:"LONGITUDE",sortable:!0,value:"longitude",class:"subtitle-1"},{text:"PEDESTRES AGORA",sortable:!0,value:"nPedestrians",class:"subtitle-1"},{text:"CARROS AGORA",sortable:!0,value:"nCars",class:"subtitle-1"},{text:"PEDESTRES TOTAL",sortable:!0,value:"totalPedestrians",class:"subtitle-1"},{text:"CARROS TOTAL",sortable:!0,value:"totalCars",class:"subtitle-1"},{text:"Actions",value:"actions",sortable:!1}],crosswalks:[],editedIndex:-1,editedItem:{latitude:0,longitude:0,nPedestrians:0,nCars:0,totalPedestrians:0,totalCars:0},defaultItem:{latitude:0,longitude:0}}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog:function(t){t||this.close()}},created:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c.a.get(u+"/api/passadeiras");case 3:e=t.sent,this.crosswalks=e.data,t.next=10;break;case 7:return t.prev=7,t.t0=t["catch"](0),t.abrupt("return",t.t0);case 10:case"end":return t.stop()}}),t,this,[[0,7]])})));function e(){return t.apply(this,arguments)}return e}(),methods:{rowClicked:function(t){alert("Click no item: "+JSON.stringify(t))},test:function(t){alert(t)},fireDelete:function(t){c.a.delete("/item/"+t).then()},editItem:function(t){this.editedIndex=this.crosswalks.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){var e=this.crosswalks.indexOf(t);confirm("Are you sure you want to delete this item?")&&this.crosswalks.splice(e,1);try{c.a.delete(u+"/api/passadeiras/"+t.id)}catch(a){return a}},close:function(){var t=this;this.dialog=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},save:function(){if(this.editedIndex>-1){Object.assign(this.crosswalks[this.editedIndex],this.editedItem);try{c.a.put(u+"/api/update/"+this.editedItem.id,this.editedItem)}catch(t){return t}this.close()}else{try{c.a.post(u+"/api/new",this.editedItem)}catch(t){return t}location.reload()}}}},f=p,v=a("2877"),m=a("6544"),b=a.n(m),h=a("7496"),x=a("8336"),I=a("b0af"),g=a("99d9"),k=a("62ad"),w=a("a523"),y=a("8fea"),O=a("169a"),C=a("ce7e"),T=a("132d"),S=a("0fd9"),A=a("2fa4"),_=a("8654"),P=a("71d9"),R=a("2a7f"),E=Object(v["a"])(f,i,l,!1,null,null,null),V=E.exports;b()(E,{VApp:h["a"],VBtn:x["a"],VCard:I["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:k["a"],VContainer:w["a"],VDataTable:y["a"],VDialog:O["a"],VDivider:C["a"],VIcon:T["a"],VRow:S["a"],VSpacer:A["a"],VTextField:_["a"],VToolbar:P["a"],VToolbarTitle:R["a"]});var j={name:"App",components:{ListCrosswalks:V}},D=j,L=a("a75b"),$=Object(v["a"])(D,r,n,!1,null,null,null),G=$.exports;b()($,{VApp:h["a"],VContent:L["a"]});var N=a("f309");s["a"].use(N["a"]);var U=new N["a"]({});s["a"].config.productionTip=!1,new s["a"]({vuetify:U,render:function(t){return t(G)}}).$mount("#app")},cdd9:function(t,e){t.exports.host="http://127.0.0.1:8042"}});
//# sourceMappingURL=app.7257415d.js.map