<template>
	<view class="uni-list">
		<view class="title-content">
			<view class="cancel-btn" @click="onCencal">取消</view>
			<view class="ok-btn" @click="onOk">确认</view>
		</view>
		<view class="checkbox-content">
			<checkbox-group @change="checkboxChange">
				<label class="checkbox-item" v-for="(item, index) in originTypeList" :key="index">
					<checkbox color="#2C88D9" :value="item.type" style="border-radius: 50%;" :checked="item.checked" />
					<view>{{item.name}}</view>
				</label>
			</checkbox-group>
		</view>

		
	</view>
	
</template>

<script>
	import { formatApiParams } from '@/components/utils/compxTools.js'
	export default {
		name: "userTypePopup",
		components:{
		},
		props: {
			data: Object,
		},
		data() {
			return {
				originTypeList:[
					{ name: '房东', type: 16,  styles: {'backgroundColor': '#00b894', 'color': '#ffffff', checked: false} },
					{ name: '体验用户', type: 256,  styles: {'backgroundColor': '#fd79a8', 'color': '#ffffff', checked: false} },
					{ name: '供应商', type: 4,  styles: {'backgroundColor': '#fab1a0', 'color': '#ffffff', checked: false} },
					{ name: '置业顾问', type: 32,  styles: {'backgroundColor': '#0984e3', 'color': '#ffffff', checked: false} },
					{ name: '运维', type: 128,  styles: {'backgroundColor': '#ff7675', 'color': '#ffffff', checked: false} },
					{ name: '业务员', type: 1024,  styles: {'backgroundColor': '#00b800', 'color': '#ffffff', checked: false} }
				],
				indicatorStyle: `height: 50px;`,
				api: this.data.multiItemNavigation[0],
				getType: -1,
				currItem: {},
				userTypeList:[],
				selectData:[]
			}
		},
		computed:{
			init(){
				// console.log('item data = ', this.data.data.typeList)
				this.initData(this.data.data.typeList)
			}
		},
		methods: {
			initData(userTypeList){
				const uTypeList = userTypeList
				const oTypeList = this.originTypeList
				oTypeList.map(item => {
					if(uTypeList.includes(item.type) ){
						item.checked = true
					}else{
						item.checked = false
					}
				})
				this.originTypeList = oTypeList
				console.log(oTypeList)
				this.$forceUpdate()
			},
			checkboxChange(e){
				const oTypeList = this.originTypeList, values = e.detail.value
				oTypeList.map(item => {
					if(values.includes(item.type.toString())){
						item.checked = true
					}else{
						item.checked = false
					}
				})
				this.originTypeList = oTypeList
				console.log(this.originTypeList)
				this.$forceUpdate() 
				
			},
			onOk(){
				this.handleAPI()
			},
			onCencal(){
				this.$emit('cencalClosePop')
			},
			handleAPI(){
				let apiString = this.api
				const subMethod = apiString.split('/')[0]
				if(subMethod == 'PUT'){
					apiString = apiString.substring(subMethod.length, apiString.length)
					
					this.setUserType(apiString, subMethod)
				}else{
					//TODO
				}
			},
			//处理 update API
			handleUpdateData(api, data){
				const apiUrlString = api
				const apiUrl = apiUrlString.split('?')[0]
				const formatData = this.getQueryData(apiUrlString.split('?')[1], data)
				const obj = {
					api: apiUrl,
					query:formatData
				}
				return obj
			},
			//string 转换 object
			getQueryData(dataString, dataObj) {
				if (dataString) {
					const res = {}
					if (dataString.indexOf('&') != -1) {
						const dsArray = dataString.split('&')
						dsArray.map(item => {
							const dsItemArray = item.split('=')
							res[dsItemArray[0]] = dataObj[dsItemArray[1]]
						})
					} else {
						const dString = dataString.split('=')
						res[dString[0]] = dataObj[dString[1]]
					}
					return res
				} else {
					return {}
				}
			},
			
			setUserType(api, method){
				
				const selectedTypeList = []
				const apiPath = formatApiParams(api, this.data.data)
				console.log('yy',apiPath)
				console.log('hhh',this.data.data)
				this.originTypeList.map(item => {
					if(item.checked){
						selectedTypeList.push(item.type)
					}
				})
				
				if(!selectedTypeList && selectedTypeList.length <= 0){
					this.showTips('请选择用户类型')
					return
				}
				
				const query = {
					typeList: selectedTypeList
				}
				// console.log('apiPath == ', this.originTypeList)
				// console.log('apiPath == ', apiPath)
				// console.log('query == ', query)
				// console.log('method == ', method)
				// return 
				this.$api.updateUserCountType(apiPath, query, method).then(res => {
					// console.log('res === ', res)
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
			showTips(message, icon='none'){
				
				uni.showToast({
					title: message,
					icon: icon
				})
			}
		}
	}
</script>

<style lang="scss">

	.title-content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 45px;
		background-color: #fff;
		.cancel-btn{
			color: #888;
		}
		.ok-btn{
			color: #007aff;
		}
		
	}
	
	.picker-view {
		// width: 750rpx;
		height: 500rpx;
		margin-top: 20rpx;
	}
	
	.item {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
	.checkbox-content{
		display: flex;
		justify-content: center;
		.checkbox-item{
			display: flex;
			flex-direction: row;
			height: 40px;
			align-items: center;
			justify-content: flex-start;
			text-align: start;
		}
	}
	
	
</style>
