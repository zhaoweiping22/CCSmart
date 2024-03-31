/**
 * Notes: 内容模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-11-14 07:48:00 
 */

const BaseCCMiniBiz = require('./base_ccmini_biz.js');
const ccminiCloudHelper = require('../helper/ccmini_cloud_helper.js');
const ccminiHelper = require('../helper/ccmini_helper.js');
const CCMINI_SETTING = require('../helper/ccmini_setting.js');

class InfoBiz extends BaseCCMiniBiz {


	/**
	 * 表单初始化相关数据
	 */
	static initFormData(id = '') {

		return {
			id,

			// 分类
			typeOptions: InfoBiz.TYPE_OPTIONS,

			// 有效期 
			expireStart: ccminiHelper.time('Y-M-D'),
			expireEnd: ccminiHelper.time('Y-M-D', CCMINI_SETTING.INFO_MAX_EXPIRE),

			// 图片数据
			imgMax: CCMINI_SETTING.INFO_MAX_PIC,
			imgList: [],


			// 表单数据 
			formTypeIndex: 0,
			formTitle: '',
			formContent: '',
			formExpireTime: ccminiHelper.time('Y-M-D'),
			formRegion: CCMINI_SETTING.INFO_DEFAULT_REGION
		}

	}

	/** 
	 * 图片上传
	 * @param {string} infoId 
	 * @param {Array} imgList  图片数组
	 */
	static async updateInfoPic(infoId, imgList) {
 
		imgList = await ccminiCloudHelper.transTempPics(imgList, CCMINI_SETTING.INFO_PIC_DIR, infoId);
 
		let params = {
			infoId: infoId,
			imgList: imgList
		}

		try { 
			let res = await ccminiCloudHelper.callCloudSumbit('info/update_pic', params);
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

		 

		let sortItems = [];
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
InfoBiz.TYPE_OPTIONS = "表白墙,课后回答,课堂印象,表白照片".split(',');

//表单校验
InfoBiz.CHECK_FORM = {
	title: 'formTitle|required|string|min:5|max:50|name=互动标题',
	type: 'formType|required|string|min:2|max:10|name=互动分类',
	expireTime: 'formExpireTime|required|date|name=有效期',
	region: 'formRegion|required|array|len:3|name=有效区域',
	content: 'formContent|required|string|min:10|max:50000|name=详细描述'
};

module.exports = InfoBiz;