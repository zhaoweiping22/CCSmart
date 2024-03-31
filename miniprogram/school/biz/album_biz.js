/**
 * Notes: 相册模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-11-14 07:48:00 
 */

const BaseCCMiniBiz = require('./base_ccmini_biz.js');
const ccminiCloudHelper = require('../helper/ccmini_cloud_helper.js');
const ccminiHelper = require('../helper/ccmini_helper.js');
const CCMINI_SETTING = require('../helper/ccmini_setting.js');

class AlbumBiz extends BaseCCMiniBiz {


	/**
	 * 表单初始化相关数据
	 */
	static initFormData(id = '') {

		return {
			id,

			// 分类
			typeOptions: AlbumBiz.TYPE_OPTIONS,

		 

			// 图片数据
			imgMax: CCMINI_SETTING.ALBUM_MAX_PIC,
			imgList: [], 

			// 表单数据 
			formTypeIndex: 0,
			formTitle: '',
			formContent: '', 
		}

	}
 
	static async updateAlbumPic(albumId, imgList) {
 
		imgList = await ccminiCloudHelper.transTempPics(imgList, CCMINI_SETTING.ALBUM_PIC_DIR, albumId);
 
		let params = {
			albumId: albumId,
			imgList: imgList
		}

		try { 
			let res = await ccminiCloudHelper.callCloudSumbit('album/update_pic', params);
			return res.data.urls;
		} catch (e) {}
	}

	/**
	 * 搜索菜单设置
	 */
	static getSearchMenu() {

		let sortItem1 = [{
			label: '综合排序',
			type: '',
			value: 0
		}];

		// 分类
		let sortItem2 = [{
			label: '所有分类',
			type: '',
			value: 0
		}];
		for (let k in AlbumBiz.TYPE_OPTIONS){
			sortItem2.push(
				{
					label: AlbumBiz.TYPE_OPTIONS[k],
					type: 'type',
					value: AlbumBiz.TYPE_OPTIONS[k],
				}
			)
		}   

		let sortItems = [sortItem2];
		let sortMenus = [{
				label: '最新',
				type: 'sort',
				value: 'new'
			},
			{
				label: '最热',
				type: 'sort',
				value: 'view'
			},   
			{
				label: '全部',
				type: '',
				value: ''
			}
		]

		return {
			sortItems,
			sortMenus
		}

	}
}
/**
 * 分类
 */
AlbumBiz.TYPE_OPTIONS = "同学时光,校园追忆,校友今夕,活动聚会,个人风采,其他".split(',');

//表单校验
AlbumBiz.CHECK_FORM = {
	title: 'formTitle|required|string|min:5|max:50|name=相册标题',
	type: 'formType|required|string|min:2|max:10|name=相册分类', 
	content: 'formContent|required|string|min:10|max:500|name=简要描述'
};

module.exports = AlbumBiz;