// +----------------------------------------------------------------------
// | CCMiniCloud [ Cloud Framework ]
// +----------------------------------------------------------------------
// | Copyright (c) 2021 www.code942.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 明章科技
// +----------------------------------------------------------------------
 
/**
 * Notes: 路由配置文件
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-10-14 07:00:00
 */

module.exports = { 
	
	'test/test': 'TestController@test',   

	'home/setup': 'HomeController@getSetup',  
	'home/setup_all': 'HomeController@getSetupAll',  
 
	'info/list': 'InfoController@getInfoList',
	'info/my_list': 'MyController@getMyInfoList',
	'info/insert': 'InfoController@insertInfo',
	'info/my_detail': 'InfoController@getMyInfoDetail',
	'info/edit': 'InfoController@editInfo',
	'info/del': 'InfoController@delInfo', 
	'info/view': 'InfoController@viewInfo',
	'info/update_pic': 'InfoController@updateInfoPic',
 
	   
	'user/view': 'UserController@viewUser', 
	'user/my_detail': 'UserController@getMyDetail', 
	'user/detail': 'UserController@getUser', 
  
	  
	'passport/phone': 'PassportController@getPhone', 
	'passport/reg': 'PassportController@register',
	'passport/modify': 'PassportController@modifyBase',
	'passport/login': 'PassportController@login', 
	'passport/update_pic': 'PassportController@updatePic',

	'news/list': 'NewsController@getNewsList',
	'news/view': 'NewsController@viewNews', 
  

	//***########### ADMIN ################## */
	'admin/setup_edit': 'AdminController@setupEdit',  

	'admin/login': 'AdminController@adminLogin',
	'admin/home': 'AdminController@adminHome',
	'admin/user_list': 'AdminController@getUserList',
	'admin/user_detail': 'AdminController@getUserDetail',
	'admin/user_del': 'AdminController@delUser',
	'admin/user_status': 'AdminController@statusUser',

	'admin/info_list': 'AdminController@getInfoList',
	'admin/info_detail': 'AdminController@getInfoDetail',
	'admin/info_del': 'AdminController@delInfo',
	'admin/info_sort': 'AdminController@sortInfo',
	'admin/info_status': 'AdminController@statusInfo', 

 

	'admin/news_list': 'AdminController@getNewsList',
	'admin/news_insert': 'AdminController@insertNews',
	'admin/news_detail': 'AdminController@getNewsDetail',
	'admin/news_edit': 'AdminController@editNews',
	'admin/news_del': 'AdminController@delNews',
	'admin/news_update_pic': 'AdminController@updateNewsPic',
	'admin/news_sort': 'AdminController@sortNews',
	'admin/news_status': 'AdminController@statusNews',

}