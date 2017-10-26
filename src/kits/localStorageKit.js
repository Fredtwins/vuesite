// localStorage中的key
const key = 'buyGoodsCount';

// 1.0 存储方法
// goodsinfo:{gid:88,bcount:1}
export function setItem(goodsinfo){
    // 1.0 判断localStorage中是否有这个商品的记录了，
    // 如果有则更新购买数量，否则追加
    /*
       {
        88:1,
        89:2
       }
    */ 
    var goodsObj = getItem();
    // 2.0 判断goodsinfo.gid 是否在goodsObj存在
    if(goodsObj[goodsinfo.gid]){
        // 2.0.1 有值,将goodsinfo.bcount追加到goodsObj中当前商品的购买数量中去
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;       
    }else{
        // 2.0.2 没有值
        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }

    // 将修改以后的goodsObj的值设置回localStorage中
    localStorage.setItem(key,JSON.stringify(goodsObj));
}


// 2.0 获取方法
export function getItem(){
  var gStr =  localStorage.getItem(key);
    //   将字符串转换成js对象
    var obj = JSON.parse(gStr);

    // 判断如果obj为null的话返回一个{}
    if(!obj){
        // 向localStorage中写一个空对象
        localStorage.setItem(key,JSON.stringify('{}'));
        return {};
    }

    return obj;
}

// 3.0 删除方法
export function remoteItem(goodsid){
// 1.0 获取值
var goodsObj = getItem();

// 2.0 删除goodsObj中的值
delete goodsObj[goodsid];

// 3.0 设置回localStroage
localStorage.setItem(key,JSON.stringify(goodsObj));

}