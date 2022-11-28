<template>
	<view class="bulleList">
		<view class="bulle-icon">
			<image class="bulle-icon-c" :src="formatIconUrl(icon, iconStyle)" />
		</view>
		<view class="bulle-txt" :style="[textStyle || {}]" v-for="(bulleItem, bulleIndex) in list" :key="bulleIndex">
			{{bulleItem.propDefaultValue}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			icon:{
				type: String,
				default:function(){
					return 'https://static.smallsaas.cn/house/2022/svg/bullet-icon.svg'
				}
			},
			iconStyle:{
				type: String,
				default:function(){
					return 'E4372F'
				}
			},
			textStyle:{
				type: Object,
				default:function(){
					return {}
				}
			},
			list: Array,
		},
		computed:{
			init(){
			}
		},
		data(){
			return {
				bulleList:[]
			}
		},
		methods:{
			//处理图片路劲
			formatIconUrl(url, color){
				if(color){
					return `${url}?color=${color}`
				}
				return url
			},
		}
	}
</script>

<style lang="scss">
	.bulleList {
		
		display: flex;
		flex-direction: row;
		// align-items: center;
		
		.bulle-icon{
			// display: flex;
			// align-items: flex-start;
			width: 10px;
			// height: 100%;
			margin-right: 5px;
			margin-left: 10px;
			
			.bulle-icon-c{
				width: 10px;
				height: 10px;
			}
		}
		
		.bulle-txt{
			flex: 1;
		}
	}
</style>