  /**
   * Notes: 配置文件
   * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
   * Date: 2021-07-14 07:48:00 
   */
  module.exports = {
  	PROJECT_MARK: 'school',
  	PROJECT_COLOR: '#ffffff',
  	PROJECT_SWITCH: ['index_home', 'service', 'info_home', 'my_index'],
  	PROJECT_IS_SUB: false, // 分包
  	PROJECT_NAME: 'CC微校园',
  	PROJECT_VER: 'CCSchool-Client(V10 Build20210824)', //升级必须，请勿修改
  	PROJECT_NEWS_CATE: '学校公告,服务通知,校园新闻,校园风光,校园活动,校历,课程表,失物招领,迎新服务,问卷调查,空闲教室,借阅报告,课堂印象',

  	TEST_MODE: false,

  	TEST_OPEN_PAGES: true,

  	TEST_USER_ID: 'oYyk-minzonetech',
  	TEST_TOKEN: {
  		id: 'minzonetech',
  		name: '明章科技',
  		pic: '',
  		status: 1,
  		type: 1
  	},


  	IMG_UPLOAD_SIZE: 4, //图片上传大小M兆  

  	PASSPORT_TOKEN_EXPIRE: 86400,

  	ADMIN_TOKEN_EXPIRE: 3600 * 2,

  	CACHE_IS_LIST: true,
  	CACHE_LIST_TIME: 60 * 30,

  	USER_PIC_DIR: 'client/user/pic/', //用户头像图片目录   

  	INFO_PIC_DIR: 'client/info/pic/', //互动图片目录
  	INFO_MAX_EXPIRE: 86400 * 60, //互动有效期 秒
  	INFO_DEFAULT_REGION: ['广东省', '广州市', '越秀区'], //默认区域
  	INFO_MAX_PIC: 8, //互动图片上限

  	MEET_PIC_DIR: 'client/info/pic/', //活动图片目录 
  	MEET_DEFAULT_REGION: ['广东省', '广州市', '越秀区'], //默认区域
  	MEET_MAX_PIC: 8, //活动图片上限

  	ALBUM_PIC_DIR: 'client/album/pic/', //活动图片目录 
  	ALBUM_MAX_PIC: 8, //活动图片上限 

  	NEWS_PIC_DIR: 'client/news/pic/', //内容图片目录 
  	NEWS_MAX_PIC: 8, //内容图片上限 

  	CACHE_SETUP: 3600 * 10,

  }