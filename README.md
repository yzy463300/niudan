## 目录结构描述
```
├─App.vue
├─main.js
├─utils
|   ├─area.js
|   ├─jquery-2.1.1.min.js
|   ├─preload.js
|   ├─velocity.min.js
|   └weixin.js
├─style
|   └common.less
├─store
|   ├─action.js
|   ├─index.js
|   └mutations.js
├─router
|   └index.js
├─page
|  ├─Index.vue
|  ├─README.md
|  ├─tmp.vue
|  ├─Vip
|  |  ├─index.vue
|  |  ├─VipList
|  |  |    ├─README.md
|  |  |    └VipList.vue
|  |  ├─VipDetail
|  |  |     ├─README.md
|  |  |     └VipDetail.vue
|  ├─Me
|  | ├─index.vue
|  | ├─README.md
|  | ├─Vip
|  | |  ├─README.md
|  | |  └Vip.vue
|  | ├─UserInfo
|  | |    ├─README.md
|  | |    └UserInfo.vue
|  | ├─Push
|  | |  ├─ChoseUser.vue
|  | |  ├─Push.vue
|  | |  ├─README.md
|  | |  └StatusReport.vue
|  | ├─photoAlbum
|  | |     ├─photoAlbum.vue
|  | |     ├─photoDetail.vue
|  | |     └README.md
|  | ├─Myticket
|  | |    ├─CheckTicket.vue
|  | |    ├─Myticket.vue
|  | |    └README.md
|  | ├─Me
|  | | ├─Me.vue
|  | | └README.md
|  | ├─Inform
|  | |   ├─Inform.vue
|  | |   ├─InformDetail.vue
|  | |   └README.md
|  | ├─DuesDetail
|  | |     ├─DuesDetail.vue
|  | |     └README.md
|  | ├─Contacts
|  | |    ├─Contacts.vue
|  | |    └README.md
|  | ├─Complain
|  | |    ├─Complain.vue
|  | |    └README.md
|  | ├─Check
|  | |   ├─CheckApplicant.vue
|  | |   ├─CheckDetail.vue
|  | |   ├─CheckReject.vue
|  | |   └README.md
|  ├─home
|  |  ├─home.vue
|  |  └README.md
|  ├─ContactsDetail
|  |       ├─ContactsDetail.vue
|  |       └README.md
|  ├─Contacts
|  |    ├─Contacts.vue
|  |    └README.md
|  ├─Apply
|  |   ├─ActionPay.vue
|  |   ├─index.vue
|  |   ├─Success
|  |   |    ├─README.md
|  |   |    └Success.vue
|  |   ├─OrderDetail
|  |   |      ├─OrderDetail.vue
|  |   |      └README.md
|  |   ├─List
|  |   |  ├─List.vue
|  |   |  └README.md
|  |   ├─Contact
|  |   |    ├─Contact.vue
|  |   |    └README.md
|  |   ├─ApplyList
|  |   |     ├─ApplyList.vue
|  |   |     └README.md
|  |   ├─ActionApply
|  |   |      ├─ActionApply.vue
|  |   |      └README.md
├─config
|   └index.js
├─components
|     ├─Ytextarea.vue
|     ├─Tabbar
|     |   ├─README.md
|     |   └Tabbar.vue
|     ├─List
|     |  └List.vue
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```