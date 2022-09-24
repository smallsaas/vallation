<template>
  <view class="venue_dynamic_list_container" :style="[_get(config, 'outStyle', {})]">
    <view>

      <load-refresh
        ref="loadRefresh"
        :pagination="_get(config, 'pagination', true)"
        :isRefresh="isRefresh"
        refreshType="hollowDots"
        color="#04C4C4"
        :heightReduce="heightReduce"
        :fixedHeight="fixedHeight"
        :currentPage="listCurrentPage"
        :totalPages="listTotalPages"
        :unloading="unloading"
        @loadMore="loadMore"
        @refresh="refresh"
      >
        <view slot="content-list">
			
			<view class="tab_content">
					
				<view class="multi_filter" v-if="multiFilter.length > 0">
					<multi-filter
						:multiFilter="multiFilter"
						:multiFilterModule="multiFilterModule"
						:newItemState="newItemState"
						:namespace="namespace"
						@selected="handleSelectMultiTab"
						@newItemStateSetAction="newItemStateSetAction"
					/>
				</view>
				<view class="tab_list" v-if="typeList.length > 0">
					<ms-tabs :list="typeList" field="name" v-model="tabActive" @selected="handleSelectTab" />
				</view>
			</view>
			
			
			<view :class="[`list_content ${listColumns} ${listItemLayout}`]" :style="[columnsStyle]">
				
			  <view v-for="(item, index) in list" :key="index" @click="checkNavType(item)">
				<myGroupontype
				  v-if="getListItemKey() === 'myGroupontype'"
				  :item="{
					...item,
					...getComponentBindData(item),
				  }"
				/>
				
				<order-item 
				  v-if="getListItemKey() === 'orderItem'"
				  :item="{
					...item,
					...getComponentBindData(item),
				  }"
				/>
				
				<vrItem 
					v-if="getListItemKey() === 'vrItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<new-address-item
					v-if="getListItemKey() === 'NewAddressItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				<AddressManagement
					v-if="getListItemKey() === 'AddressManagement'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<group-purchase-item
					v-if="getListItemKey() === 'groupPurchaseItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>


				  <supplierItem
					 v-if="getListItemKey() === 'supplierItem'"
					 :item="{
							  ...item,
							  ...getComponentBindData(item),
							}"
				  />


				<supplierInventoryItem
					v-if="getListItemKey() === 'supplierInventoryItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>

				
				<renovation-scheme-item
					v-if="getListItemKey() === 'renovationSchemeItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
					:routeParams="routeParams"
				/>
				
				<dealsquare-item 
					v-if="getListItemKey() === 'DealsquareItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
					:routeParams="routeParams"
				/>
				
				<resource-replacement-item 
					v-if="getListItemKey() === 'ResourceReplacementItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<house-type-item 
					v-if="getListItemKey() === 'houseTypeItem'"
					:container="{...getListContainer()}"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				<matching-item 
					v-if="getListItemKey() === 'MatchingItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<rent-house-item
					v-if="getListItemKey() === 'rentHoustItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<community-children-type-item
					v-if="getListItemKey() === 'communityChildrenTypeItem'"
					:index="index"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<user-list-item
					v-if="getListItemKey() === 'userListItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<user-building-item 
					v-if="getListItemKey() === 'userBuildingItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<user-asset-complaint-item
					v-if="getListItemKey() === 'userAssetComplaintItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
				/>
				
				<itemSelectType
					v-if="getListItemKey() === 'itemSelectType'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
					:itemIndex="index"
					@onSelectItem="handleSelectItem"
				/>
				
				<asset-item
					v-if="getListItemKey() === 'assetItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				
				<function-release-item 
					v-if="getListItemKey() === 'functionReleaseItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<tenant-children-type-item
					v-if="getListItemKey() === 'tenantChildrenTypeItem'"
					:index="index"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<banner-list-item
					v-if="getListItemKey() === 'bannerListItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
					@refresh="refresh"
				/>
				
				<tenant-user-manager-item
					v-if="getListItemKey() === 'tenantUserManagerItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<doorplate-config-item
					v-if="getListItemKey() === 'doorplateConfigItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
					@refresh="refresh"
				/>
				
				<user-feeback-item
					v-if="getListItemKey() === 'userFeebackItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<user-application-intermediary-item
					v-if="getListItemKey() === 'userApplicationIntermediaryItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<application-operations-manage-item
					v-if="getListItemKey() === 'applicationOperationsManageItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<super-function-release-item 
					v-if="getListItemKey() === 'superFunctionReleaseItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				<vr-category-list-item
					v-if="getListItemKey() === 'vrCategoryListItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				<vr-picture-list-item
					v-if="getListItemKey() === 'vrPictureListItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
					@refresh="refresh"
				/>
				<user-house-type-item
					v-if="getListItemKey() === 'userHouseTypeItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
					@refresh="refresh"
				/>
				
				<!-- 5 start -->
				<ApplicationItem 
					v-if="getListItemKey() === 'ApplicationItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				
				<AgentBriefInfoItem
					v-if="getListItemKey() === 'AgentBriefInfoItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item)
					}"
				/>
				<!-- 5 end -->
				
				<community-matching-reocrd-item 
					v-if="getListItemKey() === 'communityMatchingReocrdItem'"
					:item="{
					...item,
					...getComponentBindData(item)
					}"
				/>
				
				<my-invitation-item
					v-if="getListItemKey() === 'myInvitationItem'"
					:item="{
						...item,
						...getComponentBindData(item)
					}"
				/>
				
				<duplex-room-item
					v-if="getListItemKey() === 'duplexRoomItem'"
					:index="index"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
					@refresh="refresh"
				/>
				
				<user-test-item
					v-if="getListItemKey() === 'userTestItem'"
					:index="index"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
					@refresh="refresh"
				/>
				
				<notice-item 
					v-if="getListItemKey() === 'noticeItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
					@refresh="refresh"
				/>
				
				
				
				
				
				<landlord-item
					v-if="getListItemKey() === 'landlordItem'"
					:item="{
					  ...item,
					  ...getComponentBindData(item),
					}"
					@refresh="refresh"
					@dynamicListPopupCencalClose="onCencalClosePopup"
				/>
				
				
				
			<!-- ======================vallation============================ -->
			<all-page-item
			v-if="getListItemKey() === 'allPageItem'"
			:item="{
			  ...item,
			  ...getComponentBindData(item),
			}"
			@refresh="refresh"
			/>
			
			<router-item
			v-if="getListItemKey() === 'routerItem'"
			:item="{
			  ...item,
			  ...getComponentBindData(item),
			}"
			@refresh="refresh"
			/>
			
			<standard-component-item 
			v-if="getListItemKey() === 'standardComponentItem'"
			:item="{
			  ...item,
			  ...getComponentBindData(item),
			}"
			@refresh="refresh"
			/>

			
			
				
				
			  </view>
			  
			  <view v-if="isEmptyList && itemLayout == 'default'" class="list_empty">
				  <image 
					  :src="_get(this.config, 'nodata.url') || emptyImgUrl" 
					  mode="widthFix" 
					  class="image_empty"
					  :style="_get(this.config, 'nodata.imageStyle') || ''"
				  />
				  <view class="empty_subject">
					  {{_get(this.config, 'nodata.subject') || '暂无更多数据'}}
				  </view>
				  <view class="empty_note" v-if="_get(this.config, 'nodata.note')">
					{{_get(this.config, 'nodata.note')}}
				  </view>
			  </view>
			  
			  <view class="add-btn-content" v-if="_get(this.config, 'newItemModule')">
				  <new-item-navigation
					:config="{
						...config,
					}"
					:newItemStateSetValue="newItemStateSetValue"
				  />
			  </view>
			  
			  <view :style="{padding:'70rpx 20rpx 40rpx'}" v-if="isShowSelectItemBotton">
				  <view class="global-button"  @click="handleSelectItemSubmit">
					  选好了
				  </view>
			  </view>
		  </view>
        </view>
      </load-refresh>
	  
	  <!-- 设置弹出层 -->
	  <uni-popup ref="dynamicListPopup">
		<dynamic-list-popup
			v-if="popupConfig.options || popupConfig.name || popupConfig.type"
			:config="{
				...popupConfig,
				multiItemNavigation: config.multiItemNavigation
			}"
			@dynamicListPopupClose="onClosePopup"
			@dynamicListPopupCencalClose="onCencalClosePopup"
		/>
		<!--在父组件中绑定一个自定义事件  -->
	  </uni-popup>
    </view>
  </view>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
import { request } from '@/common/request.js'
import loadRefresh from '../load-refresh/load-refresh.vue'
import msTab from '../ms-tabs/ms-tabs.vue'
import newItemNavigation from '@/components/btn-box/index.vue'
import multiFilter from '@/components/multiFilter/index.vue'
import {globalConfig} from '@/config.js'
import { formatApiParams } from '@/components/utils/compxTools.js'

//popup 组件
import dynamicListPopup from '../dynamic-list-popup/index.vue'

import myGroupontype from './listItem/myGroupontype.vue'
import orderItem from './listItem/order/orderItem.vue'
import vrItem from '@/components/dynamic-list/listItem/vrItem.vue'
import NewAddressItem from '@/components/dynamic-list/listItem/NewAddressItem.vue'
import AddressManagement from '@/components/dynamic-list/listItem/AddressManagement.vue'
import groupPurchaseItem from '@/components/dynamic-list/listItem/order/groupPurchaseItem.vue'
import renovationSchemeItem from '@/components/dynamic-list/listItem/my/renovationSchemeItem.vue'
import DealsquareItem from '@/components/dynamic-list/listItem/DealsquareItem.vue'
import supplierItem from '@/components/dynamic-list/listItem/order/supplierItem.vue'
import supplierInventoryItem from '@/components/dynamic-list/listItem/order/supplierInventoryItem.vue'
import ResourceReplacementItem from '@/components/dynamic-list/listItem/replacementItem.vue'
import MatchingItem from '@/components/dynamic-list/listItem/matchingItem.vue'
import rentHouseItem from '@/components/dynamic-list/listItem/rentHouseItem.vue'
import communityChildrenTypeItem from '@/components/dynamic-list/listItem/my/communityChildrenTypeItem'
import userListItem from '@/components/dynamic-list/listItem/userListItem.vue'
import userBuildingItem from '@/components/dynamic-list/listItem/my/userBuildingItem.vue'
import userAssetComplaintItem from '@/components/dynamic-list/listItem/my/userAssetComplaintItem.vue'
import itemSelectType from '@/components/dynamic-list/listItem/itemSelectType.vue'
import assetItem from './listItem/my/assetItem.vue'
import functionReleaseItem from '@/components/dynamic-list/listItem/my/functionReleaseItem.vue'
import superFunctionReleaseItem from '@/components/dynamic-list/listItem/my/superFunctionReleaseItem.vue'
import tenantChildrenTypeItem from '@/components/dynamic-list/listItem/my/tenantChildrenTypeItem.vue'
import bannerListItem from '@/components/dynamic-list/listItem/my/bannerListItem.vue'
import tenantUserManagerItem from '@/components/dynamic-list/listItem/my/tenantUserManagerItem.vue'
import doorplateConfigItem from '@/components/dynamic-list/listItem/my/doorplateConfigItem.vue'
import userFeebackItem from '@/components/dynamic-list/listItem/my/userFeebackItem.vue'
import userApplicationIntermediaryItem from '@/components/dynamic-list/listItem/my/userApplicationIntermediaryItem.vue'
import applicationOperationsManageItem from '@/components/dynamic-list/listItem/my/applicationOperationsManageItem.vue'
import vrCategoryListItem from '@/components/dynamic-list/listItem/my/vrCategoryListItem.vue'
import vrPictureListItem from '@/components/dynamic-list/listItem/my/vrPictureListItem.vue'
import communityMatchingReocrdItem from '@/components/dynamic-list/listItem/communityMatchingReocrdItem.vue'
import myInvitationItem from '@/components/dynamic-list/listItem/myInvitationItem.vue'
import duplexRoomItem from '@/components/dynamic-list/listItem/my/duplexRoomItem.vue'
import userTestItem from '@/components/dynamic-list/listItem/my/userTestItem.vue'
// import noticeItem from '@/pages/sub/itemFile/noticeItem.vue'
import noticeItem from '@/components/dynamic-list/listItem/noticeItem.vue'
import landlordItem from '@/components/dynamic-list/listItem/my/landlordItem.vue'

// ==================== 5G ====================
import ApplicationItem from '@/components/dynamic-list/listItem/5G/ApplicationItem.vue'
import AgentBriefInfoItem from '@/components/dynamic-list/listItem/5G/AgentBriefInfoItem.vue'



// =========================autowx=============================================
import allPageItem from '@/components/dynamic-list/listItem/autowx/allPageItem.vue'
import routerItem from "@/components/dynamic-list/listItem/autowx/routerItem.vue"
import standardComponentItem from "@/components/dynamic-list/listItem/autowx/standardComponentItem"

export default {
  components: {
		loadRefresh,
		//popup item
		dynamicListPopup,
		msTab,
		multiFilter,
		newItemNavigation,
		myGroupontype,
		orderItem,
		vrItem,
		NewAddressItem,
		AddressManagement,
		groupPurchaseItem,
		supplierItem,
		supplierInventoryItem,
		renovationSchemeItem,
		DealsquareItem,
		ResourceReplacementItem,
		// houseTypeItem,
		MatchingItem,
		rentHouseItem,
		communityChildrenTypeItem,
		userListItem,
		userBuildingItem,
		userAssetComplaintItem,
		itemSelectType,
		assetItem,
		functionReleaseItem,
		superFunctionReleaseItem,
		tenantChildrenTypeItem,
		bannerListItem,
		tenantUserManagerItem,
		doorplateConfigItem,
		userFeebackItem,
		userApplicationIntermediaryItem,
		applicationOperationsManageItem,
		vrCategoryListItem,
		vrPictureListItem,
		// userHouseTypeItem,
		communityMatchingReocrdItem,
		myInvitationItem,
		duplexRoomItem,
		userTestItem,
		noticeItem,
		landlordItem,
		//  =========== 5G ===========
		ApplicationItem,
		AgentBriefInfoItem,
		
		// ============auto==============
		allPageItem,
		routerItem,
		standardComponentItem,
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return {}
      }
    },
    unloading: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 外部传入的查询
    otherSearch: {
      type: Object,
      default () {
        return {}
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
	* 2022-8-29
	*/
	namespace:{
      type: String,
      default () {
        return ''
      }
	}
  },
  created(){
  },
  data () {
    return {
      listCurrentPage: 1,
      listTotalPages: 1,
      list: [],
	  listLoading: true,
      typeList: [],
	  multiFilter:[],
	  multiFilterModule:{},
	  newItemState:{},
	  newItemStateSetValue:{},
      tabActive: 0,

      listSearch: {}, // 列表查询参数
      pageNoField: '', // 页数配置的字段名
      pageSizeField: '', // size配置的字段名
      isStop: true, //是否停止自动刷新
      Time: null,
      isDelete: false,
      columns: 1, //列表展示列數
	  emptyImgUrl: `${this.$config.staticImgEndpoint}/2022/image/empty.png`,
	  popupConfig: {},
	  itemLayout: 'default',
	  columnsStyle:{}
    }
  },
  computed: {
    heightReduce () {
      // return this.typeList.length > 0 ? 88 : 0
      return 0
    },
    //是否外部传入数据
    isPropsList () {
      return _.has(this.config, 'list') && _.isArray(this.config.list)
    },
    // 列表高度
    fixedHeight () {
      // 默认传入的为px
      let height = 0
      if (_.get(this.config, 'outStyle.height')) {
		  if(_.get(this.config, 'outStyle.height').indexOf('%') == -1){
			  height = parseInt(_.get(this.config, 'outStyle.height', 0)) - (this.typeList.length > 0 ? 44 : 0)
		  }
      }
	 //  else if(this.multiFilter){ //是否有多项tab组件
		// height = uni.getSystemInfoSync().windowHeight - (this.multiFilter.length === 1 ? 51 : this.multiFilter.length === 2 ? 102 : 0)
	 //  }else if(this.typeList){ //是否有多项tab组件
		// height = uni.getSystemInfoSync().windowHeight - 44
	 //  }
	  
	  //判断是否是数字
	  var numReg = /^[0-9]*$/
	  var numRe = new RegExp(numReg)
	  if (numRe.test(height)) {
		  if (height < 0) {
		    height = 0
		  }
		  return height
	  }
      return height
    },
    isRefresh () {
      // return !this.isPropsList && this.list.length !== 0
      return false
    },
	listColumns () {
		return _.size(this.list) && this.columns === 2 ? 'columns' : ''
	},
	listItemLayout(){
		return _.size(this.list) && this.itemLayout === 'wrap' ? 'flexwrap' : ''
	},
	isEmptyList () {
		return !_.size(this.list) && !this.listLoading
	},
	isShowSelectItemBotton () {
		return _.get(this.config, 'itemSelectType') && _.get(this.config, 'confirmNavigation') && _.size(this.list)
	}
  },
  mounted () {
    // 外部传入数据源
    if (_.get(this.config, 'loadApi')) {
      this.updateData()
      // this.Time = setInterval(() => {
        if (!this.isStop) {
          this.fetchList({
            refresh: true
          })
        }
      // }, 5000)
      // console.log(this.Time)
    } else {
      if (this.isPropsList) {
        this.list = _.cloneDeep(this.config.list)
      }
    }
	
	//列表展示列數
	if (_.get(this.config, 'columns')) {
	  this.columns = _.get(this.config, 'columns')
	}
	
	//列表排列方式
	if(_.get(this.config, 'itemLayout')){
		this.itemLayout = _.get(this.config, 'itemLayout')
	}
	
	
  },
  beforeDestroy () {
    clearInterval(this.Time)
  },
  methods: {
    _has (item = {}, str) {
      if (Object.keys(item).length === 0) {
        return false
      }
      return _.get(item, str)
    },
    _get (item, str, defauleValue = '') {
      return _.get(item, str, defauleValue)
    },
    getListItemKey () {
      // const moduleKey = _.get(this.config, 'config.modules[0].key', '')
      // const moduleData = _.get(this.config, 'config.moduleData', {})
      // const keyData = _.get(moduleData, moduleKey, {})
      const keyData = _.get(this.config, 'itemModule', {})
      return _.get(keyData, 'name', '')
    },
	getListContainer(){
		const cards = _.get(this.config,'itemModule',{})
		return _.get(cards,'container',{})
	},
    handleDelete (e) {
      this.isDelete = e
    },
    // 切换tab
    handleSelectTab (e, item) {
      this.tabActive = e
      const typeField = _.get(this.config, 'tabConfig.field')
      this.listSearch = {
        ...this.listSearch,
        [typeField]: _.get(item, 'value'),
        [this.pageNoField]: 1
      }
      this.fetchList({
        refresh: true
      })
    },
	
	// 切换multi tab
	handleSelectMultiTab (fieldObj) {
	  this.listSearch = {
	    ...this.listSearch,
	    ...fieldObj,
	    [this.pageNoField]: 1
	  }
	  this.fetchList({
	    refresh: true
	  })
	},
	
	newItemStateSetAction(data){
		this.newItemStateSetValue = data
	},

    // 更新數據
    updateData () {
      this.typeList = _.get(this.config, 'tabConfig.show') === true ? _.get(this.config, 'tabConfig.list', []) : []
      this.multiFilter = _.get(this.config, 'multiFilter') ? _.get(this.config, 'multiFilter', []) : []
      this.multiFilterModule = _.get(this.config, 'multiFilterModule') ? _.get(this.config, 'multiFilterModule', {}) : {}
      this.newItemState = _.get(this.config, 'newItemState') ? _.get(this.config, 'newItemState', {}) : {}
      const requestData = _.get(this.config, 'request', {})
      const searchData = {}
      for (const key in requestData) {
        if (key !== 'default') {
          searchData[requestData[key]] = ''
        }
      }

      if (_.has(searchData, 'pageNum')) {
        searchData.pageNum = 1
      }
      if (_.has(searchData, 'pageSize')) {
        searchData.pageSize = 10
      }

      this.pageNoField = _.get(searchData, 'pn', 'pageNum')
      this.pageSizeField = _.get(searchData, 'ps', 'pageSize')

      //處理pageSize自定義值
      for (var item in searchData) {
        if (item && item.indexOf('pageSize=') != -1) {
          const itemArr = item.split('=')
          searchData[itemArr[0]] = parseInt(itemArr[1])
          delete searchData[item]
        }
      }

      this.listSearch = { ...searchData, ..._.get(this.config, 'request.default', {}), ...this.otherSearch || {} }
	  
	  if(this.typeList.length > 0) {        this.fetchList({ refresh: true })	  }else if(this.multiFilter.length > 0 && this.multiFilterModule.name){
	    this.fetchList({ refresh: true })
	  }else if(this.typeList.length === 0 && this.multiFilter.length === 0 && JSON.stringify(this.multiFilterModule) === "{}"){
        this.fetchList({ refresh: true })
	  }
	  
    },

    formatLoadApi (api) {
      // console.log('formatLoadApi = ', api)
      let that = this
      let apistring
	  if (api.indexOf("{{") !== -1) {
		let string = api.split("{{")[1]
		let string1 = string.split("}}")[0]
		if (string1.indexOf('.') !== -1) {
		  let cache = that.$cache(string1)
		  let itemString = string1.split(".")[1]
		  let value = cache[itemString]
		  apistring = api.replace(`{{${string1}}}`, value)
		} else {
		  let cache = that.$cache(string1)
		  // console.log(cache, "cache", string1)
		  apistring = api.replace("{{" + string1 + "}}", cache)
		}
	  } else {
		  
		apistring = formatApiParams(api, {...this.listSearch, ...this.routeParams})
	  }
      
      return apistring
    },
	
	handleParams(){
		if(typeof this.routeParams === 'object' && JSON.stringify(this.routeParams) != '{}'){
			return this.listSearch = { ...this.listSearch, ...this.routeParams}
		}
		return this.listSearch
	},

    // 獲取列表信息
    fetchList (searchData = {}) {
		if(_.get(searchData, 'refresh')){
			this.list = []
		}
	  this.listLoading = true
	  uni.showLoading({ title:'', mask: true })
      // console.log(this.formatLoadApi(_.get(this.config,'loadApi')),"loadAPi")
      let that = this
      uni.request({
        url: this.$config.endpoint + this.formatLoadApi(_.get(this.config, 'loadApi')),
        method: _.get(this.config, 'method', 'GET'),
        data: that.handleParams(),
        header: {
          Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`
        },
        complete: (res) => {
		  this.listLoading = false
          uni.hideLoading()
          if (['000000', '00000', 200].includes(_.get(res, 'data.code'))) {
            const data = _.get(res, 'data.data')
            const listField = _.get(this.config, 'response.list', 'list')
            const totolField = _.get(this.config, 'response.total', 'total')
            const prevList = _.get(searchData, 'refresh') ? [] : this.list
            this.list = prevList.concat(listField ? _.get(data, listField, []) : data)
            const total = Number(_.get(data, totolField, 0))
            this.listCurrentPage = this.list.length < 10 ? 1 : Math.ceil(this.list.length / 10)
            this.listTotalPages = total < 10 ? 1 : Math.ceil(total / 10)
			//设置列表列数
			if(_.get(data, this.config.columnsBinding)){
				this.columnsStyleConfig(_.get(data, this.config.columnsBinding))
			}
            this.$refs.loadRefresh.completed()
          }
          that.$forceUpdate()
        }
      })
    },

    // 加载更多
    loadMore () {
      if (!this.unloading) {
        // console.log("加载更多")
        if (this.isPropsList) {
          return
        }
        this.isStop = true
        this.listSearch = {
          ...this.listSearch,
          [this.pageNoField]: this.listSearch[this.pageNoField] + 1
        }
        this.fetchList()

      }
    },

    // 上拉加載刷新
    refresh () {
      if (!this.unloading) {
        if (this.isPropsList) {
          return
        }
        this.listSearch = {
          ...this.listSearch,
          [this.pageNoField]: parseInt(1)
        }
        this.fetchList({ refresh: true })
      }
    },

    // 列表项组件与列表数据绑定
    getComponentBindData (item) {
      if (!_.has(this.config, 'binding') || JSON.stringify(this.config.binding) === '{}') {
        return {}
      }
      const comonentScouce = {}
      for (const i in this.config.binding) {
        comonentScouce[this.config.binding[i]] = _.get(item, i, '')
      }
      return comonentScouce
    },
	
	//检查 iten nav 类型
	checkNavType(item){
		if (this.isDelete) {
		  return
		}
		if (_.get(this.config, 'itemNavigation')) {
			this.handleJumpRoute(item)
		}else if(_.get(this.config, 'multiItemNavigation')){
			this.onShowPopup(item)
		}
	},

    // 统一跳转路由
    handleJumpRoute (item) {
      // if (this.isDelete) {
      //   return
      // }
      // if (!_.get(this.config, 'itemNavigation')) {
      //   return
      // }
      let routeUrl = ''
      const itemNavigation = this.config.itemNavigation
      const route = itemNavigation.split('?')[0]
      const query = itemNavigation.split('?')[1] ? qs.parse(itemNavigation.split('?')[1]) : {}
      routeUrl += (`/pages${route.charAt(0) !== '/' ? '/' : ''}` + route)
      if (Object.keys(query).length > 0) {
        for (const i in query) {
          if (query[i] === '') {
            query[i] = item[i] || ''
          }
        }
        routeUrl += '?query=' + encodeURIComponent(JSON.stringify(query))
      }
      // console.log('routeUrl= ', routeUrl)
      // 旧跳转方式
      uni.navigateTo({
        url: routeUrl
      })
      // 栈溢出,改用redirectTo
      // uni.redirectTo({
      // 	url: routeUrl
      // 	// success:res =>{// console.log("跳转成功")},
      // 	// fail:err =>(// console.log("跳转失败",err))
      // })
    },
	
	//处理底部弹出窗口数据
	onShowPopup(data){
		// 从底部打开弹窗
		this.$refs.dynamicListPopup.open('bottom')
		const pConfig = _.get(this.config, 'multiNavigationModule')
		// 选择类型和给定的选项
		if(pConfig.optionSelectType && pConfig.options){
				this.popupConfig = {
					type : pConfig.name,
					choices : pConfig.options,
					selectType:pConfig.optionSelectType,
					data:data,
				}
		}
		// 选择类型和后台请求回的数据
		else if(pConfig.optionSelectType && pConfig.api){
			if(pConfig.optionSelectType == 'multiselect'){
				
			}
		}
		// 只有自定义的选项
		else if(pConfig.options){
			const popupList = []
			pConfig.options.map(optionItem=>{
				const nItem = {
					...optionItem,
					data:data
				}
				popupList.push(nItem)
			})
			this.popupConfig.options = popupList
		} 
		else if(pConfig.name){
			this.popupConfig = {
				name: pConfig.name,
				data: data
			}
		}	
		// console.log('this.popupConfigyy == ', this.popupConfig)
		//更新数据
		this.$forceUpdate()
	},
	
	onClosePopup(){
		this.$refs.dynamicListPopup.close();
		this.refresh()
	},
	onCencalClosePopup(){
		this.$refs.dynamicListPopup.close();
	},
	
	// 列表项需要选择
	handleSelectItem (value, index) {
		if (!_.get(this.config, 'itemSelectType') && !_.get(this.config, 'confirmNavigation')) {
			return
		}
		const newData = _.cloneDeep(this.list).map((x, i) => {
			if (this.config.itemSelectType === 'multiselect') {
				if (index === i) {
					x.checked = value
				}
			} else {
				x.checked = (index === i) ? value : false
			}
			return x
		})
		this.list = [...newData]
		// console.log('this.list',this.list)
	},
	// 列表项选择提交
	async handleSelectItemSubmit () {
		if (this.list.every(x => !x.checked)) {
			uni.showToast({
				title: '请至少选择一项数据',
				icon: 'none'
			})
			return
		}
		let url = this.config.confirmNavigation
		if (!url.startsWith('https')) {
			url = globalConfig.endpoint + url
		}
		const list = this.list.filter(x => x.checked)
		const valueList = []
		// 找出提交字段键
		let listField = ''
		// 找出对应关系
		let labelFieldObj = {}
		if (_.get(this.config, 'postBinding') && Object.keys(this.config.postBinding).length > 0) {
			for (let key in this.config.postBinding) {
				const value = this.config.postBinding[key]
				try {
					listField = value.split('.')[0].replace('[]', '')
					labelFieldObj[key] = value.split('.')[1]
				} catch {}
			}
		}
		list.map(x => {
			const data = {}
			for (let key in labelFieldObj) {
				data[labelFieldObj[key]] = x[key]
			}
			valueList.push(data)
		})

		// const res = await request('PUT', url, { typeList: list })
		const res = await request('PUT', url, { [listField]: valueList })
		if (['000000', '00000', 200].includes(_.get(res, 'data.code' ) || _.get(res,'code' ))) {
			if (_.get(this.config, 'backNavigation')) {
				uni.navigateBack({
					delta:1
					//url: `${this.config.backNavigation}?list=${encodeURIComponent(JSON.stringify(list))}`
				})
			}
		} else {
			uni.showToast({
				title: '操作失败',
				icon: 'none'
			})
		}
	},
	
	//设置列表列数
	columnsStyleConfig(cols){
		const css = {
			'display': 'grid',
			'grid-template-columns': `repeat(${cols}, 1fr)`,
			'overflow-x': 'scroll'
		}
		this.columnsStyle = css
	}
	
  }
}
</script>

<style lang="scss">
.venue_dynamic_list_container {
  width: 100%;
  height: 100%;
  display: block;
  
  .tab_content{
	position: sticky;
	top: 0;
	z-index: 99;
    background: #ffffff;
  }

  .tab_list {
    border-bottom: 1px solid #f2f2f2;
    // position: relative;
    // z-index: 100;
  }
  
  .multi_filter{
	  display: flex;
	  flex-direction: column;
  }

  .list_content {
	  
	  .list_empty {
		  width: 100%;
		  padding: 100rpx 0;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  font-size: 12px;
		  .image_empty {
			  width: 70%;
		  }
		  .empty_subject {
			font-size: 32rpx;
			color: #333; 
			// margin: 10rpx 0;
		  }
		  .empty_note {
			color: #999;  
		  }
	  }
	  
	  .select_but {
		text-align: center;
		width: 40%;
		background: #03A9F4;
		color: #fff;
		padding: 16rpx;
		margin-left: 30%;
		border-radius: 6rpx;
		margin-top: 50rpx;
	  }
  }
  
	.columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      // background: #050e17;
    }
	
	
	.flexwrap{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		// padding-left: 12rpx;
		padding-bottom: 10px;
		// justify-content: center;
	}
	
}
</style>
