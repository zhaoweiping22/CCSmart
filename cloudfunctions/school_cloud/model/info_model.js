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
 * Notes: 互动实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY www.code942.com
 * Date: 2020-10-14 19:20:00
 * Version : CCMiniCloud Framework Ver 2.0.1 ALL RIGHTS RESERVED BY 明章科技
 */


const BaseCCMiniModel = require('./base_ccmini_model.js');

class InfoModel extends BaseCCMiniModel {

}

// 集合名
InfoModel.CL = "info";

InfoModel.CCMINI_DB_STRUCTURE = {
	INFO_ID: 'string|true',
	INFO_USER_ID: 'string|true',

	INFO_TITLE: 'string|true|comment=标题',
	INFO_DESC: 'string|false|comment=',
	INFO_CONTENT: 'string|true|comment=',
	INFO_STATUS: 'int|true|default=1|comment=',
	INFO_TYPE: 'string|true|default=其他|comment=',
	INFO_ORDER: 'int|true|default=9999',

	INFO_VIEW_CNT: 'int|true|default=0|comment=', 

	INFO_EXPIRE_TIME: 'int|true|default=0|comment=',

	INFO_REGION_PROVINCE: 'string|false|comment=',
	INFO_REGION_CITY: 'string|false|comment=',
	INFO_REGION_COUNTY: 'string|false|comment=',

	INFO_PIC: 'array|false|default=[]|comment=',

	INFO_ADD_TIME: 'int|true',
	INFO_EDIT_TIME: 'int|true', 
	INFO_ADD_IP: 'string|false',
	INFO_EDIT_IP: 'string|false',
};

// 字段前缀
InfoModel.CCMINI_FIELD_PREFIX = "INFO_";

InfoModel.STATUS = { 
	UNUSE: 0,
	COMM: 1,
	PEDDING: 8,
	DEL: 9
}; 

InfoModel.STATUS_DESC = { 
	UNUSE: '待审核',
	COMM: '正常',
	PEDDING: '停用',
	DEL: '删除'
}; 
 

module.exports = InfoModel;