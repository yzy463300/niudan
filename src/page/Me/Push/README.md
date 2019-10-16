# 智能推送列表

![智能推送列表](http://h5.bukeyi.net/h5/2019/sxh/push.png)

| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| btn-click | 状态报告按钮 |  |
| on-search | 搜索 | value |

``` bash
props:{
  data:[
        {
          id:1,
          content:'智能推送智能推送智能推送智能推送智能推送智能推送智能推送智能推送智能推送智能推送智能推送',
          num:'60/120',
          btnText:'状态报告'
        }
      ],
},

```

# 状态报告


| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| on-detail | 内容详情 |  |
| send-tmp | 再推模版消息 |  |
| send-note | 转短信通知 |  |

``` bash
props:{
  	titleData:{
        massNum:115,
        readNum:100,
        sender:'阿萨德',
        time:'2018-09-15 12:28:43'
    },
    lists:[
        [
          {
            headImg:require('../../assets/home/home_thumb.png'),
            name:'滴滴滴',
            company:'公司名公司名',
            tel:'18973855301',
            statusText:'未阅读'
          }
        ],
        [
          {
            headImg:require('../../assets/home/home_thumb.png'),
            name:'滴滴滴',
            company:'公司名公司名',
            tel:'18973855301',
            statusText:'已阅读'
          }
        ],
        [
          {
            headImg:require('../../assets/home/home_thumb.png'),
            name:'滴滴滴',
            company:'公司名公司名',
            tel:'18973855301',
            statusText:'未阅读'
          }
        ],
      ],
},

```