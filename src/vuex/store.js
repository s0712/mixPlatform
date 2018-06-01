import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import location from '../location/location';


// mutation是同步的,只要comit muation, 它就会立即改变state , 这有利于我们追踪 状态的改变。如果 mution 之后，五分钟才改变state, 那就真不知道state 到底是哪个state了。
// action 是异步的，还有的错误处理也都在这里操作。

let store = new Vuex.Store({
  state: {

    hospitalID: '', //用户登录的院区id
    departmentID: '', //用户登录时候选取的科室id
    userMsg: {}, //用户信息
    // page:0,//默认页数
    pageSize:20,//默认每次发送数据条数
    regionProps: { //地区树规则
      value: 'postCode',
      label: 'name',
      children: 'list'
    },
    loginState: '', //存储登录成功状态(promise)
  },
  mutations: {
    //设置登录院区id
    setHospitalID(state, value) {
      state.hospitalID = value;
    },
    //设置用户信息
    setUserMsg(state, value) {
      state.userMsg = value;
    },
   
    //确定登录成功
    toPrepare(state, value) {
      state.loginState=value;
    }

  },
  actions: {
    //设置登录院区id
    setHospitalID({ commit }, value) {
      commit('setHospitalID', value);
    },
    //设置用户信息
    setUserMsg({ commit }, value) {
      // value=JSON.parse(JSON.stringify(value));
      commit('setUserMsg', value);
    },
    //设置同步按钮状态
    setSynchronous({ commit }, value) {
      commit('setSynchronous', value);
    }
  }
});

export default store
