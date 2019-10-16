# 活动图库

![图库列表](http://h5.bukeyi.net/h5/2019/sxh/photoAlbum.png)
![新建相册](http://h5.bukeyi.net/h5/2019/sxh/photoAlbum2.png)

| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| select-click | 选择分类 | id:分类id |
| on-edit | 编辑 | id |
| on-delete | 删除 | id |
| on-search | 搜索 | value |
| on-save | 新建相册保存 | name:String(相册名称) <br> startTime:Number(开始时间秒级时间戳) |

``` bash
props:{
  lists:[
        {
          id:1,
          title:'2019新春走访企业拜年(12张)',
          time:'2019年12月10日'
        },
        {
          id:2,
          title:'2019新春走访企业拜年(12张)',
          time:'2019年12月10日'
        },
      ],
},

```

# 相册详情

![相册详情](http://h5.bukeyi.net/h5/2019/sxh/photoDetail.png)
![编辑相册](http://h5.bukeyi.net/h5/2019/sxh/photoDetail2.png)

| 事件 | 说明 | 参数 |
| ------ | ------ | ------ |
| on-delete | 删除 | id |

``` bash
props:{
  data:{
        title:'2019新春走访企业拜年',
        time:'2019年12月10日',
        num:'共25张',
        imgList:[
          {
            id:1,
            src:require('../../assets/home/home_thumb.png')
          },
          {
            id:1,
            src:require('../../assets/home/home_thumb.png')
          },
        ]
      },
},

```