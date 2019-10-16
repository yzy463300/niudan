import Vue from 'vue'
import axios from 'axios'
import {AlertPlugin,LoadingPlugin,ToastPlugin,ConfirmPlugin } from 'vux'
import config from '../config/index.js'

const ajax = axios.create({
  baseURL:config.baseUrl,
  withCredentials: true,
})
// 检查是否已经登录 *
export const checkGhLogin = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/auth/checkGhLogin`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		return res.data
	})
}

//  获取jssdk签名*
export const getWeixinJsSign = params =>{
	return ajax.post(`api/index/getWeixinJsSign`,params).then(res=>{
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'签名获取失败,请重试'
			})
			return false
		}
	})
}

//  获取首页轮播图*
export const getFocusList = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/content/getFocusList`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取通知公告*
export const getNoticeList = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/content/getNoticeList`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会动态*
export const getNewsList = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/content/getNewsList`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 入会申请提交*
export const joinRequestSubmit = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/joinRequestSubmit`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  获取通讯录数据*
export const contactList = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/member/contactList`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取文章详情*
export const getArticleDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/content/getArticleDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取注册条款内容*
export const getJoinRule = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getJoinRule`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会基本信息*
export const getAssocInfo = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getAssocInfo`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会简介内容*
export const getAssocExtInfo1 = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getAssocExtInfo1`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会组织结构内容*
export const getAssocExtInfo2 = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getAssocExtInfo2`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会章程内容*
export const getAssocExtInfo3 = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getAssocExtInfo3`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会入会流程内容*
export const getAssocExtInfo4 = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getAssocExtInfo4`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  获取会员列表数据*
export const memberList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/member/memberList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  获取会员详情*
export const getMemberDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/member/getMemberDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//   获取活动列表*
export const getActivityList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/activity/getActivityList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//   获取活动详情*
export const getActivityDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/activity/getActivityDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  获取我的活动列表*
export const activityJoinList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/activity/activityJoinList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  获取活动报名者列表*
export const activityJoinUsers = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/activity/activityJoinUsers`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//   活动报名（免费）
export const freeJoinActivity = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/activity/freeJoinActivity`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 活动报名（付费）
export const payJoinActivity = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/activity/payJoinActivity`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 缴纳会费（付费）
export const payMemberFee = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/member/payMemberFee`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 活动报名详情*
export const activityJoinDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/activity/activityJoinDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 活动门票核销*
export const activityConsume = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/activity/activityConsume`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 申请活动退款
export const activityRefundRequest = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/activity/activityRefundRequest`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}


// 获取会费相关信息*
export const getMembershipFeeInfo = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/member/getMembershipFeeInfo`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

// 获取协会相册列表*
export const getPhotoAlbumList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/association/getPhotoAlbumList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}


//  获取协会相册详情*
export const getPhotoAlbumDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/association/getPhotoAlbumDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//   创建协会相册*
export const createPhotoAlbum = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/createPhotoAlbum`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}


//    更新协会相册*
export const updatePhotoAlbum = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/updatePhotoAlbum`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//     删除协会相册*
export const deletePhotoAlbum = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/deletePhotoAlbum`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//     绑定会员的管理员用户
export const bindMemberUser = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/member/bindMemberUser`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//    绑定用户时发送验证码
export const sendSMSCode = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/member/sendSMSCode`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//    获取用户信息*
export const getUserinfo = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/user/getUserinfo`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//    更新用户信息*
export const updateUserinfo = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/user/updateUserinfo`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//    已创建的推送通知列表
export const createdNoticeList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/notify/createdNoticeList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//    已创建的推送通知详情
export const createdNoticeDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/notify/createdNoticeDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//    推送通知状态报告
export const noticeStatusReports = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/notify/noticeStatusReports`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//     创建推送通知*
export const createNotice = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/notify/createNotice`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//     收到的推送通知列表*
export const receivedNoticeList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/notify/receivedNoticeList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//     收到的推送通知详情*
export const receivedNoticeDetail = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/notify/receivedNoticeDetail`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  提交投诉建议
export const suggestSubmit = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/content/suggestSubmit`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  提交活动免费报名申请
export const freeJoinActivityRequest = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/activity/freeJoinActivityRequest`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  活动免费报名申请列表
export const freeJoinActivityRequestList = params =>{
	Vue.$vux.loading.show('')
	return ajax.get(`api/activity/freeJoinActivityRequestList`,{params}).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  获取最近一次的入会申请信息和状态*
export const getRecentlyJoinRequestStatus = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/association/getRecentlyJoinRequestStatus`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

//  活动免费报名申请的审核
export const freeJoinActivityRequestCheck = params =>{
	Vue.$vux.loading.show('')
	return ajax.post(`api/activity/freeJoinActivityRequestCheck`,params).then(res=>{
		Vue.$vux.loading.hide()
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}



const oss = axios.create({
  baseURL:'https://open.sxy.cs26.com',
  // withCredentials: true,
})

//    获取oss上传签名数据
export const osssign = params =>{
	return oss.post(`api?act=osssign`,params).then(res=>{
		if (res.data.errcode == 0) {
			return res.data
		}else if (res.data.errmsg) {
			Vue.$vux.alert.show({
				title:'提示',
				content:res.data.errmsg
			})
			return false
		}else{
			Vue.$vux.alert.show({
				title:'提示',
				content:'请求失败,请重试'
			})
			return false
		}
	})
}

export const photoSubmit = params =>{
	let progress = '0%'
	Vue.$vux.loading.show(progress)
	const formData = new FormData()
	formData.append("key", params.key_prefix);
	formData.append("OSSAccessKeyId", params.accessid);
	formData.append("policy", params.policy);
	formData.append('signature', params.signature);	//oss签名
	formData.append('success_action_status', '200');	//oss签名
	formData.append('file', params.file);	//要上传的文件对象
	return axios.post(params.host,formData,{
		onUploadProgress: progressEvent => {
		    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
			Vue.$vux.loading.show(complete)
		    console.log(complete)
		  }
	}).then(res=>{
		Vue.$vux.loading.hide()
	})
}