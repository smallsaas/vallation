<template>
	<view>
		<view v-for="(item, index) in multiFilter" >
			
			<default-tab
				v-if="getTypeName(item) === 'default'"
				:config="{
					...item,
					newItemState: newItemState,
					namespace: `${namespace}_${index}`
				}"
				@selected="handleDefaultTabSelect"
				@initNewItemState="initNewItemState"
				:key="index"
			/>
			
			<default-tab-two
				v-if="getTypeName(item) === 'defaultTwo'"
				:config="{
					...item,
					newItemState: newItemState,
					namespace: `${namespace}_${index}`
				}"
				:parentTargetField="parentTargetField"
				@selected="handleDefaultTwoTabSelect"
				@initNewItemState="initNewItemState"
				:key="index"
			/>
			
			<default-tab-three
				v-if="getTypeName(item) === 'defaultThree'"
				:config="{
					...item
				}"
				:parentTargetField="parentTargetField"
				@selected="handleDefaultTwoTabSelect"
				:key="index"
			/>
			
			<custom-input-search
				v-if="getTypeName(item) === 'customInputSearch'"
				:config="{
					...item,
					multiFilterModule: multiFilterModule
				}"
				@search="handleDefaultTwoTabSelect"
			/>
			
		</view>
	</view>
		
</template>

<script>
	import _ from 'lodash'
	import defaultTab from '@/components/multiFilter/customTabbar/defaultTab.vue'
	import defaultTabTwo from '@/components/multiFilter/customTabbar/defaultTabTwo.vue'
	import defaultTabThree from '@/components/multiFilter/customTabbar/defaultTabThree.vue'
	import customInputSearch from '@/components/multiFilter/customInputSearch/index.vue'
	export default {
		name: 'multiFilter',
		components: {
			defaultTab,
			defaultTabTwo,
			defaultTabThree,
			customInputSearch
		},
		props:{
			multiFilter:{
				type: Array,
				default: function(){
					return []
				}
			},
			multiFilterModule:{
				type: Object,
				default: function(){
					return {}
				}
			},
			newItemState:{
				type: Object,
				default: function(){
					return {}
				}
			},
			namespace:{
				type: String,
				default: function(){
					return ''
				}
			},
		},
		data(){
			return {
				parentTargetField:{}
			}
		},
		computed:{
			init(){
			},
		},
		mounted() {
		},
		methods:{
			//传参给底部弹出框
			initNewItemState(itemData){
				if(this.newItemState && JSON.stringify(this.newItemState) != '{}'){
					const stateObj = this.convertStateValue(itemData)
					this.$emit('newItemStateSetAction', stateObj)
				}
			},
			
			getTypeName(item){
				if(_.has(this.multiFilterModule, 'name')){
					return 'customInputSearch'
				}
				return _.get(item, 'type', 'default')
			},
			
			handleDefaultTabSelect(typeField, config, itemData){
				if(_.get(config, 'targetField')){
					this.parentTargetField[_.get(config, 'targetField')] = typeField[_.get(config, 'field')]
					this.$forceUpdate()
				}else{
					this.$emit('selected', typeField)
					if(this.newItemState && JSON.stringify(this.newItemState) != '{}'){
						const stateObj = this.convertStateValue(itemData)
						this.$emit('newItemStateSetAction', stateObj)
					}
				}
			},
			convertStateValue(itemData){
				const obj = {}
				for(var key in this.newItemState){
					obj[this.newItemState[key]] = itemData[key]
				}
				return obj
			},
			handleDefaultTwoTabSelect(typeField){
				this.$emit('selected', typeField)
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.multi_filter_item{
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		padding: 16rpx;
		  
		.multi_filter_label_txt {
			min-width: 85rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20rpx;
			font-weight: bold;
		}
		
		.multi_filter_list_content{
			  flex: 1;
		}
	}
</style>