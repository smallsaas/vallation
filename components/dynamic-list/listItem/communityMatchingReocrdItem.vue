<!-- 社区换房匹配记录 -->
<template>
	<view class="base">
		<uni-table>
			<uni-tr>
				<uni-th align="center" width="170rpx">回迁房号</uni-th>
				<uni-th align="center" width="170rpx">匹配房号</uni-th>
				<uni-th align="center" width="170rpx">权益人</uni-th>
				<uni-th align="center" width="170rpx">权益人手机号</uni-th>
				<uni-th align="center" width="170rpx">匹配人</uni-th>
				<uni-th align="center" width="170rpx">匹配人手机号</uni-th>
				<uni-th align="center" width="260rpx">日期</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) of records" :key="item.id">
				<uni-td align="center"><view class="matched-title">{{item.ownerBuilding}}-{{item.ownerNumber}}</view></uni-td>
				<uni-td align="center"><view class="matched-title">{{item.matchedBuilding}}-{{item.matchedNumber}}</view></uni-td>
				<uni-td align="center" v-if="item.ownerRealName"><view class="matched-title" >{{item.ownerRealName}}</view></uni-td>
				<uni-td align="center" v-else><view class="matched-title">{{item.ownerName}}</view></uni-td>
				<uni-td align="center" ><view class="matched-title">{{item.ownerPhone || '-'}}</view></uni-td>
				<uni-td align="center" v-if="item.matchedRealName"><view class="matched-title">{{item.matchedRealName}}</view></uni-td>
				<uni-td align="center" v-else><view class="matched-title">{{item.matchedName}}</view></uni-td>
				<uni-td align="center" ><view class="matched-title">{{item.matchedPhone || '-'}}</view></uni-td>
				<uni-td align="center"><view class="matched-title">{{getCreateTime(item)}}</view></uni-td>
			</uni-tr>
		</uni-table>
	</view>
	
</template>

<script>
	export default {
		name: 'communityMatchingReocrdItem',
		props: {
			item: Object
		},
		data() {
			return {
				records: this.item.records,
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		computed:{
			init(){
				console.log(this.item)
				this.records = this.item.records || []
			}
		},
		methods: {
			getCreateTime(item){
				let createTime = item.createTime
				let Time = createTime.substr(0,createTime.indexOf(' '))
				return Time
			}
		}
	}
</script>

<style>
	.base {
		display: flex;
		flex-direction: column;
		padding: 10rpx;
	}
	.matched-list {
		display: flex;
		align-items: center;
		padding: 10rpx 0rpx;
	}
	.houseNumber-box {
		flex: 1;
		align-items: center;
		font-size: 30rpx;
	}
	.name-box {
		flex: 1;
		align-items: center;
		font-size: 30rpx;
	}
	.create-date {
		flex: 1;
		align-items: center;
		font-size: 25rpx;
		color: #707070;
	}
	.matched-title-box {
		display: flex;
	}
	.matched-title {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
	}
</style>