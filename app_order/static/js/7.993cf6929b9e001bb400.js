webpackJsonp([7],{"0THX":function(t,e){},"Mr/b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("van-nav-bar",{staticStyle:{"box-shadow":"0 3px 10px rgba(127, 127, 127, 0.06)"},attrs:{"left-arrow":"",title:"我的"},on:{"click-left":t.onClickLeft},scopedSlots:t._u([{key:"left",fn:function(){return[n("van-icon",{attrs:{name:"arrow-left",color:"#000000"}})]},proxy:!0},{key:"right",fn:function(){return[n("van-icon",{attrs:{name:"ellipsis",color:"#000000"}}),t._v(" \n      "),n("van-icon",{attrs:{name:"browsing-history-o",color:"#000000"}})]},proxy:!0}])}),t._v(" "),n("van-cell",{attrs:{title:"头像",center:""},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-image",{attrs:{width:"65",height:"50",src:t.$store.state.token.headImage}})]},proxy:!0}])}),t._v(" "),n("van-cell",{attrs:{title:"用户名",value:t.$store.state.token.userName}}),t._v(" "),n("van-cell",{attrs:{title:"手机号",value:t.$store.state.token.phone.substring(0,3)+"***"+t.$store.state.token.phone.substring(t.$store.state.token.phone.length-3,t.$store.state.token.phone.length)}}),t._v(" "),n("div",{staticClass:"app-footer"},[n("van-button",{staticClass:"foot-button",attrs:{color:"linear-gradient(to bottom, #FE9A87, #FD6B4E)",type:"info"},on:{click:t.exit}},[t._v("退出登录")])],1)],1)},staticRenderFns:[]};var r=n("VU/8")({name:"user",components:{},data:function(){return{}},computed:{},watch:{},methods:{onClickLeft:function(){this.$router.go(-1)},exit:function(){this.$store.dispatch("clearToken"),this.$router.push("/login")}},created:function(){},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){}},o,!1,function(t){n("0THX")},"data-v-c59aaa02",null);e.default=r.exports}});
//# sourceMappingURL=7.993cf6929b9e001bb400.js.map