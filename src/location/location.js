import {title} from './title.js';
import system from './system.js';

var sxy={
fuselogin:title+'fuse/login',//登录
fuselogout:title+'fuse/logout',//登出
fuseupdatePassword:title+'fuse/updatePassword',//修改密码

fusegetDianosisHospitals:title+'fuse/getDianosisHospitals',//获取可以诊断的医院
fusegetSystems:title+'fuse/getSystems',//获取所有系统标识
fusegetExamineType:title+'fuse/getExamineType',//获取所有检查类型
fusegetWorkState:title+'fuse/getWorkState',//获取所有检查状态

fusequeryStudyInfo:title+'fuse/queryStudyInfo',//获取所有检查信息
fusequeryRelatedExamine:title+'fuse/queryRelatedExamine',//获取所有相关检查
fusegetImgUrlByID:title+'fuse/getImgUrlByID',//获取检查的图像URL
fusegetPDFUrlByID:title+'fuse/getPDFUrlByID',//获取检查的报告URL
}


var location={
	...sxy,
}
Object.assign(location, system);
export default location;