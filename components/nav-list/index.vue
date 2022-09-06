<template>
	<view :style="{'background':_get(config,'outStyle.background','')}">
		<view v-if="!groupTrue">
			<view v-for="(item,index) in list" :key="index">
				<view
				class="title" 
				:style="[_get(config,'itemGroupModule.container',{})]"
				>{{_get(item,'title','')}}</view>
				 <view 
					class="nav_list_container" 
					:style="[_get(config, 'outStyle', {})]"
					>
					  <block class="block"  v-for="(item1, index1) in _get(item, 'data', [])" :key="index1">
							<magic-item
								v-if="_get(config, 'itemModule.name') === 'MagicItem'"
								:item="item1"
								:container="_get(config,'itemModule.container')"
							/>
							
							<card-item
								  v-if="_get(config, 'itemModule.name') === 'CardItem'"
								  :item="item1"
								  :container="_get(config,'itemModule.container')"
								 >
							</card-item>
							
							<SubtitleCardItem 
								  v-if="_get(config, 'itemModule.name') === 'SubtitleCardItem'"
								  :item="item1"
								  :container="_get(config,'itemModule.container')"
								 >
							</SubtitleCardItem >
							
							<row-item
								v-if="_get(config, 'itemModule.name') === 'RowItem'"
								:item="item1"
								:container="_get(config,'itemModule.container')"
							>
							</row-item>
							
							<box-item
								v-if="_get(config, 'itemModule.name') === 'BoxItem'"
								:item="item1"
								:container="_get(config,'itemModule.container')"
							>
							</box-item>
					  </block>
				</view>
			</view>
		</view>
		
		<view v-else>
			 <view 
				class="nav_list_container" 
				:style="[_get(config, 'outStyle', {})]"
				>
				  <block class="block" v-for="(item,index) in list" :key="index">
						<magic-item
							v-if="_get(config, 'itemModule.name') === 'MagicItem'"
							:item="item "
							:container="_get(config,'itemModule.container')"
						/>
						
						<card-item
							  v-if="_get(config, 'itemModule.name') === 'CardItem'"
							  :item="item"
							  :container="_get(config,'itemModule.container')"
							 >
						</card-item>
						
						<SubtitleCardItem 
							  v-if="_get(config, 'itemModule.name') === 'SubtitleCardItem'"
							  :item="item"
							  :container="_get(config,'itemModule.container')"
							 >
						</SubtitleCardItem >
						
						<row-item
							v-if="_get(config, 'itemModule.name') === 'RowItem'"
							:item="item"
							:container="_get(config,'itemModule.container')"
						>
						</row-item>
						
						<box-item
							v-if="_get(config, 'itemModule.name') === 'BoxItem'"
							:item="item"
							:container="_get(config,'itemModule.container')"
						>
						</box-item>
				  </block>
			</view>
		</view>
	</view>
</template>

<script>
	import MagicItem from './navItem/MagicItem.vue'
	import CardItem from './navItem/CardItem.vue'
	import SubtitleCardItem from './navItem/SubtitleCardItem.vue'
	import RowItem from './navItem/RowItem.vue'
	import BoxItem from './navItem/BoxItem.vue'
	import _ from 'lodash'
    export default {
		components: {
			MagicItem,
			CardItem,
			SubtitleCardItem,
			BoxItem,
			RowItem
		},
        props: {
			title:String,
            config: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
		data(){
			return{
				titleIndex:[],
				list:[],
				groupTrue:false,
			}
		},
		mounted(){
			// console.log('this.config==',this.config)
			this.getList()
		},
        methods: {
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			getList(){
				this.groupTrue = this.config.list.every(item => !item.group)
				// console.log('this.groupTrue',this.groupTrue)
				if(this.groupTrue){
					this.list = this.config.list
				}else{
					this.config.list.map((item,index)=>{
						let obj = {}
						if(item.group){
							this.titleIndex.push(index)
							obj.title = item.group
							this.list.push(obj)
						} 
					})
					const length = this.titleIndex.length
					for(let i=0;i<length;i++){
						let data = this.getSplit(this.config.list,this.titleIndex[i],this.titleIndex[i+1])
						this.list[i].data = data
					}
				}
				// console.log('this.list==',this.list)
			},
			getSplit(arr,a,b){
				let arr1 = []
				arr1 = arr.slice(a+1,b)
				return arr1
			}
        }
    }
</script>

<style lang="less">
    .nav_list_container {
		width: 100%;
		display: grid;
		&>.block{
			margin: 0 auto;
		}
    }
	.title{
		padding: 20rpx 25rpx; 
	}

</style>
