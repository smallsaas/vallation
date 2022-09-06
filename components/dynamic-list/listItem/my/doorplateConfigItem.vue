<template>
	
	<view class="doorplate-content">
		
		<view class="doorplate-number-list">
			<view v-for="(item, index) in unitList" :key="index" @click="showPopup(item)">
				<view class="list-item">{{item.unitCode}}</view>
			</view>
		</view>
		
		<!-- <view class="doorplate-number-list">
			<view v-for="(item, index) in doorplateList" :key="index">
				<view class="list-item">{{item.number}}</view>
			</view>
		</view> -->
		
		<uni-popup ref="popup" :isMaskClick="false">
			<view class="footer">
				<view class="title-content _between sticky">
					<view class="cancel-btn" @click="onCencal">取消</view>
					<view class="ok-btn" @click="onOk">确认</view>
				</view>
				<view class="title-content">
					选择目标楼层
				</view>
				<view class="choise-floor" @click="showChoiseFloorPopup">
					<view class="choise-item">
						开始楼层 <text class="text">{{startFloorValue}}</text>
					</view>
					<view class="choise-item">
						结束楼层 <text class="text">{{endFloorValue}}</text>
					</view>
				</view>
				<view class="title-content">
					选择要绑定的编号
				</view>
				<radio-group class="select_type_container">
					<view class="flex-row select-item"v-for="(item, index) in numList" :key="index" @click="handleRadioChange(item)">
						<radio :checked="item.checked || false" color="#097bd0" />
						<view class="radioName">{{item.name}}</view>
					</view>
				</radio-group>
				
				<!-- <button :class="[`btn delete-button`]"  @click="putDoorplateNum">
					<text>确认</text>
				</button> -->
			</view>
		</uni-popup>
		
		<uni-popup ref="choiseFloorPopup" :maskClick="closeChoiseFloorPopup">
			<view class="choise-floor-popup-content">
				<view class="title-content">
					<view class="cancel-btn flex-h-center">开始楼层</view>
					<view class="cancel-btn flex-h-center">结束楼层</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" :value="selectedDoorList" @change="bindChange" class="choise-floor-popup">
					<picker-view-column>
						<view class="choise-floor-popup-item" v-for="(item,index) in startFloors" :key="index">{{item+1}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="choise-floor-popup-item" v-for="(item,index) in endFloors" :key="index">{{item+1}}</view>
					</picker-view-column>
				</picker-view>
				<button :class="[`btn button`]"  @click="setSelectedDoorList">
					<text>确认</text>
				</button>
			</view>
			
		</uni-popup>
	</view>
	
</template>

<script>
	export default{
		name: 'doorplate',
		props:{
			item: Object
		},
		data(){
			return {
				currentIndex: 0,
				unitList: this.item.units,
				currentUnitId: '',
				doorplateList:[],
				numList: [
					{ id: '1', name: "01", checked: false},
					{ id: '2', name: "02", checked: false},
					{ id: '3', name: "03", checked: false},
					{ id: '4', name: "04", checked: false},
					{ id: '5', name: "05", checked: false},
					{ id: '6', name: "06", checked: false},
					{ id: '7', name: "07", checked: false},
					{ id: '8', name: "08", checked: false},
					{ id: '9', name: "09", checked: false},
					{ id: '10', name: "10", checked: false},
					{ id: '11', name: "11", checked: false},
					{ id: '12', name: "12", checked: false},
					{ id: '13', name: "13", checked: false},
					{ id: '14', name: "14", checked: false},
					{ id: '15', name: "15", checked: false},
				],
				binding:{
					unitNumber: 'name',
					id: 'value'
				},
                indicatorStyle: `height: 50px;`,
				startFloors:0,
				endFloors:0,
				startFloorValue:0,
				endFloorValue:0,
				selectedDoorList:[]
			}
		},
		computed:{
			init(){
				this.unitList = this.item.units
				// if(this.currentIndex >= 0){
				// 	// const list = this.unitList.filter(item => item.id === this.currentUnitId)
				// 	const list = [this.unitList[this.currentIndex]]
				// 	if(Array.isArray(list) && list.length > 0){
				// 		this.doorplateList = list[0].items
				// 		// setTimeout(() => {
				// 		// 	this.scrollIntoview()
				// 		// }, 200)
				// 	}else{
				// 		this.doorplateList = []
				// 	}
				// }
			}
		},
		mounted() {
		},
		methods:{
			// handleSelected(index, value){
			// 	this.currentIndex = index
			// 	this.currentUnitId = value
			// 	this.showPopup()
			// 	console.log('选中数据 == ', index, value)
			// },
			
			handleRadioChange (evt) {
				this.numList.map(item =>{
					item.checked = item.id == evt.id ? true : false
					return item
				})
			},
			putDoorplateNum(){
				console.log('this.selectedDoorList = ', this.selectedDoorList)
				if(this.selectedDoorList.length == 0){
					uni.showToast({
						title: "请选择目标楼层",
						icon:'none'
					})
					return
				}
				const value = this.numList.filter(item => item.checked == true)
				if(!value || value.length === 0){
					uni.showToast({
						title: "请选择要绑定的编号",
						icon:'none'
					})
					return
				}
				const query = { 
					unitNumber: value[0].name,
					startFloors: this.selectedDoorList[0]+1,
					endFloors: this.selectedDoorList[1]+1
				}
				this.$api.putDoorplateNum(this.currentUnitId, query).then(res => {
					if(res.code == 200){
						this.closePopup()
						this.$emit('refresh')
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
					}else{
						uni.showToast({
							title: res.message,
							icon:"none"
						})
					}
				})
			},
			showPopup(item){
				this.currentUnitId = item.id
				this.startFloors = item.floorsCount
				this.endFloors = item.floorsCount
				this.$refs.popup.open('bottom')
			},
			closePopup(){
				this.$refs.popup.close()
			},
			onOk(){
				this.putDoorplateNum()
			},
			onCencal(){
				// this.$emit('cencalClosePop')
				this.resetChoiseFloorInfo()
				this.closePopup()
			},
			showChoiseFloorPopup(){
				this.$refs.choiseFloorPopup.open('center')
			},
			closeChoiseFloorPopup(){
				this.selectedDoorList = []
				this.$refs.choiseFloorPopup.close()
			},
			bindChange(e) {
				const val = e.detail.value
				this.selectedDoorList = val
				console.log(val)
			},
			setSelectedDoorList(){
				
				if(this.selectedDoorList.length == 0){
					uni.showToast({
						title: "请选择目标楼层",
						icon:'none'
					})
					return
				}
				
				if(this.selectedDoorList.length > 0){
					if(this.selectedDoorList[0] > this.selectedDoorList[1]){
						uni.showToast({
							title: "结束楼层不得少于开始楼层",
							icon:'none'
						})
						return
					}
				}
				this.startFloorValue = this.selectedDoorList[0]+1 < 10 ? `0${this.selectedDoorList[0]+1}`: this.selectedDoorList[0]+1
				this.endFloorValue = this.selectedDoorList[1]+1 < 10 ? `0${this.selectedDoorList[1]+1}`: this.selectedDoorList[1]+1
				this.$refs.choiseFloorPopup.close()
			},
			resetChoiseFloorInfo(){
				this.startFloorValue = 0
				this.endFloorValue = 0
				this.selectedDoorList = []
				this.numList.map(item => item.checked = false)
			}
		}
	}
</script>

<style lang="scss">
	
	.doorplate-content{
		padding-top: 10px; 
		width: 100%;
		// display: flex;
		// flex-direction: column;
	}
	
	.tab-content{
		padding: 0px 20rpx;
	}
	
	.doorplate-number-list{
		display: flex;
		justify-content: row;
		flex-wrap: wrap;
		margin-top: 8px;
		justify-content: flex-start;
	}
	
	.list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #43505C;
		height: 50rpx;
		width: 114rpx;
		background-color: white;
		border: 2rpx solid #e6e6e6;
		font-size: 30rpx;
		font-weight: 600;
		margin: 4px 4px 0 4px;
	}
	
	.title-content{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 45px;
		background-color: #fff;
		
		.flex-h-center{
			flex: 1;
			display: flex;
			justify-content: center;
		}
		
		.cancel-btn{
			color: #888;
		}
		
		.ok-btn{
			color: #007aff;
		}
		
	}
	
	._between{
		justify-content: space-between;
	}
	
	.footer{
		padding: 0rpx 20rpx 10rpx 20rpx;
		background-color: #ffffff;
		height: 300px;
		border-top: 2rpx solid #e6e6e6;
		overflow-y: scroll;
		position: relative;
		
		.sticky{
			position: sticky;
			top: 0;
			z-index: 99;
		}
		
		
		
		.choise-floor{
			display: flex;
			flex-direction: row;
			.choise-item{
				font-size: 26rpx;
				color: #788896;
				border: 4rpx solid #CED4D9;
				padding: 4px 12px;
				border-radius: 20px;
				margin-right: 10px;
			}
			
			.text {
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 5px;
			}
		}
		
		.select_type_container {
			padding: 15rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			height: 200px;
		}
		
		.select-item{
			align-items: center;
			padding: 15rpx 25rpx;
		}
		
		.radioName{
			padding-left:10rpx;
			font-size: 35rpx;
		}
		
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
	
	.choise-floor-popup-content{
		background-color: #ffffff;
		padding-bottom: 20rpx;
	}
	
	.choise-floor-popup {
		width: 600rpx;
		height: 500rpx;
		// margin-top: 20rpx;
		
		.choise-floor-popup-item {
			// height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}
	}
	
	
</style>