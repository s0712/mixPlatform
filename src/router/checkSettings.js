//系统管理员->系统设置->充值记录
const checkInfo = resolve => {
  require.ensure(['../components/checkSettings/checkInfo.vue'], () => {
    resolve(require('../components/checkSettings/checkInfo.vue'))
  })
}

let checkSettings = [
  // {path: '/',       component: hello,  },
  { path: '/checkInfo', component: checkInfo, name: '检查信息' },

]

export default checkSettings;
