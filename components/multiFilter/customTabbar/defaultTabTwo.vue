<template>
	<view class="multi_filter_item">
		<text class="multi_filter_label_txt" v-if="label">
			{{label}}
		</text>
		<view class="multi_filter_list_content" :style="[{'width': `${tabListContainerWidth}px`}]">
			<tabbar :list="tabList" :binding="config.binding" :currentIndex="currentIndex" :outStyle="{backgroundColor: 'red'}"
				@selected="handleMultiTabSelect"/>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	import tabbar from '../defaultTabbarTempTwo.vue'
	export default {
		name: 'defaultTabTwo',
		components: {
			tabbar,
		},
		props:{
			config:{
				type: Object,
				default: function(){
					return {}
				}
			},
			parentTargetField:{
				type: Object,
				default:function(){
					return {}
				}
			}
		},
		data(){
			return {
				label:'',
				labelWidth: 0,
				tabListContainerWidth: 0,
				tabList:[],
				currentIndex: 0,
			}
		},
		watch:{
			parentTargetField(){
				this.initData()
			}
		},
		computed:{
			init(){
				this.label = _.get(this.config, 'name', '')
				this.currentIndex = this.$cacheMap.get(`defaultTabeTwoCurrentIndex_${this.config.namespace}`) || 0
				this.initData()
			},
		},
		mounted() {
		},
		methods:{
			initData(){
				
				uni.showLoading({ title:'', mask: true })
				// console.log(this.formatLoadApi(_.get(this.config,'loadApi')),"loadAPi")
				let that = this
				uni.request({
				  url: `${that.$config.endpoint}${_.get(that.config, 'api')}`,
				  method: 'GET',
				  data: that.handleParams(),
				  header: {
				    Authorization: `Bearer ${uni.getStorageSync(`${that.$config.tokenStorageKey}`) || ''}`
				  },
				  complete: (res) => {
				    uni.hideLoading()
				    if (['000000', '00000', 200].includes(_.get(res, 'data.code'))) {
				      const data = _.get(res.data, that.config.response.list, [])
					  that.tabList = data
				      // that.$refs.loadRefresh.completed()
					  if(!that.config.targetField){
						  if(that.config.newItemState && JSON.stringify(that.config.newItemState) != '{}'){
							const itemData = data[this.currentIndex]
							this.$emit('initNewItemState', itemData)
						  }
					  }
					  
					  if(that.parentTargetField && JSON.stringify(that.parentTargetField) != '{}'){
						  if(that.tabList.length > 0){
							that.handleMultiTabSelect(this.currentIndex, that.getParentTargetValue(this.currentIndex))
						  }else{
							 that.handleMultiTabSelect(this.currentIndex, '')
						  }
					  }
				    }
				    // that.$forceUpdate()
				  }
				})
			},
			getParentTargetValue(currentIndex){
				let convertObj = {}
				const bindingOjb = this.config.binding
				Object.keys(bindingOjb).map(key => {
					convertObj[bindingOjb[key]] = key
				})
				return this.tabList[currentIndex][convertObj.value]
			},
			handleParams(){
				const listSearch = {
					...this.parentTargetField
				}
				return listSearch
			},
			handleMultiTabSelect(index, value){
				this.currentIndex = index
				//记录当前选中索引
				this.saveMultiFilterIndexCache(index, this.config.namespace)
				//
				const itemData = this.tabList[index]
				const typeField = {}
				typeField[_.get(this.config, 'field', '')] = value
				this.$emit('selected', typeField, this.config, itemData)
				
				
			},
			saveMultiFilterIndexCache(index, namespace){
				const cacheValue = `defaultTabeTwoCurrentIndex_${namespace}`
				this.$cacheMap.set(cacheValue, index) 
				const multiFilterIndexList = this.$cacheMap.get('multiFilter_two_indexList') || []
				if(!multiFilterIndexList.includes(cacheValue)){
					multiFilterIndexList.push(cacheValue)
				}
				this.$cacheMap.set('multiFilter_two_indexList', multiFilterIndexList) 
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.multi_filter_item{
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		padding: 0rpx 16rpx 12rpx 16rpx;
		  
		.multi_filter_label_txt {
			min-width: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 12rpx;
			font-weight: bold;
			color: #999999;
		}
		
		.multi_filter_list_content{
			  flex: 1;
		}
	}
</style>