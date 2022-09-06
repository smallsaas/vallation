<template>
	<view class="content">
		<view class="select">
			<view class="cancel" @click="handleCancel()">取消</view>
			<view class="confirm"  @click="handleConfirm()">确定</view>
		</view>
		
		<!-- 多选 -->
		<block v-if="selectType == 'multiselect'">
			<checkbox-group @change="checkboxChange">
				<view v-for="(item,index) in originList" :key="index" class="radio_select">
				<checkbox :checked="item.checked || false"  color="#097bd0" :value="item.value" />
					{{item.optName}}
				</view>
			</checkbox-group>
		</block>
		
		<!-- 单选 -->
		<block v-if="selectType == 'select'">
			<radio-group @change="handleRadioChange">
				<view v-for="(item,index) in originList" :key="index" class="radio_select">
				<radio :checked="item.checked || false"  color="#097bd0" :value="item.value" />
					{{item.optName}}
				</view>
			</radio-group>
		</block>
		
		
	</view>
</template>

<script>
	import { formatApiParams } from '@/components/utils/compxTools.js'
	import {globalConfig} from '@/config.js'
	export default {
		props: {
			data: Object,
		},
		data(){
			return{
				originList:this.data.choices,
				useTypeList:[],
				selectType:this.data.selectType,
				api:this.data.multiItemNavigation[0]
				        
			}
		},
		created(){
			this.initData(this.data.data.typeList)
			console.log(this.selectType)
		},
		methods:{
			initData(userTypeList){
				const uList = userTypeList
				const oList = this.originList
				oList.map(item =>{
					console.log(item.value)
					if(uList.includes(item.value) ){
						item.checked = true
					}else{
						item.checked = false
					}
				})
				this.originList = oList
				this.$forceUpdate()
			},
			checkboxChange(e){
				const oTypeList = this.originList, values = e.detail.value
				oTypeList.map(item => {
					if(values.includes(item.value.toString())){
						item.checked = true
					}else{
						item.checked = false
					}
				})
				this.originList = oTypeList
				this.$forceUpdate()
			},
			handleRadioChange (e) {
			    const value = e.detail.value
				this.originList.map(item=>{
					if(item.value == value){
						item.checked = true
					}else{
						item.checked = false
					}
				})
				this.$forceUpdate()	
			},
			handleCancel(){
				this.$emit('closePop')
			},
			handleConfirm(){
				if(this.originList.every(x => !x.checked)){
					uni.showToast({
						title: '请至少选择一项数据',
						icon: 'none'
					})
					return
				}
				let apiString = this.api
				const subMethod = apiString.split('/')[0]
				if(subMethod == 'PUT'){
					apiString = apiString.substring(subMethod.length,apiString.length)
					this.setUserType(apiString,subMethod)
				}else{
					
				}
			},
			setUserType(api,method){
				const submitList = []
				const apiPath = formatApiParams(api,this.data.data)
				this.originList.map(x=>{
					if(x.checked){
						submitList.push(x.value)
					}
				})
				const query = {
					typeList : submitList
				}
				this.$api.updateUserCountType(apiPath,query,method).then(res=>{
					if(res.code === 200){
						
						this.showTips("操作成功", "success")
						
						setTimeout(() => {
							this.$emit('closePop')
						}, 1500)
						
					}else{
						this.showTips("操作失败", 'error')
					}
				})
			},
			
			showTips(message,icon='none'){
				uni.showToast({
					title:message,
					icon:icon
				})
			}

			
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 30rpx 25rpx;
		.select{
			display: flex;
			justify-content: space-between;
			.cancel{
				color:gray;
				font-size: 30rpx;
			}
			.confirm{
				color:#0984e3;
				font-size: 30rpx;
			}
		}
		.radio_select{
			padding: 10rpx;
			display: flex;
			align-items: center;
		}
	}
	
</style>