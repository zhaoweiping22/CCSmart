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
 * Notes: 互动模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-10-14 07:48:00 
 */

const BaseCCMiniService = require('./base_ccmini_service.js');
const ccminiDbUtil = require('../framework/database/ccmini_db_util.js');
const ccminiUtil = require('../framework/utils/ccmini_util.js');
const ccminiStrUtil = require('../framework/utils/ccmini_str_util.js');
const ccminiTimeUtil = require('../framework/utils/ccmini_time_util.js');
const ccminiCloudUtil = require('../framework/cloud/ccmini_cloud_util.js');
const InfoModel = require('../model/info_model.js');
const UserModel = require('../model/user_model.js');

class InfoService extends BaseCCMiniService {


	async updateInfoPic({
		infoId,
		imgList
	}) {

		let newList = await ccminiCloudUtil.getTempFileURL(imgList);

		let info = await InfoModel.getOne(infoId, 'INFO_PIC');

		let picList = await ccminiCloudUtil.handlerCloudFiles(info.INFO_PIC, newList);

		let data = {
			INFO_PIC: picList
		};
		await InfoModel.edit(infoId, data);

		let urls = ccminiStrUtil.getArrByKey(picList, 'url');

		return {
			urls
		};

	}

	async insertInfo(userId, {
		title,
		content,
		type,
		expireTime,
		region
	}) {

		let where = {
			INFO_TITLE: title,
			INFO_USER_ID: userId,
		}
		if (await InfoModel.count(where))
			this.ccminiAppError('该标题已经存在');

		// 赋值 
		let data = {};
		data.INFO_TITLE = title;
		data.INFO_CONTENT = content;
		data.INFO_TYPE = type;
		data.INFO_DESC = ccminiStrUtil.fmtText(content, 100);

		data.INFO_EXPIRE_TIME = ccminiTimeUtil.time2Timestamp(expireTime + ' 23:59:59');
		data.INFO_REGION_PROVINCE = region[0];
		data.INFO_REGION_CITY = region[1];
		data.INFO_REGION_COUNTY = region[2];

		data.INFO_USER_ID = userId;

		let id = await InfoModel.insert(data);

		//  异步统计
		this.statUserInfoCnt(userId);

		return {
			id
		};
	}

	async editInfo(userId, {
		id,
		title,
		content,
		desc,
		type,
		expireTime,
		region
	}) {

		let where = {
			INFO_TITLE: title,
			INFO_USER_ID: userId,
			_id: ['<>', id]
		}
		if (await InfoModel.count(where))
			this.ccminiAppError('该标题已经存在');

		// 赋值 
		let data = {};
		data.INFO_TITLE = title;
		data.INFO_CONTENT = content;
		data.INFO_TYPE = type;
		data.INFO_DESC = ccminiStrUtil.fmtText(desc, 100);

		data.INFO_REGION_PROVINCE = region[0];
		data.INFO_REGION_CITY = region[1];
		data.INFO_REGION_COUNTY = region[2];

		data.INFO_EXPIRE_TIME = ccminiTimeUtil.time2Timestamp(expireTime + ' 23:59:59');

		await InfoModel.edit(id, data);
	}

	async delInfo(userId, id) {
		let where = {
			INFO_USER_ID: userId,
			_id: id
		}

		let info = await InfoModel.getOne(where, 'INFO_PIC');
		if (!info) return;

		await InfoModel.del(where);

		let cloudIds = ccminiStrUtil.getArrByKey(info.INFO_PIC, 'cloudId');
		ccminiCloudUtil.deleteFiles(cloudIds);

		this.statUserInfoCnt(userId);

		return;
	}

	async viewInfo(id) {

		let fields = 'INFO_TITLE,INFO_CONTENT,INFO_TYPE,INFO_REGION_PROVINCE,INFO_REGION_CITY,INFO_REGION_COUNTY,INFO_EXPIRE_TIME,INFO_PIC,INFO_ADD_TIME,INFO_USER_ID,INFO_VIEW_CNT';

		let where = {
			_id: id,
			INFO_STATUS: InfoModel.STATUS.COMM
		}
		let info = await InfoModel.getOne(where, fields);
		if (!info) return null;

		info.USER_DETAIL = await this.getUserOne(info.INFO_USER_ID);

		InfoModel.inc(id, 'INFO_VIEW_CNT', 1);

		return info;
	}

	async getMyInfoDetail(userId, id) {
		let fields = 'INFO_TITLE,INFO_CONTENT,INFO_TYPE,INFO_REGION_PROVINCE,INFO_REGION_CITY,INFO_REGION_COUNTY,INFO_EXPIRE_TIME,INFO_PIC';

		let where = {
			INFO_USER_ID: userId,
			_id: id
		}
		let info = await InfoModel.getOne(where, fields);
		if (!info) return null;

		if (info) {
			info.INFO_EXPIRE_TIME = ccminiTimeUtil.timestamp2Time(info.INFO_EXPIRE_TIME, 'Y-M-D');
		}

		let urls = ccminiStrUtil.getArrByKey(info.INFO_PIC, 'url');
		info.INFO_PIC = urls;

		return info;
	}

	async getInfoList({
		search,
		cate = '',
		sortType,
		sortVal,
		orderBy,
		whereEx,
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'INFO_ORDER': 'asc',
			'INFO_ADD_TIME': 'desc'
		};
		let fields = 'INFO_TITLE,INFO_EXPIRE_TIME,INFO_REGION_PROVINCE,INFO_REGION_CITY,INFO_REGION_COUNTY,INFO_ADD_TIME,INFO_DESC,INFO_PIC,INFO_TYPE,INFO_VIEW_CNT,INFO_ORDER,' + this.getJoinUserFields();

		let where = {};
		where.INFO_STATUS = InfoModel.STATUS.COMM; // 状态 

		if (cate)
			where.INFO_TYPE = cate;

		if (ccminiUtil.isDefined(search) && search) {
			where.INFO_TITLE = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && ccminiUtil.isDefined(sortVal)) {
			switch (sortType) {
				case 'type':
					where.INFO_TYPE = sortVal;
					break;
				case 'sort':
					if (sortVal == 'view') {
						orderBy = {
							'INFO_VIEW_CNT': 'desc',
							'INFO_ADD_TIME': 'desc'
						};
					}
					if (sortVal == 'new') {
						orderBy = {
							'INFO_ADD_TIME': 'desc'
						};
					}

					break;
			}
		}

		if (whereEx && whereEx['userId'])
			where.INFO_USER_ID = String(whereEx['userId']);

		let joinParams = this.getJoinUserParams('INFO_USER_ID');
		return await ccminiDbUtil.getListJoin(InfoModel.CL, joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async statUserInfoCnt(userId) {
		let where = {
			INFO_USER_ID: userId
		}
		let cnt = await InfoModel.count(where);

		let whereUpdate = {
			USER_MINI_OPENID: userId
		};
		let data = {
			USER_INFO_CNT: cnt
		};
		await UserModel.edit(whereUpdate, data);

	}

	async getMyInfoList(userId, {
		search,
		sortType,
		sortVal,
		orderBy,
		page,
		size,
		isTotal = true,
		oldTotal = 0
	}) {
		orderBy = orderBy || {
			'INFO_ADD_TIME': 'desc'
		};
		let fields = 'INFO_TITLE,INFO_EXPIRE_TIME,INFO_REGION_PROVINCE,INFO_REGION_CITY,INFO_REGION_COUNTY,INFO_ADD_TIME,INFO_DESC,INFO_PIC,INFO_TYPE,INFO_VIEW_CNT,INFO_ORDER';

		let where = {};
		// where.INFO_STATUS = InfoModel.STATUS.COMM;
		if (ccminiUtil.isDefined(search) && search) {
			where.INFO_TITLE = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && ccminiUtil.isDefined(sortVal)) {
			switch (sortType) {
				case 'type':
					where.INFO_TYPE = Number(sortVal);
					break;
				case 'city':
					where.INFO_REGION_CITY = String(sortVal);
					break;
				case 'sort':
					if (sortVal == 'view') {
						orderBy = {
							'INFO_VIEW_CNT': 'desc',
							'INFO_ADD_TIME': 'desc'
						};
					}
					break;
			}
		}

		where.INFO_USER_ID = userId;
		return await InfoModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}
}

module.exports = InfoService;