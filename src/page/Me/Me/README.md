# 个人中心
![](http://h5.bukeyi.net/h5/2019/sxh/me.png)

## useAge

| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| icon-click | 列表每个item的点击事件 | id(选项ID) |

``` bash

props:{
  {
    qrcode:require('../../assets/home/home_thumb.png'),//二维码图片
    headImg:require('../../assets/home/home_thumb.png'),
    name:'用户名',
    company:'湖南虫洞文化传播有限公司',
    companyPosition:'总经理',
    associationPostion:'会长单位',
    liveness:'活跃',
    years:'12年',
    companyAttr:'会员单位',
    lists:[
      {
        id:1,//选项ID，点击会返回该ID
        newNum:0,//消息数
        icon:'smile-comment-o',//icon名称
        text:'我的通知',//选项名称
      },
      {
        id:2,
        newNum:1,
        icon:'coupon-o',
        text:'我的票券',
      },
      {
        id:3,
        newNum:1,
        icon:'user-circle-o',
        text:'个人信息',
      },
      {
        id:4,
        newNum:1,
        icon:'hotel-o',
        text:'公司信息',
      },
      {
        id:4,
        newNum:1,
        icon:'contact',
        text:'联系人信息',
      },
      {
        id:4,
        newNum:1,
        icon:'balance-list-o',
        text:'会费情况',
      },
      {
        id:5,
        newNum:1,
        icon:'records',
        text:'投诉建议',
      },
      {
        id:6,
        newNum:1,
        icon:'vip-card-o',
        text:'会员服务',
      },
      {
        id:7,
        newNum:1,
        icon:'friends-o',
        text:'关于我们',
      },
      {
        id:8,
        newNum:1,
        icon:'photo-o',
        text:'图库上传',
      },
      {
        id:9,
        newNum:1,
        icon:'comment-o',
        text:'智能推送',
      },
      {
        id:10,
        newNum:1,
        icon:'todo-list-o',
        text:'申请审核',
      },
    ]
  },
},

```