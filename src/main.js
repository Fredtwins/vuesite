
// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

// 1.0 路由的写法
// 1.0.0 导包
import vueRouter from 'vue-router';

// 1.0.2 将vueRouter和vue绑定起来
Vue.use(vueRouter);

// 1.0.3 定义路由规则
// 导入系统的整体布局组件
import layout from './components/site/layout.vue';
// 导入商品列表组件
import goodslist from './components/site/goodslist.vue';

// 导入商品详情组件
import goodsinfo from './components/site/goodsinfo.vue';
import car from './components/site/car.vue';
import shopping from './components/site/shopping.vue';
import login from './components/site/login.vue';
import pay from './components/site/pay.vue';
import paysuccess from './components/site/paysuccess.vue';
import payamount from './components/site/payamount.vue';
import vipcenter from './components/site/vipcenter.vue';
import vipmyorderlist from './components/site/myorderlist.vue';
import orderdetial from './components/site/orderdetial.vue';

var router = new vueRouter({
    routes:[
        {name:'default',path:'/',redirect:'/site'},
        {name:'payamount',path:'/site/payamount/:orderid/:amount',component:payamount}, 
        {name:'paysuccess',path:'/site/paysuccess',component:paysuccess},
        {name:'layout',path:'/site',component:layout,
    children:[
         {name:'login',path:'login',component:login},
       {name:'goodslist',path:'goodslist',component:goodslist}, //商品列表的路由规则
       {name:'goodsinfo',path:'goodsinfo/:goodsid',component:goodsinfo},
       {name:'car',path:'car',component:car},  //购物车页面
    //    meta:{islogin:true}：表示要进行登录检查,只有登录过的才能进入到shopping组件，否则要进入到登录页面
       {name:'shopping',path:'shopping/:ids',component:shopping,meta:{islogin:true}},
       {name:'pay',path:'pay/:orderid',component:pay,meta:{islogin:true}},
       {name:'paysuccesspc',path:'paysuccesspc',component:paysuccess},
       {name:'vipcenter',path:'vip/center',component:vipcenter,meta:{islogin:true}},
       {name:'vipmyorderlist',path:'vip/myorderlist',component:vipmyorderlist,meta:{islogin:true}},
       {name:'orderdetial',path:'vip/orderdetial/:orderid',component:orderdetial,meta:{islogin:true}}
       
    ]
}
    ]
});

// 利用router 的全局守卫钩子函数进行登录验证
router.beforeEach((to,from,next)=>{
    // 1.0 在localStorage中记录当前浏览器访问的的最后一个路由规则的名称
    if(to.name !=="login"){
        localStorage.setItem('currentRouteName',to.name);
    }    

    // 2.0 判断如果to.meta上有islogin的话，则要进行登录判断
    if(to.meta.islogin){

        // 1.0 请求验证api: /site/account/islogin
        axios.get('/site/account/islogin').then(res=>{
            if(res.data.code =="logined"){
                // 登录过
                next();
            }else{
                // 未登录过则跳转到登录页面
                router.push({name:'login'});
            }
        });

    }else{
        // 表示不需要进行登录验证，直接访问即可
        next();
    }
});

// 2.0 axios的使用
// 2.0.1 导入axios包
import axios from 'axios';
// 2.0.2 设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
// axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 2.0.3 想要在将来的每个子组件中的方法中均可以使用 this.$http去调用其方法执行ajax请求
//就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;

// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

// 2.0.4 绑定到vue上
Vue.use(axios);

// 3.0 使用elementUI这个ui框架的步骤
// 3.0.1、导包
import elementUI  from 'element-ui';
// 3.0.2 导入elemeui的css控制样式
// 由于项目的样式和elementui的css样式有些不一样，那么修改了这个样式以后，要利用自己的样式替换原来的原有样式

// import 'element-ui/lib/theme-default/index.css';

// 3.0.3 绑定
Vue.use(elementUI);

// 导入整个网站布局的控制样式
import '../statics/site/css/style.css';


// 4.0 定义共有过滤器(全局过滤器)来实现日期字符串的格式化操作
Vue.filter('datefmt',(input,fmtstring)=>{
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if(fmtstring == 'YYYY-MM-DD'){
        return y + '-' + m + '-' + d;
    }
    if(fmtstring == 'YYYY-MM-DD HH:mm:ss'){
        return y + '-' + m + '-' + d + ' ' + h + ':'+ mi + ':' + s;
    }

});


// 定义vuex实现购物车数量的改变业务
// 1.0 数据对象
// 特点：当state的值一旦发生改变，那么通过 this.$store.state.buyCount 地方就会自动发生改变
var state={
    // 购物车中的购买数量
    buyCount:0
}

// 2.0 action (购物车按钮点击的时候触发action,代码： this.$store.dispatch('changeBuyCount'),购买数量)
var actions ={
    changeBuyCount({commit},parmsBuyCount){
        commit('changeBuyCount',parmsBuyCount);
    }
}

// 3.0 mutations
var mutations ={
    changeBuyCount(state,parmsBuyCount){
        state.buyCount += parmsBuyCount;
    }
}

// 由于目前不需要对state中的buyCount进行逻辑封装，所以留空
import {getItem} from './kits/localStorageKit.js'

var getters = {
    getCount(state){
        // 如果想要在 组件的使用 this.$store.getters.getCount的地方能够state.buyCount的值的改变而自动刷新，
        //就一定 要在这个方法中依赖state.buyCount，否则不会自动触发刷新
         // 判断如果state中的buyCount的值>0
            if(state.buyCount>0){
                return state.buyCount
            }
            // 读取localStorage中的数据统计商品的种类个数返回
            var goodsObj = getItem();
            var count = 0;
            for(var key in goodsObj){
                count++;
            }
            state.buyCount = count;
            return state.buyCount;
    }   
}

import vuex from 'vuex';
Vue.use(vuex);

// 4.0 实例化一个Store对象
var store = new vuex.Store({
    state,actions,mutations,getters
});


new Vue({
    el:'#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,   
    store,  //注册
    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render:create=>create(App)
});