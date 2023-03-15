<template>
	<view>
    <VRPano
      :panolist="panolist"
      :defaultEntryid="0"
      :width="375"
      :height="500"
    />
    <view>
      内容区域
    </view>
  </view>
</template>

<script>
  import VRPano from '@/components/VRPano'
  export default {
    components: { VRPano },
    data () {
      return {
        panolist: [
          {
						name: 'keting',
						// src: 'https://sfy.hofo.co/assets/upload/8727d16d797bca9e5b5f41adae5699d0.jpeg',
            src: 'https://sfy.hofo.co/assets/upload/b4db36f84cabfbbcc9919388f758afb3.jpeg'
          },
          {
						name: 'canting',
						src: 'https://sfy.hofo.co/assets/upload/76c6684dcb6f5a932a2252312ee81304.png',
          }
        ]
      }
    }
  }
</script>
