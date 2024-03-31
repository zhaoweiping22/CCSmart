 # 技术交流 
- 开发交流，技术分享，问题答疑，功能建议收集，版本更新通知！！

 ![输入图片说明](https://gitee.com/minzonetech/CCSmartPhoto/raw/master/cc.png)

# 项目介绍


- 本小程序包括学校公告,服务通知,校园新闻,校园风光,校园活动,校历,课程表,失物招领,迎新服务,问卷调查,空闲教室,借阅报告,课堂印象等功能模块！
- 在这里，学生可以查看考勤，成绩，课表，校园活动等一系列基本应用，为丰富学生的校园生活，学生可以通过互动模块进行社交
- 创建表白主题：为便捷学生生活，学生可以失物招领，维修申请等解决校园生活问题；为解决学生课后疑问，提供课后问答模块
- 为大学老师技工快捷查找休闲教室，智能办公，管理学生，查询学生成绩，考勤，解答学生课后问题等一系列服务。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/102055_1d2389c1_9645159.png "设计.png")

# 功能说明
 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101448_8e4e43c8_9645159.jpeg "微校园 (2).jpeg")


# 技术运用

- 项目使用微信小程序平台进行开发。
- 使用腾讯云开发技术，免费资源配额，无需域名和服务器即可搭建。
- 小程序本身的即用即走，适合小工具的使用场景，也适合程序的开发。

# 项目效果截图
 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101510_78e1101a_9645159.png "首页.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101522_2102087a_9645159.png "服务.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101528_82b32369_9645159.png "互动.png")

 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101537_e1797af0_9645159.png "我的.png")


# 项目后台截图
![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101559_9b1d19f6_9645159.png "后台登录.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101607_d54aa863_9645159.png "后台首页.png")
 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101614_6f784ab4_9645159.png "用户管理.png")

# 部署教程：
### 0. 了解小程序云开发的基础知识
-  参考微信小程序官方文档：
- https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
- https://developers.weixin.qq.com/miniprogram/dev/wxcloud/quick-start/miniprogram.html

### 1 源码导入微信开发者工具
 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0814/112238_5cf31255_9297599.png "导入.png")
  

 

### 2 开通云开发环境
 -  参考微信官方文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
- 在使用云开发能力之前，需要先开通云开发。 
- 在开发者工具的工具栏左侧，点击 “云开发” 按钮即可打开云控制台，根据提示开通云开发，并且创建一个新的云开发环境。
![输入图片说明](https://images.gitee.com/uploads/images/2021/0811/232537_8a27b61c_9240987.png "云开发开通环境.png")
- 每个环境相互隔离，拥有唯一的环境 ID(拷贝此ID，后面配置用到)，包含独立的数据库实例、存储空间、云函数配置等资源；
 

#### 3 云函数及配置
- 本项目使用到了一个云函数school_cloud   
 

- 打开cloudfunctions/sport_cloud/comm/ccmini_config.js文件，配置后台管理员账号和密码

 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0911/150146_a9af88e5_9240987.png "设置管理员账号.png")

 
#### 4  上传云函数&指定云环境ID

 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101935_d116bfc6_9645159.png "上传到云.png")


#### 5  客户端配置
- 打开miniprogram/app.js文件，配置环境 ID

 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0811/232832_6053aae0_9240987.png "客户端配置.png")



#### 6  云函数配置
- 在微信开发者工具-》云开发-》云函数-》对指定的函数添加环境变量 
- [服务端时间时区TZ] =>Asia/Shanghai
- [函数内存] =>128M   
- [函数超时时间] => 20秒
 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0828/101840_a213d534_9645159.png "配置云函数.png")
 
 



### 至此完全部署配置完毕。

### 在线演示：
 

 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0811/233918_96b29222_9240987.jpeg "Free版-QR.jpg")


### 如有疑问，欢迎骚扰联系我鸭： 
### 俺的微信:  cclinux0730


