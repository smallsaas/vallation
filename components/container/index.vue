<template>
	<view :style="[_get(config, 'outStyle', {})]">
		<!-- 没有阴影的盒子区域 -->
		<view v-if="card" class="card">
			<view class="mainTitle" v-if="title">
				{{title}}
			</view>
			<view class="subTitle" v-if="subtitle">
				{{subtitle}}
			</view>
			<!-- <slot name="container_box" :type =" _get(config,'name','')"></slot> -->
<!-- 			<view class="child">
				<test v-if=" childType == 'test'" />
			</view> -->
		</view>
		
		<!-- 有阴影的盒子区域 -->
		<view v-if="box" class="box">
			<view class="mainTitle" v-if="title">
				{{title}}
			</view>
			<view class="subTitle" v-if="subtitle">
				{{subtitle}}
			</view>
			<view class="child">
				<test v-if=" childType == 'test'" />
			</view>
		</view>	
	</view>
</template>

<script>
	// import test from '@/pages/sub/componentPage/test.vue'
	export default{
		components:{
			// test
		},
		props: {
		    config: {
		        type: Object,
		        default: function () {
		            return {}
		        }
		    },
			
		},
		data(){
			return{
				title:'',
				subtitle:'',
				card:false,
				box:false,
				childType:'',
			}
		},
		mounted(){
			this.getData()
			console.log(this.subtitle)
		},
		methods:{
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			getData(){
				this.card = _.get(this.config,'card','') || this.card
				this.box = _.get(this.config,'box','') || this.box
				this.childType = _.get(this.config,'childType','')
				this.title = _.get(this.config,'title','') || this.title
				this.subtitle = _.get(this.config,'subtitle','') || this.subtitle
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.card{
		background-color: #ffffff;
		padding: 20rpx;
		border-radius: 16rpx;
	}
	.box{
		background-color: #ffffff;
		border-radius: 16rpx;
		padding: 20rpx;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
	}
	.mainTitle{
		font-size: 35rpx;
		font-weight: bold;
		padding: 20rpx 20rpx 10rpx;
	}
	.subTitle{
		font-size: 25rpx;
		padding: 10rpx 20rpx 10rpx;
	}
	.child{
		padding: 20rpx;
	}
</style>