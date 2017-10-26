<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                       {{values}}
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <!-- <el-switch on-text="反选" off-text="全选" v-model="isselectall"
                                        @change="allunall">
                                        </el-switch> -->

                                        <el-button type="success" @click="allunall">{{selecttxt}}</el-button>
                                    </th>
                                    <th align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">总额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr>
                                    <!-- 当list没有数据的时候显示 -->
                                    <td v-if="list.length<=0" colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item,index) in list" :key="item.id">
                                    <!-- 真正的商品数据 -->
                                    <td width="48">
                                    <!-- elementUI e-switch实现 -->
                                    <el-switch on-text="反选" off-text="全选" v-model="values[index]"
                                    @change="itemchange">
                                    </el-switch>                                    
                                    </td>
                                        <td>
                                            <img height="50" width="50" :src="item.img_url" alt="">
                                            <span v-text="item.title"></span>
                                        </td>
                                        <td width="84">{{item.sell_price}}</td>
                                        <td width="104">
                                            <myinput @update="update" :options="{gid:item.id,count:item.buycount}"></myinput>
                                        </td>
                                        <td width="104">{{item.sell_price * item.buycount }}</td>
                                        <td width="54">
                                            <el-button type="success" size="mini" @click="deldata(item.id)">删除</el-button>
                                        </td>

                                </tr>       
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selletmentAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入帮助类
import {getItem,remoteItem} from '../../kits/localStorageKit.js'

// 导入组件
import myinput from '../subcom/myinputNumber.vue'

    export default {
        components:{
            myinput
        },
        data() {
            return {
                selecttxt:'全选',
                selectCount:0,
                // 默认是未选中
                isselectall:false,
                // 这个数组中的下标的值绑定到表格中的每一行的el-switch
                values:[],
                // 存储商品列表
                list:[]
            }
        },
        created(){
            this.getgoodslist();
        },
        computed:{
            // 计算当前用户选择的商品总数量
            selletmentAmount(){
                var trueArr = this.values.filter(function(item){return item;});
                // 如果values中的值发生改变不能触发的话，就通过push和pop来改变一下数组的长度，但是不影响到数据中的原来值
                // 栈：先进后出
                // this.values.push(false);
                // this.values.pop();
                this.selectCount = trueArr.length;

                var totalAmount = 0;
                // 统计当前选中的商品的总价格
                this.values.forEach((item,index)=>{
                    // 如果item为true的时候，这个index就是我需要统计的数据
                    if(item){
                     var goodsInfo =  this.list[index];
                         totalAmount+= (goodsInfo.sell_price * goodsInfo.buycount);
                    }
                });

                return totalAmount;
            }
        },
        methods: {
            // 删除商品数据
            deldata(goodsid){
                // 1.0 删除this.list中这个商品数据
                var index = -1;
                index = this.list.findIndex(function(item){return item.id==goodsid});

                this.list.splice(index,1);

                // 2.0 删除 this.values中的这个商品对应的索引下面的数据
                this.values.splice(index,1);

                // 3.0 删除localStorage中的这个商品数据
                remoteItem(goodsid);
            },
            // 当myinputNumber.vue中触发的事件以后就会自动触发update方法的执行，同时将obj传入
            // obj的格式：{gid:商品的id,count:修改以后的值}
            update(obj){
                console.log('-->update');
                // 修改this.list中当前的obj.gid这个商品的 buycount为obj.count
                this.list.forEach(item=>{
                    if(item.id == obj.gid){
                        item.buycount = obj.count;
                    }
                });

                // 由于通过js代码修改的计算属性selletmentAmount方法中依赖的list中的某个属性的值是不会触发计算属性方法的重新执行的
                this.list.push('');
                this.list.pop();
            },
            allunall(){               
                 this.isselectall = !this.isselectall;
         
                if(this.isselectall){
                    this.selecttxt = '反选';
                }else{
                    this.selecttxt = '全选';
                }
                // 遍历values将所有的值用this.isselectall赋值即可
               for(var i=0 ; i < this.values.length;i++){
                 this.values[i] = this.isselectall;
               }

            //在改变数组中的值的时候要改变数组的长度才能触发计算属性的执行
               this.values.push(false);
               this.values.pop();
            },
            itemchange(isselected){
                if(!isselected){
                    // 全选操作
                    this.isselectall = false;                   

                    // 改文字
                    this.selecttxt = '全选';
                }
            },
            // 获取购物车中的商品详细列表数据
            getgoodslist(){
                // 1.0 从localStorage中获取到商品id
                // goodsObj:{"88":1}
                var goodsObj = getItem();

                // 遍历goodsObj中的所有键变成一个字符串用逗号分隔
                var idArr =[];
                for(var key in goodsObj){
                    idArr.push(key);
                }

                var ids = idArr.join(',');

                this.$http.get('/site/comment/getshopcargoods/'+ids)
                .then(res=>{
                    // 1.0 将数据赋值
                    this.list = res.data.message;
                    console.log(res);

                    // 2.0 根据返回的数组个数初始化values数组的个数，值全部是false
                    // 获取localStorage中的购物车数据对象
                    var goodsObj = getItem();
                    this.list.forEach((item,index)=>{
                        this.values.push(false);


                        // 3.0 将当前商品的数量赋值给 接口中返回的buycount属性
                        item.buycount = goodsObj[item.id];
                    });

                });
            }
        }
    }
</script>
<style scoped>
</style>