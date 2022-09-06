<template>
	<view v-if="list.step&&list.active">
		<van-steps
			:active="list.active-1"
			active-icon="success"
			active-color="#38f"
		>
			<van-step v-for="(item,i) in list.step" :key="i">
				{{item.text}}
			</van-step>
		</van-steps>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		name:"Steps",
		data() {
			return {
				
			};
		},
		props:{
			list:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style>

</style>
