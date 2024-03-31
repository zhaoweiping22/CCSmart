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
 * Notes: 互动模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-09-05 04:00:00
 * Version : CCMiniCloud Framework Ver 2.0.1 ALL RIGHTS RESERVED BY 明章科技
 */

const BaseCCMiniController = require('./base_ccmini_controller.js'); 
const InfoService = require('../service/info_service.js'); 
const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js'); 
const ccminiContentCheck = require('../framework/validate/ccmini_content_check.js'); 

class InfoController extends BaseCCMiniController {
 
	async getInfoList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			cate: 'string|name=分类条件',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'required|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new InfoService();
		let result = await service.getInfoList(input);

		// 数据格式化
		let list = result.list;
		for (let k in list) {

			// 过期
			if (list[k].INFO_EXPIRE_TIME < ccminiTimeUtil.time())
				list[k].timeout = 1;

		 

			list[k].INFO_ADD_TIME = ccminiTimeUtil.timestamp2Time(list[k].INFO_ADD_TIME, 'Y-M-D');
			list[k].INFO_EXPIRE_TIME = ccminiTimeUtil.timestamp2Time(list[k].INFO_EXPIRE_TIME);

			// 默认图片
			if (list[k].INFO_PIC && list[k].INFO_PIC.length > 0)
				list[k].INFO_PIC = list[k].INFO_PIC[0]['url'];
			else
				list[k].INFO_PIC = '';
		}
		result.list = list;

		return result;

	} 
	  
	async insertInfo() {
		// 数据校验
		let rules = {
			title: 'required|string|min:5|max:50|name=互动标题',
			type: 'required|string|min:2|max:10|name=互动分类',
			expireTime: 'required|date|name=有效期',
			region: 'required|array|len:3|name=有效区域',
			content: 'required|string|min:10|max:50000|name=详细介绍'

		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		await ccminiContentCheck.checkTextMultiClient(input);

		let service = new InfoService();
		let result = await service.insertInfo(this._userId, input);

		 

		return result;

	}
 
	async getMyInfoDetail() {
		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new InfoService();
		return await service.getMyInfoDetail(this._userId, input.id);

	}

	async editInfo() {
		// 数据校验
		let rules = {
			id: 'required|id',
			title: 'required|string|min:5|max:50|name=互动标题',
			type: 'required|string|min:2|max:10|name=互动分类',
			expireTime: 'required|date|name=有效期',
			region: 'required|array|len:3|name=有效区域',
			content: 'required|string|min:10|max:50000|name=详细介绍',
			desc: 'required|string|min:10|max:200|name=简介',

		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		await ccminiContentCheck.checkTextMultiClient(input);

		let service = new InfoService();
		let result = service.editInfo(this._userId, input);

	 

		return result;
	}

	async delInfo() {
		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new InfoService();
		let result = service.delInfo(this._userId, input.id);

	 

		return result;
	}
 
	async viewInfo() {
		// 数据校验
		let rules = {
			id: 'required|id',
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new InfoService();
		let info = await service.viewInfo(input.id);

		if (info) {
			// 显示转换 
			info.INFO_ADD_TIME = ccminiTimeUtil.timestamp2Time(info.INFO_ADD_TIME, 'Y-M-D');
			info.INFO_EXPIRE_TIME = ccminiTimeUtil.timestamp2Time(info.INFO_EXPIRE_TIME, 'Y-M-D');

			let area = info.INFO_REGION_PROVINCE;
			area += (info.INFO_REGION_CITY != '全部') ? ' ' + info.INFO_REGION_CITY : '';
			area += (info.INFO_REGION_COUNTY != '全部') ? ' ' + info.INFO_REGION_COUNTY : '';
			info.INFO_REGION = area;
		}

		return info;
	}

	/**
	 * 更新图片信息
	 * @returns 返回 urls数组 [url1, url2, url3, ...]
	 */
	async updateInfoPic() {
		// 数据校验
		let rules = {
			infoId: 'required|id',
			imgList: 'array'
		};

		// 取得数据
		let input = this.ccminiValidateData(rules);

		let service = new InfoService();
		return await service.updateInfoPic(input);
	}

}

module.exports = InfoController;