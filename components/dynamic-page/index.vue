<template>
	<view :style="[_get(config, 'pageStyle', {}), _get(config, 'moduleContainer', {})]">
        <van-skeleton row="10" :loading="skeletonLoading">
          <block v-if="_get(config, 'modules', []).length > 0">
            <view v-for="(item, index) in config.modules" :key="index">
				
				<dynamic-form
					:Details="Details||item.Details"
					 v-if="_get(item, 'type') === 'autoform'"
					 :config="{
							..._get(config.moduleData, item.key, {}),
							outStyle: getComponentStyle(item)
					 }"
					:srvFormData="getComponentsData(item) || (srvFormData||{})"
					:routeParams="routeParams"
				/>
				
				<view v-if="_get(item, 'type') === 'autolist'" >
					<card
						:otherStyle="{
							'padding':'10px 0 0 0',
							'fill':'#EFEFEF',
							'title':{
								'fill':'#FFFFFF'
							}
						}"
						:title="_get(item,'name','')||listName"
						:jump="_get(_get(config.moduleData,item.key,{}),'jump',false)"
						:jumpText="_get(_get(config.moduleData,item.key,{}),'jumpText','')"
						:url="_get(_get(config.moduleData,item.key,{}),'jumpUrl','')"
						v-if="_get(item,'name')||listName"
						>
							<dynamic-list
								:unloading="_get(_get(config.moduleData,item.key,{}),'unloading',false)"
								:config="{
									..._get(config.moduleData, item.key, {}),
									...getComponentsData(item) ? { list: getComponentsData(item) } : {},
									outStyle: getComponentStyle(item)
								}"
								:otherSearch="otherSearch"
								:routeParams="routeParams"
								:namespace="_get(config, name)"
							/>
					</card>
					
					<dynamic-list
						:unloading="_get(_get(config.moduleData,item.key,{}),'unloading',false)"
						:config="{
							..._get(config.moduleData, item.key, {}),
							...getComponentsData(item)
								? { list: getComponentsData(item) } 
								: {},
							outStyle: getComponentStyle(item)
						}"
						v-if="!_get(item,'name')&&!listName"
						:otherSearch="otherSearch"
						:routeParams="routeParams"
						:namespace="_get(config, 'name')"
					></dynamic-list>
				</view>
				
				
				<view v-if="_get(item, 'type') === 'autoTable'">
					<card
						:otherStyle="{
							'padding':'10px 0 0 0',
							'fill':'#EFEFEF',
							'title':{
								'fill':'#FFFFFF'
							}
						}"
						:title="_get(item,'name','')"
						v-if="_get(item,'name')!==undefined&&_get(item,'name')!==''"
						>
							<tab-list
								:config="{
								    headerTitle: _get(config.moduleData, `${item.key}.headerTitle`, []),
									..._get(config.moduleData, item.key, {})
					
								}"
							/>
					</card>
					<tab-list
						v-if="_get(item,'name')===undefined||_get(item,'name')===''"
							:config="{
								headerTitle: _get(config.moduleData, `${item.key}.headerTitle`, []),
								..._get(config.moduleData, item.key, {})
							}"
					 />
						
				</view>
					
				<view v-if="_get(item, 'type') === 'banner'">
					<card
						:otherStyle="{
							'fill':'#EFEFEF',
							'title':{
								'fill':'#FFFFFF'
							}
						}"
						:title="_get(item,'name','')"
						v-if="_get(item,'name')!==undefined&&_get(item,'name')!==''"
						>
						<swiper-images 
							:config="{
							..._get(config.moduleData, item.key, {}),
							}"
						/>
					  </card>
					
						<swiper-images 
							v-if="!_get(item,'name')"
							:config="{
							..._get(config.moduleData, item.key, {}),
							}"
						/>
				</view>
										
				<view v-if="_get(item, 'type') === 'navlist'">
					<card
						:otherStyle="{
							'padding':'10px 0 0 0',
							'fill':'#EFEFEF',
							'title':{
								'fill':'#FFFFFF'
							}
						}"
						:title="_get(item,'name','')"
						v-if="_get(item,'name')!==undefined&&_get(item,'name')!==''"
						>
							<nav-list 
								:title="_get(item,'name','')"
								:config="{
									list: _get(config.moduleData, `${item.key}.navList`, []),
									itemModule: _get(config.moduleData, `${item.key}.itemModule`, []),
									itemGroupModule: _get(config.moduleData, `${item.key}.itemGroupModule`, {}),
									outStyle: getComponentStyle(item),

								}"
							/>
					</card>
					<nav-list
						v-if="_get(item,'name')===undefined||_get(item,'name')===''"
							:title="_get(item,'name','')"
							:config="{
								list: _get(config.moduleData, `${item.key}.navList`, []),
								itemModule: _get(config.moduleData, `${item.key}.itemModule`, []),
								itemGroupModule: _get(config.moduleData, `${item.key}.itemGroupModule`, {}),
								outStyle: getComponentStyle(item),
							}"
					 />
				</view>
				
				<title-card
					:otherStyle="{
						'padding':'5px 20px',
						'fill':'#788896',
						'justify': 'center',
						'corner': '30px',
						'margin': '0 0 0 8px',
						'label':{
							'color': _get(item,'container.color','')
						},
						'title':{
							'color': '#ffffff',
							'weight': 'bold'
						}
					}"
					:label="_get(item,'label','')"
					:title="getComponentsData(item)"
					v-if="_get(item,'type') === 'titleCard'"
				>
				</title-card>
				
				<box-list
					v-if="_get(item,'type') === 'boxlist'"
					:list="getComponentsData(item)" 
				></box-list>
				 
				<search
				 v-if="_get(item, 'type') === 'search'"
				 :config = "_get(config.moduleData,item.key,{})"
				></search>
				
				<!-- 新增  2021-2-25 -->
				<cell
					v-if="_get(item, 'type') === 'cell'"
					:param = "_get(config.moduleData,`${item.key}.param`, {})"
					:days = "getComponentsData(item) || 0"
				/>
				<!-- end -->
				<!-- 步骤条组件 2021-6-29 -->
				<steps
					v-if="_get(item, 'type') === 'steps'"
					:list="getComponentsData(item) ||  _get(config.moduleData, `${item.key}.steps`, [])"
					:outStyle="getComponentStyle(item)"
				></steps>
				 <c-button
					v-if="_get(item, 'type') === 'button'"
					:config = "_get(config.moduleData,item.key,{})"
				 ></c-button>
				 <avatar
					v-if="_get(item,'type') === 'avatar'"
					:item="getComponentsData(item)"
					:avatarData="_get(config.moduleData,item.key,{})"
				 ></avatar>
				 
				 <!-- tab栏組件 -->
				 <page-tabbar v-if="_get(item,'type') === 'pageTabbar'"
				 	:tabs="_get(config.moduleData,item.key,{tabs:[]}).tabs"></page-tabbar>
					
				<!--容器组件  -->
				<view v-if="_get(item, 'type') === 'container'">
					<container 
						:config="{
							..._get(config.moduleData, item.key, {}),
						}"
					/>
				</view> 
				
				<!--半圆组件  -->
				<view v-if="_get(item, 'type') === 'Semicircle'">
					<Semicircle
						:config="{
							..._get(config.moduleData, item.key, {}),
						}"
					/>
				</view> 
				
				<!-- title + subTitle + tag -->
				<page-title-module
					v-if="_get(item, 'type') === 'pageTitleModule'"
					:config="{
						..._get(config.moduleData, item.key, {}),
					}"
				/>
				
				<view v-if="_get(item, 'type') === 'autoSelection'" >
					<card
						:otherStyle="{
							'padding':'10px 0 0 0',
							'fill':'#EFEFEF',
							'title':{
								'fill':'#FFFFFF'
							}
						}"
						:title="_get(item,'name','')||listName"
						:jump="_get(_get(config.moduleData,item.key,{}),'jump',false)"
						:jumpText="_get(_get(config.moduleData,item.key,{}),'jumpText','')"
						:url="_get(_get(config.moduleData,item.key,{}),'jumpUrl','')"
						v-if="_get(item,'name')||listName"
						>
							<dynamicSelectionList
								:unloading="_get(_get(config.moduleData,item.key,{}),'unloading',false)"
								:config="{
									..._get(config.moduleData, item.key, {}),
									...getComponentsData(item) ? { list: getComponentsData(item) } : {},
									outStyle: getComponentStyle(item)
								}"
								:otherSearch="otherSearch"
								:routeParams="routeParams"
							/>
					</card>
					
					<dynamicSelectionList
						:unloading="_get(_get(config.moduleData,item.key,{}),'unloading',false)"
						:config="{
							..._get(config.moduleData, item.key, {}),
							...getComponentsData(item)
								? { list: getComponentsData(item) } 
								: {},
							outStyle: getComponentStyle(item)
						}"
						v-if="!_get(item,'name')&&!listName"
						:otherSearch="otherSearch"
						:routeParams="routeParams"
					/>
				</view>
				
				<!-- <form-item-list
					:config="{
						...item,
						moduleData: config.moduleData
					}"
				/> -->
				
				
            </view>
          </block>
		  
		  <!-- <view class="btn-content" v-if="_get(config, 'submitNavigation')">
		  	<button class="btn defaultBg">
		  		<text>提交</text>
		  	</button>
		  </view> -->
        </van-skeleton>
	</view>
</template>

<script>
	import _ from 'lodash'
	import qs from 'qs'
	import { getFormAPIdata } from '../../common/api.js'
	import { request } from '../../common/request.js'
	// import { Base64,guid } from '../../utils/tools.js'
	import dynamicList from '../dynamic-list/index.vue'
    import dynamicForm from '../dynamic-form/index.vue'
	import formItemList from './formItemList/index.vue'
	import swiperImages from '../swiper-images/index.vue'
    import navList from '../nav-list/index.vue'
    import boxList from '../box-list/box-list.vue'
	import card from '../other/Card.vue'
	import titleCard from '../other/TitleCard.vue'
	import pageTitleModule from '../other/PageTitleModule.vue'
	import search from '../search/search.vue'
	import cell from '../other/Cell.vue'
	import steps from '../Steps/Steps.vue'
	import cButton from '../other/C-Button.vue'
	import Avatar from '../Avatar.vue'
    import { globalConfig } from '@/config.js'
	import {LoadComplete} from '@/common/api.js'
	import pageTabbar from '../publicComponents/pageTabbar/pageTabbar.vue'
	import Container from '../container/index.vue'
	import Semicircle from '../Semicircle/index.vue'
	import TabList from '../tableList/index.vue'
	import dynamicSelectionList from '../dynamic-selection-list/index.vue'
	export default {
		components: { 
			dynamicList, 
			dynamicForm,
			formItemList,
			swiperImages,
			navList,
			boxList,
			card,
			titleCard,
			pageTitleModule,
			search,
			cell,
			steps,
			cButton,
			Avatar,
			pageTabbar,
			Container,
			Semicircle,
			TabList,
			dynamicSelectionList
		},
		props: {
			API: String,  // 页面数据请求接口
            requsetParam: {  // 页面数据请求参数
				type: Object,
				default: function () {
					return {}
				}
			},
            contentType: {  //页面数据类型 [base64, json]
                type: String,
                default: 'json'
            },
            contentPayload: {  //页面有效数据位置
                type: String,
                default: 'data'
            },
			srvFormData:{
				type:Object
			},
			Details:Boolean,
			otherSearch:{
				type:Object,
				default(){
					return {}
				}
			},
			listName:{
				type:String,
				default(){
					return ""
				}
			},
			/*
			* 2022-7-2 新增参数
			*/
			routeParams:{
			  type: Object,
			  default () {
			    return {}
			  }
			},
			/*
			* 2022-7-21 新增参数
			*/
			isInit: {
				type: Boolean,
				default(){
					return false
				}
			},
		},
		data () {
			return {
				config: null, //页面配置信息
				pageData: {}, // 页面数据
				skeletonLoading: true,
				
				header: {  // 请求header
					Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`,
					token: uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''
				},
				codeData:null,
				codeAPI:"",
				code:"",
				state:null,
				conf:null
			}

		},
		created() {
		  // this.fetchConfigData()
		  // console.log('pageModule',this.config)
		},
		computed:{
			//监听是否重新执行访问请求
			initFetch(){
				if(this.isInit){
					this.config = {}
					this.fetchConfigData()
				}
			}
		},
		mounted(){
			console.log("重新挂載")
			let id = this.formatId(this.API)
			let that = this
			// console.log(that.srvFormData,"SRVFORMDATA")
			this.skeletonLoading = true
			if (id) {
				that.pageId = id
				let data = this.$cache(`page_${id}`)
				// if(that.srvFormData){
				// 	let srvForm = that.srvFormData
				// 	that.$timeCache(`page_${id}_form_Srv`,srvForm,that.$config.cachePolicy*24*60*60)// config中的cachePolicy可以控制緩存策略
				// 	let pageFormCacheList = that.$cache.get('pageFormCacheList')||[]
				// 	pageFormCacheList.push(`page_${id}_form_Srv`)
				// 	that.$cache.set(`pageFormCacheList`,pageFormCacheList)
				// }
				// let change = this.$cacheMap("FormChange")
				// let formData
				// if(!change){
				// formData = this.$timeCache(`page_${id}_form_Srv`)
				// formData = {
				// 	...formData,
				// 	...that.srvFormData
				// }
				// }else{
				// console.log("改變")
				// this.$cache.remove('FormChange')
				// formData = that.srvFormData
				// }
				if (data) {
					// console.log("使用緩存page_"+data)
					// if(formData){
					// 	console.log(`使用緩存page_${id}_form_Srv`,formData)
					// 	that.formData = formData
					// }
					// console.log(this.formData,"this")
					this.loadPage(data)
					this.$forceUpdate()
				} else {
					this.fetchConfigData()
				}
			} else {
				this.fetchConfigData()
			}
			this.skeletonLoading = false
			// console.log("srv",this.srvFormData)
			// let TFormKey = this.FormKey
			// console.log(this.FormKey)
			// console.log("modules",this.config.modules)
			// if(this.config){
			// 	this.config.modules.map((item,i)=>{
			// 		if(_.get(item, 'type') === 'autoform'){
			// 			let FormKey = _.get(item,'FormKey','')
			// 			// console.log("能到這")
			// 			if(FormKey){
			// 				// console.log("FormKey",FormKey)
			// 				this.getWorkflow(FormKey)	
			// 			}else if(TFormKey){
			// 				this.getWorkflow(TFormKey)
			// 			}else{
			// 				this.getCodeData(this.codeAPI,this.code)
			// 			}
			// 		}
			// 	})
			// }
			// console.log("執行完了")
			// console.log("执行完了")
		},
		updated(){
			// let TFormKey = this.FormKey
			// console.log(this.FormKey)
			// this.config.modules.map((item,i)=>{
			// 	if(_.get(item, 'type') === 'autoform'){
			// 		let FormKey = _.get(item,'FormKey','')
			// 		if(FormKey){
			// 			// console.log("FormKey",FormKey)
			// 			this.getWorkflow(FormKey)	
			// 		}else if(TFormKey){
			// 			this.getWorkflow(TFormKey)
			// 		}else{
			// 			this.getCodeData(this.codeAPI,this.code)
			// 		}
			// 	}
			// })
		},
		methods: {
			_get (data, field, value) {
				if(_.get(data, 'hidden')){
					return ''
				}
				return _.get(data, field, value)
			},
			// 获取页面请求数据接口 
			getRequestUrl (resData) {
                let url
				if (_.has(resData, 'dataSource.api') && resData.dataSource.api) {
				   url =  resData.dataSource.api
				}
				if (url && Object.keys(this.requsetParam).length > 0) {
					let str = url.split('?')[0]
					let query = url.split('?')[1] ? qs.parse(url.split('?')[1]) : {}
                    const queryData = {
                        ...query,
                        ...this.requsetParam
                    }
					if (str.includes('/:')) {
						let newStr = ''
						str.split('/:').map((x, i) => {
                            if (_.has(queryData, x)) {
                                delete queryData[x]
                            }
							newStr += (i === 0 ? x : `/${this.requsetParam[x]}`)
						})
						str = newStr
					}
                    let queryStr = ''
                    Object.keys(queryData).map((x, i) => {
                         if (queryData[x] !== '' && this.requsetParam[x] !== '') {
                            const symbol = (i === Object.keys(queryData).length - 1 ? '' : '&')
                            queryStr += (query[x] === '' ? `${_.get(this.requsetParam, x, '')}${symbol}` : `${x}=${_.get(this.requsetParam, x, query[x])}${symbol}`) 
                         }
                    })
					url = str + (queryStr ? `?${queryStr}` : '')
				}
				return url
			},
			
			// 獲取id
			formatId(api) {
				if (api) {
					api = api.toString()
					if (api.indexOf("?id=") !== -1) {
						api = api.split('?id=')[1]
						return api.split('&')[0]
					} else if (api.indexOf("&id=") !== -1) {
						api = api.split('&id=')[1]
						return api.split('&')[0]
					}
				} else {
					return undefined
				}
			},
			
			// 加載
			loadPage(data) {
				let pageUrl
				const dataPayload = _.get(data, 'dataPayload')
				if (dataPayload && typeof data.dataPayload === 'object' && JSON.stringify(data.dataPayload) !== '{}') {
					pageUrl = ''
					this.pageData = _.cloneDeep(_.get(data, dataPayload))
				} else {
					pageUrl = this.getRequestUrl(data)
				}
				if (pageUrl) {
					pageUrl = pageUrl.indexOf('http') > 0 ? pageUrl : `${this.$config.endpoint}${pageUrl}`
					this.fetchPageData(data, pageUrl)
				} else {
					this.config = data
					this.skeletonLoading = false
				}
				if (_.has(data, 'title')) {
					uni.setNavigationBarTitle({
						title: _.get(data, 'title', '动态页面')
					})
				} 
			},
			// 获取configData数据
			fetchConfigData () {
				let that = this
				uni.request({
					url: this.API,
					method: 'GET',
					header: this.header,
					complete: (res) => {
						if (_.get(res, 'data.code') === 200) {     
                            const contentType = this.contentType || 'json'
                            const contentPayload = this.contentPayload || 'data'
                            let responseData = _.get(res.data, contentPayload, contentType === 'base64' ? '' : {})
                            if (responseData && contentType === 'base64') {
                                try {
                                   responseData = Base64.decode(responseData) ? JSON.parse(Base64.decode(responseData)) : {}
                                } catch {}
                            }
							if (responseData && _.isString(responseData)) {
								try {
								   responseData = JSON.parse(responseData)
								} catch {}
							}
							const resData = _.cloneDeep(responseData)
							let id = that.formatId(that.API)
                            if(id){
								that.$cache(`page_${id}`, resData, that.$config.cachePolicy * 24 * 60 *
									60)
								// config中的cachePolicy可以控制緩存策略
								// page緩存列表
								let pageCacheList = that.$cache("pageCacheList") || [] 
								pageCacheList.push(`page_${id}`)
								that.$cache("pageCacheList", pageCacheList)
							}
                            // 获取页面请求接口
                            let pageUrl
                            const dataPayload = _.get(resData, 'dataPayload')
                            if (dataPayload && _.get(res.data, dataPayload) && typeof _.get(res.data, dataPayload) === 'object' && JSON.stringify(_.get(res.data, dataPayload)) !== '{}') {
                                pageUrl = ''
                                this.pageData = _.cloneDeep(_.get(res.data, dataPayload))
                            } else {
                               pageUrl = this.getRequestUrl(resData)
                            }
							// 加载页面数据
							if (pageUrl) {
								pageUrl = pageUrl.indexOf('http') > 0 ? pageUrl : `${this.$config.endpoint}${pageUrl}`
								this.fetchPageData(resData, pageUrl)
							} else {
								this.config = resData
								this.skeletonLoading = false                               
							}
							if (_.has(resData, 'title')) {
								uni.setNavigationBarTitle({
									title: _.get(resData, 'title', '动态页面')
								})
							}
						}
					}
				})
			},
			fetchPageData (configData = {}, pageUrl) {
				uni.request({
					url: pageUrl,
					method: 'GET',
                    data: _.get(configData, 'dataSource.request', {}),
                    header: this.header,
					complete: (res) => {
						this.config = { ...configData }
						this.skeletonLoading = false
						if (_.get(res, 'data.code') === 200) {			
                            const resData = _.get(res, 'data', {})
                            const responseConfig = _.get(this.config, 'dataSource.response', {})
                            let dataField = 'data'
                            if (_.has(responseConfig, 'data') && responseConfig.data) {
                                dataField = responseConfig.data
                            }
                            this.pageData = _.cloneDeep(_.get(resData, dataField, {}))
						}
					}
				})
			},
			// 获取组件数据
			getComponentsData (item) {
				// 若config.dataSource.options 已配置， autolist默认数据从这取
				if (_.get(this.config, 'dataSource.options') && item.type === 'autolist') {
					return _.get(this.config, 'dataSource.options')
				}
				
				if (!_.has(item, 'binding') || JSON.stringify(item.binding) === '{}') {
					return ''
				}
				const comonentScouce = {}
				const comonentSouceList = []
				for (const i in item.binding) {
					if(Array.isArray(item.binding[i])){
						const itemObj = this.pageData[i]
						for(const iKey in itemObj){
							const comonentSouceListItem = {}
							comonentSouceListItem.title = iKey
							comonentSouceListItem.number = itemObj[iKey]
							comonentSouceList.push(comonentSouceListItem)
						}
					}else{
						comonentScouce[item.binding[i]] = _.get(this.pageData, i, '')
					}
				}
				let value
				switch (item.type) {
					case 'autoform':
					    value = comonentScouce
						break;
					case 'autolist':
					    value = _.has(comonentScouce, 'list') ? comonentScouce.list : false
						break;
					case 'banner':
					    value = _.has(comonentScouce, 'banners') ? comonentScouce.banners : false;
						break;
					case 'navlist':
					    value = _.has(comonentScouce, 'navList') ? comonentScouce.navList : false
					    break;
					case 'boxlist':
						if(this.pageData && JSON.stringify(this.pageData) !== '{}' && !_.has(comonentScouce, 'navList')){
							value = comonentSouceList
						}else{
							value = comonentScouce.navList
						}
						break;
				    //新增  2021-2-25
					case 'cell':
					    value = _.has(comonentScouce, 'days') ? comonentScouce.days : false
						break;
					//
					case 'steps':
					    value = _.has(comonentScouce, 'steps') ? comonentScouce.steps : false
						break;
						
					//新增  2022-7-30
					case 'titleCard':
					    value = _.has(comonentScouce, 'title') ? comonentScouce.title : false
						break;
					default:
					    value = comonentScouce
				}
                return value
			},
            // 获取组件容器外层布局
            getComponentStyle (item) {
                if (_.has(item, 'container') && JSON.stringify(item.container) !== '{}') {
                    return _.get(item, 'container', {})
                }
                return _.get(this.config, 'moduleContainer', {})
            }
		}
	}
</script>

<style lang="scss">
	
	.btn-content{
		
		.defaultBg{
			background-color: #2C88D9;
			color: #fff;
		}
		
		.btn{
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 10rpx 40rpx;
			border-radius: 6rpx;
			// background-color: #418FF4;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	
</style>
