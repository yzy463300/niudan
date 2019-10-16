import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/Index'
import home from '@/page/home/home'
import Contacts from '@/page/Contacts/Contacts'
import ContactsDetail from '@/page/ContactsDetail/ContactsDetail'

import Apply from '@/page/Apply/index'
import ActionApply from '@/page/Apply/ActionApply/ActionApply'
import ApplyContact from '@/page/Apply/Contact/Contact'
import ApplyList from '@/page/Apply/ApplyList/ApplyList'
import Apply_list from '@/page/Apply/List/List'
import OrderDetail from '@/page/Apply/OrderDetail/OrderDetail'
import applySuccess from '@/page/Apply/Success/Success'

import meHome from '@/page/Me/index'
import Me from '@/page/Me/Me/me'
import CheckApplicant from '@/page/Me/Check/CheckApplicant'
import CheckDetail from '@/page/Me/Check/CheckDetail'
import CheckReject from '@/page/Me/Check/CheckReject'
import Complain from '@/page/Me/Complain/Complain'
import MeContacts from '@/page/Me/Contacts/Contacts'
import DuesDetail from '@/page/Me/DuesDetail/DuesDetail'
import SendInform from '@/page/Me/Inform/SendInform'
import Inform from '@/page/Me/Inform/Inform'
import InformDetail from '@/page/Me/inform/InformDetail'
import CheckTicket from '@/page/Me/Myticket/CheckTicket'
import Myticket from '@/page/Me/Myticket/Myticket'
import photoAlbum from '@/page/Me/photoAlbum/photoAlbum'
import photoDetail from '@/page/Me/photoAlbum/photoDetail'
import ChoseUser from '@/page/Me/Push/ChoseUser'
import Push from '@/page/Me/Push/Push'
import StatusReport from '@/page/Me/Push/StatusReport'
import UserInfo from '@/page/Me/UserInfo/UserInfo'
import meVip from '@/page/Me/Vip/Vip'
import more from '@/page/about/more'


import Vip from '@/page/Vip/index'
import VipDetail from '@/page/Vip/VipDetail/VipDetail'
import VipList from '@/page/Vip/VipList/VipList'

import Initiation from '@/page/Initiation/index'
import About from '@/page/About/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/more',
      component: more
    },
    {
      path: '/initiation',
      component: Initiation
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/contacts',
      component: Contacts
    },
    {
      path: '/contactsDetail',
      component: ContactsDetail
    },
    {
      path: '/about',
      component: About
    },
    {
      path:'/checkApplicant',
      component:CheckApplicant
    },
    {
      path:'/checkDetail',
      component:CheckDetail
    },
    {
      path:'/checkReject',
      component:CheckReject
    },
    {
      path:'/complain',
      component:Complain
    },
    {
      path:'/Mecontacts',
      component:MeContacts
    },
    {
      path:'/duesDetail',
      component:DuesDetail
    },
    {
      path:'/SendInform',
      component:SendInform
    },
    {
      path:'/inform',
      component:Inform
    },
    {
      path:'/informDetail',
      component:InformDetail
    },
    {
      path:'/meCenter',
      component:Me
    },
    {
      path:'/me',
      component:meHome
    },
    {
      path:'/checkTicket',
      component:CheckTicket
    },
    {
      path:'/myTicket',
      component:Myticket
    },
    {
      path:'/photoAlbum',
      component:photoAlbum
    },
    {
      path:'/photoDetail',
      component:photoDetail
    },
    {
      path:'/choseUser',
      component:ChoseUser
    },
    {
      path:'/push',
      component:Push
    },
    {
      path:'/statusReport',
      component:StatusReport
    },
    {
      path:'/userinfo',
      component:UserInfo
    },
    {
      path:'/vip',
      component:meVip
    },
    {
      path:'/contact',
      component:ApplyContact
    },
    {
      path:'/applyList',
      component:ApplyList
    },
    {
      path:'/list',
      component:Apply_list
    },
    {
      path:'/orderDetail',
      component:OrderDetail
    },
    {
      path:'/success',
      component:applySuccess
    },
    {
      path:'/apply',
      component:Apply
    },
    {
      path:'/action',
      component:ActionApply
    },
    {
      path:'/vipDetail',
      component:VipDetail
    },
    {
      path:'/vipList',
      component:VipList
    },
    {
      path:'/vip',
      component:Vip
    },
  ],
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
  	    return savedPosition
  	  } else {
  		if (from.meta.keepAlive) {
  			from.meta.savedPosition = document.body.scrollTop;
  		}
  	    return { x: 0, y: to.meta.savedPosition || 0 }
  	}
  }
})