
<template>
	
	<view class="Card-Layout">
		<view class="Card-label"
			:style="{
				color: !otherStyle && !otherStyle.label.color ? '' : otherStyle.label.color
			}"
		>{{label}}</view>
		<view class="Card-Layout-Content"
			v-if="title"
			:style="{'background':otherStyle===undefined?'':otherStyle.fill,
				'padding': !otherStyle && !otherStyle.padding ? '' : otherStyle.padding,
				'margin': !otherStyle && !otherStyle.margin?'':otherStyle.margin,
				'border': !otherStyle && !otherStyle.stroke?'':otherStyle.stroke===undefined?'':otherStyle.stroke.lineWidth+' '+otherStyle.stroke.color+' solid',
				'box-shadow': !otherStyle && !otherStyle.shadow?'':otherStyle.shadow===undefined?'':otherStyle.shadow.x+' '+otherStyle.shadow.y+' '+otherStyle.shadow.radius+' '+otherStyle.shadow.radius+' '+otherStyle.shadow.color,
				'color': !otherStyle && !otherStyle.color?'':otherStyle.color,
				'font': !otherStyle && !otherStyle.font?'':otherStyle.font,
				'borderRadius': !otherStyle && !otherStyle.corner?'':otherStyle.corner,
				'textAlign': !otherStyle && !otherStyle.justify?'':otherStyle.justify}">
				<view class="Card-Layout-Title" :style="{
					'width': !otherStyle && !otherStyle.title.width?'':otherStyle.title.width,
					'color': !otherStyle && !otherStyle.title.color?'':otherStyle.title.color,
					'background': !otherStyle && !otherStyle.title.fill?'':otherStyle.title.fill,
					'padding': !otherStyle && !otherStyle.title.padding?'':otherStyle.title.padding===undefined?'':otherStyle.title.padding,
					'margin': !otherStyle && !otherStyle.title.margin?'':otherStyle.title.margin===undefined?'':otherStyle.title.margin,
					'textAlign': !otherStyle && !otherStyle.title.align?'':otherStyle.title.align,
					'border-bottom':  !otherStyle && !otherStyle.title.line?'':otherStyle.title.line,
					'fontSize':   !otherStyle && !otherStyle.title.font?'14px':otherStyle.title.font,
					'fontWeight':   !otherStyle && !otherStyle.title.weight?'':otherStyle.title.weight
				}"
		>{{title}} </view>
		<!-- <view class="Card-Layout-Child">
			<slot></slot>
		</view> -->
		</view>
	</view>
</template>

<script>
/* eslint-disable */
export default {
    name:"titleCard",
	data(){
	  return {
	  };
	},
    props:{
		label: String,
		title: String,
		jump:Boolean,
		jumpText:{
			type:String,
			default(){
				return "跳过"
			}
		},
		otherStyle:{
			title:{
				color:{
					type:String
				},
				fill:{
					type:String
				},
				padding:{
					type:String
				},
				margin:{
					type:String
				},
				align:{
					type:String
				},
				font:{
					type:String
				}
			},
			fill:{
			  type:String
			},
			padding:{
			  type:String
			},
			margin:{
			  type:String
			},
			stroke:{
			  color:{
				type:String
			  },
			  lineWidth:{
				type:String
			  }
			},
			shadow:{
			  radius:{
				type:String
			  },
			  color:{
				type:String
			  },
			  x:{
				type:String
			  },
			  y:{
				type:String
			  }
			},
			alignment:{
			  type:String
			},
			color:{
			  type:String
			},
			font:{
			  type:String
			},
			justify:{
			  type:String
			}
		}
    },
	methods:{
	},
}
</script>

<style lang="scss">
.Card-Layout{
    width: 100%;
    overflow: hidden;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #ffffff;
	padding: 10px 20px;
}

.Card-label{
	font-size: 13px;
	margin-right: 6px;
}

.Card-Layout-Content{
	// flex: 1;
    // margin: 0px auto;
    background: white;
    border-radius: 5px;
    padding: 0;
}
.Card-Layout-Title{
    width: auto;
		// margin: 0 auto;
    // padding:10px;
    font-size: 14px;
    font-weight: bold;
		// border-bottom: 2px solid #EEEEEE;
}
.Card-Layout-Child{
	font-size: 12px;
	// font-weight: bolder;
	overflow: hidden;
	height: auto;
}
</style>
