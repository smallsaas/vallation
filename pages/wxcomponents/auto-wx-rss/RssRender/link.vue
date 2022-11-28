<template>
	<view class="link" @click="goBrowseWebsite()">
		{{this.title}}
	</view>
</template>

<script>
	export default {
		props:{
			text: String,
			url: String
		},
		computed:{
			init(){
				this.title = this.text || '-'
				this.path = this.url || ''
			}
		},
		data(){
			return {
				title:'',
				path: ''
			}
		},
		methods:{
			//跳转至webview浏览网址
			goBrowseWebsite(){
				if(this.pathe){
					uni.navigateTo({
						url:`/pages/sub/rss/webview?url=${encodeURIComponent(this.path)}`
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	//链接样式
	.link {
		font-size: 36rpx;
		color: blue;
		text-decoration: underline;
	}
</style>