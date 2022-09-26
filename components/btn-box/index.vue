<template>
	<block>
		<view class="btn-box"  @click="handleAction()">
			<create-btn 
				v-if="getNewItemModuleKey() === 'createBtn'"
			/>
			<add-user-building-btn 
				v-if="getNewItemModuleKey() === 'addUserBuildingBtn'"
			/>
			<add-user-house-type-btn
				v-if="getNewItemModuleKey() === 'addUserHouseTypeBtn'"
			/>
			<add5-g-application-but 
				v-if="getNewItemModuleKey() === 'add5GApplicationBut'"
			/>
			<add-component-btn v-if="getNewItemModuleKey()==='addComponentBtn'"/>
		</view>
		
		<uni-popup ref="btnBoxPopup">
			<dynamic-list-popup
				:config="{
					...config,
					multiItemNavigation: config.multiItemNavigation
				}"
				@btnBoxPopupClose="onClosePopup"
			/>
		</uni-popup>
	</block>
</template>
<script>
	import _ from 'lodash'
	//popup 组件
	import dynamicListPopup from '../dynamic-list-popup/index.vue'
	
	import createBtn from './btns/createBtn.vue'
	import addUserBuildingBtn from './btns/addUserBuildingBtn.vue'
	import addUserHouseTypeBtn from './btns/addUserHouseTypeBtn.vue'
	
	//==========5G =========
	import add5GApplicationBut from './btns/add5GApplicationBut.vue'
	import { objToApiParams } from '../utils/compxTools.js'
	
	// =============vallation===============
	import addComponentBtn from "./btns/addComponentBtn.vue"
	
	
	export default {
		name: 'btnBox',
		components:{
			dynamicListPopup,
			createBtn,
			addUserBuildingBtn,
			addUserHouseTypeBtn,
			add5GApplicationBut,
			
			// =============vallation===============
			addComponentBtn
		},
		data(){
			return {
				type: ''
			}
		},
		props: {
			config: Object,
			newItemStateSetValue: Object
		},
		
		computed: {

		},
		methods: {
			getNewItemModuleKey () {
				const matchName = _.get(this.config, 'newItemModule')
				if(typeof matchName === 'string'){
					return matchName
				}else if(typeof matchName === 'object'){
					return _.get(matchName, 'name')
				}
			},
			handleAction(){
				this.type = _.get(this.config, 'newItemModule.type', '')
				if(this.type === 'popup'){
					this.$refs.btnBoxPopup.open('bottom')
				}else{
					this.goToPage()
				}
			},
			goToPage(){
				let pathUrl = `/pages${_.get(this.config, 'newItemNavigation', '')}`
				if(this.newItemStateSetValue && JSON.stringify(this.newItemStateSetValue) != '{}'){
					if(pathUrl.indexOf('?') != -1){
						pathUrl = `${pathUrl}&${objToApiParams(this.newItemStateSetValue)}`
					}else{
						pathUrl = `${pathUrl}?${objToApiParams(this.newItemStateSetValue)}`
					}
				}
				uni.navigateTo({
					url:pathUrl
				})
			},
			onClosePopup(){
					this.$refs.btnBoxPopup.close()
			},
		},
		mounted(){
		}
	}
</script>
<style lang="less" scoped>
	
</style>
