<template>
  <div class="tmpl">
    <!--面包屑  -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
      </div>
    </div>

    <!--左侧栏,轮播图,top顶栏  -->


    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <!--类别菜单-->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <!--此处声明下面可重复循环-->

                <li v-for="(item,index) in ginfo.catelist" :key="index">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="subitem in item.subcates">{{subitem.title}} &nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <!--如有三级分类，此处可循环-->
                    <dl>
                      <!--一级分类  -->
                      <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                      <dd>
                        <!--二级分类  -->
                        <a v-for="subitem in item.subcates" href="/goods/43.html">{{subitem.title}}</a>

                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--/类别菜单-->

          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div id="focus-box" class="focus-box">
                <ul class="slides">
                  <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                    <a href="/goods.html">
                                    <img src="/templates/main/images/focus_1.png" draggable="false">
                                </a>
                  </li>
                  <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                    <a href="/goods.html">
                                    <img src="/templates/main/images/focus_2.png" draggable="false">
                                </a>
                  </li>
                </ul>
                <!--轮播图  -->
                <ol class="flex-control-nav flex-control-paging">
                  <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="item in ginfo.sliderlist" :key="id">
                      <img height="343" :src="item.img_url" alt="">
                      <h3>{{ item.title }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </ol>
              </div>

            </div>
          </div>
          <!--/幻灯片-->

          <!--推荐商品-->
          <div class="left-220">
            <ul class="side-img-list">

              <li v-for="(item,index) in ginfo.toplist" :key="index">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | datefmt('YYYY-MM-DD')}}</span>
                </div>
              </li>
            </ul>
          </div>
          <!--/推荐商品-->
        </div>
      </div>
    </div>


    <!--下半部分  -->



    <div class="section">

      <!--子类-->
      <div class="main-tit">
        <h2>手机数码</h2>
        <p>

          <a href="/goods/43.html">手机通讯</a>

          <a href="/goods/44.html">摄影摄像</a>

          <a href="/goods/45.html">存储设备</a>

          <a href="/goods/40.html">更多
<i>+</i>
</a>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">

            <li>
              <a href="/goods/show-91.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200214471783.jpg">
                </div>
                <div class="info">
                  <h3>尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h3>
                  <p class="price">
                    <b>¥3180.00</b>元</p>
                  <p>
                    <strong>库存 10</strong>
                    <span>市场价：
<s>3150.00</s>
</span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-90.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200154277661.jpg">
                </div>
                <div class="info">
                  <h3>佳能（Canon） EOS 700D 单反套机</h3>
                  <p class="price">
                    <b>¥4799.00</b>元</p>
                  <p>
                    <strong>库存 98</strong>
                    <span>市场价：
<s>5099.00</s>
</span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-89.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200119256512.jpg">
                </div>
                <div class="info">
                  <h3>小米（Mi）小米Note 16G双网通版</h3>
                  <p class="price">
                    <b>¥2299.00</b>元</p>
                  <p>
                    <strong>库存 58</strong>
                    <span>市场价：
<s>2699.00</s>
</span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-88.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200059017695.jpg">
                </div>
                <div class="info">
                  <h3>苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</h3>
                  <p class="price">
                    <b>¥5780.00</b>元</p>
                  <p>
                    <strong>库存 198</strong>
                    <span>市场价：
<s>6388.00</s>
</span>
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a href="/goods/show-87.html">
                <div class="img-box">
                  <img src="/upload/201504/20/thumb_201504200046589514.jpg">
                </div>
                <div class="info">
                  <h3>华为（HUAWEI）荣耀6Plus 16G双4G版</h3>
                  <p class="price">
                    <b>¥2195.00</b>元</p>
                  <p>
                    <strong>库存 60</strong>
                    <span>市场价：
<s>2499.00</s>
</span>
                  </p>
                </div>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 定义一个对象 ginfo 用来存储接口：/site/goods/gettopdata/goods返回的message对象
        ginfo: {},
        clist: []  // 用来存储接口site/goods/getgoodsgroup 中返回的messsage数据
      }
    },
    created() {
      this.getginfo();
    },
    methods: {
      getginfo() {
        this.$http.get('/site/goods/gettopdata/goods').then(res => {

          this.ginfo = res.data.message;

        });
      },
      getclist() {
        this.$http.get('/site/goods/getgoodsgroup').then(res => {
          this.clist = res.data.message;
        })
      }
    }
  }

</script>
<style scoped>

</style>