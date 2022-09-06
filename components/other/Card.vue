
<template>
  <view class="Card-Layout">
    <view class="Card-Layout-Content" @click="con()" :style="{'background':otherStyle===undefined?'':otherStyle.fill,
			'padding':otherStyle===undefined?'':otherStyle.padding,
			'margin':otherStyle===undefined?'':otherStyle.margin,
			'border':otherStyle===undefined?'':otherStyle.stroke===undefined?'':otherStyle.stroke.lineWidth+' '+otherStyle.stroke.color+' solid',
			'box-shadow':otherStyle===undefined?'':otherStyle.shadow===undefined?'':otherStyle.shadow.x+' '+otherStyle.shadow.y+' '+otherStyle.shadow.radius+' '+otherStyle.shadow.radius+' '+otherStyle.shadow.color,
			'float':otherStyle===undefined?'':otherStyle.alignment==='center'?'':otherStyle.alignment,
			'color':otherStyle===undefined?'':otherStyle.color,
			'font':otherStyle===undefined?'':otherStyle.font,
			'textAlign':otherStyle===undefined?'':otherStyle.justify}">
			<view class="Card-Layout-Title" :style="{
				'width':otherStyle===undefined?'':otherStyle.title.width,
			'color':otherStyle===undefined?'':otherStyle.title.color,
			'background':otherStyle===undefined?'':otherStyle.title.fill,
			'padding':otherStyle===undefined?'':otherStyle.title.padding===undefined?'':otherStyle.title.padding,
			'margin':otherStyle===undefined?'':otherStyle.title.margin===undefined?'':otherStyle.title.margin,
			'textAlign':otherStyle===undefined?'':otherStyle.title.align,
			'font':otherStyle===undefined?'':otherStyle.title.font,
			'text-align':otherStyle===undefined?'':otherStyle.title.textAlign,
			'border-bottom': otherStyle===undefined?'2px solid #EEEEEE':otherStyle.title.line
			}"
			>{{title}}
			<span v-if="jump" @click="jumpUrl()" style="position: absolute;right: 5px;color: #1A5EB5;font-size: 14px;">{{jumpText}}</span>
			</view>
      <view class="Card-Layout-Child">
				<slot></slot>
			</view>
    </view>
  </view>
</template>

<script>
/* eslint-disable */
export default {
    name:"card",
    methods:{
			jumpUrl(){
				uni.navigateTo({
					url:'/pages'+this.url
				})
			},
			con(){
				
			}
    },
	data(){
	  return {
	  };
	},
    props:{
			url:String,
      title:{
        type:String
      },
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
    }
}
</script>

<style lang="scss">
.Card-Layout{
    width: 100%;
    overflow: hidden;
		// margin: 20px auto;
}
.Card-Layout-Content{
    width: 100%;
    margin: 0px auto;
    background: white;
    border-radius: 5px;
    padding: 0;
}
.Card-Layout-Title{
    width: auto;
		margin: 0 auto;
    padding:10px;
    font-size: 14px;
    font-weight: bolder;
		border-bottom: 2px solid #EEEEEE;
}
.Card-Layout-Child{
	font-size: 12px;
	// font-weight: bolder;
	overflow: hidden;
	height: auto;
}
</style>
