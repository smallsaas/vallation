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
	import tabbar from '../defaultTabbar.vue'
	export default {
		name: 'defaultTab',
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
		},
		data(){
			return {
				label:'',
				labelWidth: 0,
				tabListContainerWidth: 0,
				tabList:[],
				currentIndex: 0
			}
		},
		computed:{
			init(){
				this.label = _.get(this.config, 'name', '')
				this.currentIndex = this.$cacheMap.get(`defaultTabeCurrentIndex_${this.config.namespace}`) || 0
				this.initData()
			},
		},
		mounted() {
			
		},
		methods:{
			initData(){
				
				// uni.showLoading({ title:'', mask: true })
				// console.log(this.formatLoadApi(_.get(this.config,'loadApi')),"loadAPi")
				let that = this
				uni.request({
				  url: `${this.$config.endpoint}${_.get(this.config, 'api')}`,
				  method: 'GET',
				  data: that.handleParams(),
				  header: {
				    Authorization: `Bearer ${uni.getStorageSync(`${that.$config.tokenStorageKey}`) || ''}`
				  },
				  complete: (res) => {
				    // uni.hideLoading()
				    if (['000000', '00000', 200].includes(_.get(res, 'data.code'))) {
				      const data = _.get(res.data, that.config.response.list, [])
					  that.tabList = data
				      // this.$refs.loadRefresh.completed()
					  
					  if(!that.config.targetField){
						  if(that.config.newItemState && JSON.stringify(that.config.newItemState) != '{}'){
							const itemData = data[0]
							this.$emit('initNewItemState', itemData)
						  }
					  }
					  
					  // if(that.config.targetField){
						  if(that.tabList.length > 0){
							that.handleMultiTabSelect(this.currentIndex, that.getInitValue(this.currentIndex))
						  }
					  // }
				    }
				    // that.$forceUpdate()
				  }
				})
			},
			handleParams(){
				const field = _.get(this.config, 'field', {})
				return {}
			},
			getInitValue(currentIndex){
				let convertObj = {}
				const bindingOjb = this.config.binding
				Object.keys(bindingOjb).map(key => {
					convertObj[bindingOjb[key]] = key
				})
				return this.tabList[currentIndex][convertObj.value]
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
				const cacheValue = `defaultTabeCurrentIndex_${namespace}`
				this.$cacheMap.set(cacheValue, index) 
				const multiFilterIndexList = this.$cacheMap.get('multiFilter_one_indexList') || []
				if(!multiFilterIndexList.includes(cacheValue)){
					multiFilterIndexList.push(cacheValue)
				}
				this.$cacheMap.set('multiFilter_one_indexList', multiFilterIndexList) 
				
				//清除二级tabbar缓存
				if(this.config.targetField){
					this.cleanMultiFilterCache('multiFilter_two_indexList')
				}
			},
			//清理multiFilter缓存
			cleanMultiFilterCache(cacheName){
				const multiFilterIndexList = this.$cacheMap.get(cacheName) || []
				console.log(`${cacheName} == `, multiFilterIndexList)
				if(multiFilterIndexList && multiFilterIndexList.length > 0){
					multiFilterIndexList.map(item => {
						this.$cacheMap.remove(item)
					})
					this.$cacheMap.remove(cacheName)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.multi_filter_item{
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		padding: 0rpx 16rpx 16rpx 16rpx;
		  
		.multi_filter_label_txt {
			min-width: 85rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20rpx;
			font-weight: bold;
			color: #999999;
		}
		
		.multi_filter_list_content{
			  flex: 1;
		}
	}
</style>