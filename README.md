# vallation
筑垒 小程序

# 标准组件使用手册
该手册记录目前在使用的全部小程序标准组件 <br>
组件使用框架：vue2 <br>
<br>
<br>

## 组件放置位置
git@github.com:smallsaas/vallation.git <br>
<br>
<br>

## 如何在项目中使用
**目前使用方法是直接引用组件，之后可以配置成统一导出** <br>
<br>

*打开项目的package.json，在dependencies中添加依赖* <br>
"dependencies": { <br>
    "auto-wx-card": "*",<br>
    "auto-wx-card-moments": "*", <br>
    "auto-wx-rss": "*" <br>
  } <br>

*安装依赖* <br>
npm install <br>

*组件中直接引用，所需组件均在 <包名>/src/components/ 下* <br>
import SubjectItem from 'auto-wx-card/src/components/SubjectItem.vue' <br>
<br>
<br>

## 创建一个组件库
**该配置方式只支持直接引用组件方式** <br>
<br>

*终端执行构建项目* <br>
vue init webpack-simple <项目名称> <br>
<br>

*然后按照终端提示继续操作即可* <br>
<br>

*安装依赖，推荐使用淘宝源* <br>
npm install <br>
<br>

*把项目跑起来测试一下* <br>
npm run dev  <br>
<br>

*成功跑起来后，就可以开始配置了* <br>
*在根目录创建index.js文件，因为我们暂时是直接使用组件导出的，就先不配置了* <br>
<br>

*修改package.json* <br>
package.json { <br>
    "private": false // 设为非私有的 <br>
    "main": "./dist/<项目名称>.js" <br>
} <br>
<br>

*修改webpack.config.js* <br>
webpack.config.js { <br>
    var path = require('path') <br>
    var webpack = require('webpack') <br>
    const NODE_ENV = process.env.NODE_ENV  //新增 <br>
<br>
    module.exports = { <br>
        entry: 'development' ? './src/main.js' : './index.js', //修改 <br>
        output: { <br>
            path: path.resolve(__dirname, './dist'), <br>
            publicPath: '/dist/', <br>
            filename: '项目名称.js',  //修改 <br>
            library: '项目名称',  //新增 <br>
            libraryTarget: 'umd',  //新增 <br>
            umdNamedDefine: true  //新增 <br>
  }<br>
}<br>
<br>

*修改index,html，因为我们通过上方的output修改了filename所以引用的文件也需要修改* <br>
在index.html找到 `<script src="/dist/build.js"></script>` 将build.js修改为上方filename所配置的名称即可 <br>
<br>

*到此，项目就配置完成了，执行打包即可* <br>
npm run build <br>
<br>
<br>

## 如何发布到npmjs仓库
### 1.从github中克隆项目，需要指定分支拉取
git clone -b <分支名> git@github.com:smallsaas/vallation.git <br>
分支名使用的是npm的包名：<br>
auto-wx-card <br>
auto-wx-card-moments <br>
auto-wx-rss <br>

### 2.修改

### 3.发布到npmjs.com
*首先查看自己的npm源是否是官方源，否则会登录失败* <br>
npm config get registry （查看npm镜像源地址）<br>
npm config set registry https://registry.npmjs.org/ （默认npm源）<br>
npm config set registry https://registry.npm.taobao.org/ （淘宝镜像源）<br>
<br>

*登录命令* <br>
npm login <br>
<br>

*登录显示内容如下，按终端提示输入即可* <br>
( <br>
    Log in on https://registry.npmjs.org/ <br>
    Username:  // 用户名 <br>
    Password:  // 密码 <br>
    Email: (this IS public)  // 邮箱 <br>
    Enter one-time password:  // 双因素身份验证 (2FA)，发送到邮箱的验证码 <br>
    Logged in as xxx on https://registry.npmjs.org/. <br>
) <br>
<br>

*登录成功后，需要更新你的npm包的版本，然后发布* <br>
*根据此次修改选择合适的命令即可* <br>
( <br>
    // patch：补丁号，修复bug，小变动，如v1.0.0 -> v1.0.1 <br>
    npm version patch <br>
    <br>
    // minor：次版本号，增加新功能，如v1.0.0 -> v1.1.0 <br>
    npm version minor <br>
    <br>
    // major：主版本号，不兼容的修改，如v1.0.0 -> v2.0.0 <br>
    npm version major <br>
) <br>
<br>
*然后发布* <br>
npm publish <br>
<br>
<br>

## 分类

### 1、[auto-wx-rss（页面内容编辑）](https://gitee.com/smallsaas/auto-render/blob/master/组件分类管理/RSS组件%5Brss%5D.md#rss内容展示标准组件)
bulles <br>
fontText <br>
images <br>
link <br>
paragraph <br>
price <br>
richText <br>
space <br>
table <br>
tages <br>
toggleSwitchButton <br>
uploadImage <br>

### 2、[auto-wx-card（卡片组件）](https://gitee.com/smallsaas/auto-render/blob/master/组件分类管理/卡片组件%5Bcard%5D.md#卡片标准组件)
BoxItem： 统计数字在上，标题在下的统计项，无路由属性, 有数据值格式<br>
CardItem： 一个图标在左，标题再右的路由导航栏<br>
MagicItem： 一个图标在上，标题在下的路由导航栏<br>
RowItem： 一个图标在左侧, 紧靠标题, 右侧是箭头<br>
SubtitleCardItem： 同CardItem, 有副标题属性的路由导航栏<br>
ToggleItem： 用于设置项<br>
SubjectItem： 左右靠展示信息的组件, 较通用, 右侧通常用于展示状态, 切换操作, 小按钮列表靠右上角从右开始排列<br>

### 3、auto-wx-card-moments
ResourcingItem <br>
MomentsItem <br>
BoardItem <br>

### 4、auto-wx-c-search（搜索组件 (c-代表元组））
