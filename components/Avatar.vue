<template>
	<view>
		<view @click="navigateTo()">
			<image :src="item.avatar||icon.defaultUser||''"></image>
			cs
		</view>
	</view>
</template>

<script>
	export default {
		name:"Avatar",
		data() {
			return {
				icon:{}
			};
		},
		props:{
			// 获取
			item:{
				type:Object,
				default:{}
			},
			avatarData:{
				type:Object,
				default:{}
			}
		},
		async created() {
			let iconList = await this.$api.getIcon()
			this.icon = iconList.data
		},
		methods:{
			navigateTo(){
				console.log("cs")
				uni.navigateTo({
					url:"/pages"+this.avatarData.navigator+"?id="+this.item.id,
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>

</style>
