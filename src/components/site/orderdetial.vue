<template>
    <div class="tmpl">
        <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="tmpl routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="#/site/member/center" class="">会员中心</a>&gt;
                                    <a href="#/site/member/orderlist" class="">我的订单</a>
                                </div>
                            </div>
                            <div class="section clearfix">
                                <div class="left-260">
                                    <div class="bg-wrap">
                                        <div class="avatar-box">
                                            <a href="/user/center/avatar.html" class="img-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </a>
                                            <h3>

                                                ivanyb

                                            </h3>
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </div>
                                        <div class="center-nav">
                                            <ul>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-order"></i>
                                                        <span>订单管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/orderlist" class="">
                                                                <i class="iconfont icon-arrow-right"></i>交易订单</a>
                                                        </p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-user"></i>
                                                        <span>账户管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                        </p>
                                                        <p>
                                                            <a href="javascript:void(0)">
                                                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-auto">
                                    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <a href="javascript:void(0)" class="add">
                                                <i class="iconfont icon-reply"></i>返回</a>
                                            <ul>
                                                <li class="selected">
                                                    <a href="javascript:;">查看订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="order-progress">
                                            <ul>
                                                <li v-bind="{class:'first '+ (orderD.orderinfo.status >=1?'active':'')}">
                                                    <div class="progress">下单</div>
                                                    <div class="info">{{orderD.orderinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
                                                </li>
                                                <li  v-bind="{class:(orderD.orderinfo.status >=2?'active':'')}">
                                                    <div class="progress">已付款</div>
                                                    <div class="info">{{orderD.orderinfo.confirm_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
                                                </li>
                                                <li v-bind="{class:(orderD.orderinfo.status >=3?'active':'')}">
                                                    <div class="progress">已经发货</div>
                                                    <div class="info">{{orderD.orderinfo.express_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
                                                </li>
                                                <li v-bind="{class:'last '+(orderD.orderinfo.status >=4?'active':'')}">
                                                    <div class="progress">已完成</div>
                                                    <div class="info">{{orderD.orderinfo.complete_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="form-box accept-box form-box1">
                                            <dl class="head form-group">
                                                <dd>
                                                    订单号：{{orderD.orderinfo.order_no}}
                                                
                                                    <router-link class="btn-pay" v-if="orderD.orderinfo.status<=1" v-bind="{to:'/site/pay/'+orderD.orderinfo.id}">去付款</router-link>
                                                    <a  class="btn-pay" v-if="orderD.orderinfo.status==3" @click="complate(orderD.orderinfo.id)">待签收</a>
                                                    
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>订单状态：</dt>
                                                <dd>
                                                    {{orderD.orderinfo.statusName}}
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>快递单号：</dt>
                                                <dd>
                                                        {{orderD.orderinfo.express_no}}
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>在线支付</dd>
                                            </dl>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th align="left" colspan="2">商品信息</th>                                                      
                                                        <th width="10%">单价
                                                        </th>
                                                        <th width="10%">数量</th>
                                                        <th width="10%">金额</th>
                                                    </tr>
                                                    <tr v-for="item in orderD.goodslist" :key="item.id">
                                                        <td width="60">
                                                            <img :src="item.imgurl" class="img">
                                                        </td>
                                                        <td align="left">
                                                            <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
                                                        </td>
                                                        <td align="center">
                                                            <s>￥{{item.goods_price}}</s>
                                                            <p>￥{{item.real_price}}</p>
                                                        </td>
                                                        <td align="center">{{item.quantity}}</td>
                                                        <td align="center">￥{{item.real_price * item.quantity}}</td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="form-box accept-box">
                                            <dl class="head form-group">
                                                <dd>收货信息</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>顾客姓名：</dt>
                                                <dd v-text="orderD.orderinfo.accept_name"></dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd>{{orderD.orderinfo.area}} {{orderD.orderinfo.address}} </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>联系电话：</dt>
                                                <dd v-text="orderD.orderinfo.mobile"> </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>电子邮箱：</dt>
                                                <dd v-text="orderD.orderinfo.email"> </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>备注留言：</dt>
                                                <dd v-text="orderD.orderinfo.message"></dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderid:this.$route.params.orderid,
                orderD:{}
            }
        },
        created(){
            this.getorderDetial();
        },
        methods: {
            complate(orderid){
                this.$http.get('/site/validate/order/complate/'+orderid)
                .then(res=>{
                    this.getorderDetial();
                });
            },
            getorderDetial(){
                this.$http.get('/site/validate/order/getorderdetial/'+this.orderid)
                .then(res=>{
                    this.orderD = res.data.message;
                });
            }
        }
    }
</script>
<style scoped>
</style>