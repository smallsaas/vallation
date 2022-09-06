<template>
    <view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
        <view class="tabbar-item"
            v-for="(item, index) in list" 
            :key="index" 
            @click="tabbarChange(item.path)"
        >
            <cover-image class="item-img" :src="item.icon_a" v-if="current == index"></cover-image>
            <cover-image class="item-img" :src="item.icon" v-else></cover-image>
            <view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}</view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        current: String,
		list: Array
    },
    data() {
        return {
            paddingBottomHeight: 0,  //苹果X以上手机底部适配高度
            list: []
        };
    },
    created() {
        let that = this;
        uni.getSystemInfo({
            success: function (res) {
                let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
                model.forEach(item => {
                    //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
                    if(res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
                        that.paddingBottomHeight = 40;
                    }
                })
            }
        });
    },
    watch: {
        
    },
    methods: {
        tabbarChange(path) {
            // this.$pageTo.toTab(path);
            uni.switchTab({
                url: path,
				success:res =>{
					// console.log("跳转成功")
				},
				fail:err =>{
					// console.log("跳转失败", err)
					if(err.errMsg === "switchTab:fail can not switch to no-tabBar page"){
						uni.navigateTo({
							url: path
						})
					}
				}
            })
        }
    }
};
</script>

<style lang="scss" scoped>
    .tabbarActive{
        color: #2A82E4 !important;
    }
    .tabbar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100rpx;
        background-color: #ffffff;
        display: flex;
        justify-content: space-around;
        align-items: center;
		border: 2rpx solid #E5E5E5;
        .tabbar-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100rpx;
            .item-img{
                width: 46rpx;
                height: 46rpx;
                margin-bottom: 4rpx;
            }
            .item-name{
                font-size: 26rpx;
                color: #A3A3A3;
            }
        }
    }
</style>