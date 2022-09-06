<template>
	<view class="top-box" >
		<view class="top-box-inner"  :style="[_get(config,'outStyle',{})]">
			<view class="after" :style="[_get(config, 'container', {})]"></view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default{
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
			}
		},
		methods:{
			// 获取对象中的属性
			_get (data, field, defaultValue) {
				return _.get(data, field, defaultValue) || ''
			},
			}
	}
	
</script>

<style lang="scss" scoped>
	.top-box{
		overflow: hidden;
		}
	.top-box-inner{
		width: 100%;
		height: 240px;
		position: relative;
		}
	.after{
		width: 140%;
		height: 240px;
		position: absolute;
		left: -20%;
		top: 0;
		border-radius: 0 0 50% 50%;
		background-color: black;
		}
</style>