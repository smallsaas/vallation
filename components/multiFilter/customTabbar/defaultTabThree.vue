<template>
	<view>
		<view class="multi_filter_item">
			<text class="multi_filter_label_txt" v-if="label">
				{{label}}
			</text>
			<view class="multi_filter_list_content" :style="[{'width': `${tabListContainerWidth}px`}]">
				<tabbar :list="tabList" :binding="config.binding" :currentIndex="currentIndex" :outStyle="{backgroundColor: 'red'}"
					@selected="handleMultiTabSelect"/>
			</view>
		</view>
		<!-- <view style="border-bottom: 2rpx solid #EDEDED;display: flex;margin-left: 20px;"></view> -->
	</view>
</template>

<script>
	import _ from 'lodash'
	import tabbar from '../defaultTabbarTempThree.vue'
	export default {
		name: 'defaultTabThree',
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
				currentIndex: this.config.defaultIndex || 0,
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
				//获取label容器宽度
				// let labelWidth = 0
				// if(this.label){
				// 	const queryTabViewHeight = uni.createSelectorQuery().in(this);
				// 	queryTabViewHeight.select('.multi_filter_label_txt').boundingClientRect(data => {
				// 		console.log('data == ', data)
				// 		labelWidth = data.width
				// 	}).exec();
				// }
				
				// this.tabListContainerWidth = uni.getSystemInfoSync().windowWidth - labelWidth
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
				  url: `${this.$config.endpoint}${_.get(this.config, 'api')}`,
				  method: 'GET',
				  data: that.handleParams(),
				  header: {
				    Authorization: `Bearer ${uni.getStorageSync(`${that.$config.tokenStorageKey}`) || ''}`
				  },
				  complete: (res) => {
				    uni.hideLoading()
				    if (['000000', '00000', 200].includes(_.get(res, 'data.code'))) {
				      const data = _.get(res.data, that.config.response.list, [])
					  this.tabList = data
				      // this.$refs.loadRefresh.completed()
					  if(this.parentTargetField && JSON.stringify(this.parentTargetField) != '{}'){
						  if(this.tabList.length > 0){
							this.handleMultiTabSelect(0, this.getParentTargetValue())
						  }else{
							 this.handleMultiTabSelect(0, '')
						  }
					  }
				    }
				    // that.$forceUpdate()
				  }
				})
			},
			getParentTargetValue(){
				let convertObj = {}
				const bindingOjb = this.config.binding
				Object.keys(bindingOjb).map(key => {
					convertObj[bindingOjb[key]] = key
				})
				return this.tabList[0][convertObj.value]
			},
			handleParams(){
				const listSearch = {
					...this.parentTargetField
				}
				return listSearch
			},
			handleMultiTabSelect(index, value){
				this.currentIndex = index
				const typeField = {}
				typeField[_.get(this.config, 'field', '')] = value
				this.$emit('selected', typeField)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.multi_filter_item{
		display: flex;
		flex-direction: row;
		font-size: 26rpx;
		padding: 8rpx 16rpx 12rpx 16rpx;
		background-color: #ffffff;
		  
		.multi_filter_label_txt {
			min-width: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 12rpx;
			// font-weight: bold;
			color: #1E2128;
		}
		
		.multi_filter_list_content{
			  flex: 1;
		}
	}
</style>