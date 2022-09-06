<template>
	<view class="popup-content">
		
		<block v-if="config.name">
			<user-type-checkbox-popup
				v-if="_get('name') == 'userTypeCheckboxPopup'"
				:data="{
				  ...config
				}"
				@closePop="onClosePopup"
				@cencalClosePop="onCencalClosePopup"
				@onSelectItem="handleSelectItem"
			/>
		</block>
		
		<block v-if="config.choices && config.type">
				<multi-check-box
					v-if="_get('type')== 'multiCheckBox'"
					:data="{
					  ...config
					}"
					@closePop="onClosePopup"
				/>
		</block>
		 
		
		<!--  -->
		<block v-if="config.options">
			<view v-for="(popupItem, popupIndex) in config.options" :key="popupIndex">
				<popup-btn-item 
					:item="{
					  ...popupItem,
					  navigation: config.multiItemNavigation[popupIndex]
					}"
					@closePop="onClosePopup"
					v-if="handleExpect(popupItem)"
				/>
			</view>
		</block>
		
	</view>
</template>

<script>
	import _ from 'lodash'
	//popup 组件
	import popupBtnItem from './popupItem/btnItem.vue'
	import userTypeCheckboxPopup from './popupItem/custom/userTypeCheckboxPopup.vue'
	import multiCheckBox from './popupItem/custom/multiCheckBox.vue'
	export default {
		name:"dynamic-list-popup",
		components:{
			//default
			popupBtnItem,
			//custom
			userTypeCheckboxPopup,
			multiCheckBox
		},
		data() {
			return {
			};
		},
		mounted() {
			// console.log('popupConfig === ', this.config)
		},
		props:{
			config:{
				type: Object,
				default(){
					return {}
				}
			},
			
		},
		methods:{
			_get(field) {
			  return _.get(this.config, field, '')
			},
			// getItemType(){
			// 	return _.get(this.config,'type','')
			// },
			onClosePopup(){
				// 触发自定义事件
				this.$emit('dynamicListPopupClose','')
			},
			onCencalClosePopup(){
				this.$emit('dynamicListPopupCencalClose','')
			},
			handleSelectItem(){
				if(this.config.optionSelectType == 'multiselect'){
					
				}
			},
			handleExpect(item){
				if(_.get(item, 'expect')){
					const expectObj = _.get(item, 'expect')
					const data =  _.get(item, 'data')
					if(expectObj.value === data[expectObj.field]){
						return true
					}else{
						return false
					}
				}
				return true
			}
		}
	}
</script>

<style lang="less" scoped>
	.popup-content{
		padding: 20rpx;
		background-color: #ffffff;
	}
</style>
