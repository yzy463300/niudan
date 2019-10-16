# 我的票券

![](http://h5.bukeyi.net/h5/2019/sxh/ticket.png)

| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| check-ticket | 点击查看电子票按钮 | id |

``` bash
props:{
	data:{
        current:15,//本年参与次数
        total:30,//总共参与次数
        currentDesc:'超越99%的会员',
        totalDesc:'超越9%的会员',
        lists:[
          {
            id:1,
            imgUrl:require('../../assets/home/home_thumb.png'),
            title:'2018企业申报政策项目年度总结系列培训（第六期）',
            time:'时间：2019-01-03  10:00开始',
            address:'地址：长沙市天心区书院南路乾程大厦',
            statusText:'待参与',
            price:'¥0',
            btnText:'查看电子票',
          },
          {
            id:1,
            imgUrl:require('../../assets/home/home_thumb.png'),
            title:'2018企业申报政策项目年度总结系列培训（第六期）',
            time:'时间：2019-01-03  10:00开始',
            address:'地址：长沙市天心区书院南路乾程大厦',
            statusText:'待参与',
            price:'¥0',
            btnText:'查看电子票'
          },
        ]
      }

},

```
# 查看票券

| 示例图 | 标题 | 
| ------ | ------ | 
| ![](http://h5.bukeyi.net/h5/2019/sxh/hexiao.png) | 卡券核销 status:1 | 
| ![](http://h5.bukeyi.net/h5/2019/sxh/guoqi.png) | 已过期 status:2| 
| ![](http://h5.bukeyi.net/h5/2019/sxh/yitongguo.png) | 已通过 status:3| 

| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| title-click | 点击标题栏 |  |
| sponsor-click | 点击赞助商栏 |  |

``` bash
props:{
	data:{
        price:'50元',
        name:'稍等阿斯',
        tel:'18973855301',
        qrcode:require('../../assets/home/home_thumb.png'),
        title:'2018企业申报政策项目年度总结系列培训 (第六期)',
        time:'2018-05-18 16:00',
        address:'长沙市天心区书院南路天心电子世界108号',
        sponsor:'长沙电子商务协会',
        status:1 //1:未核销 2:已过期 3:已通过 
      }
},
```
