import Vue from 'vue';
import VueRouter from 'vue-router';
//检查设置
import checkSettings from './checkSettings.js';

//默认路由
import hello from '../components/public/hello.vue';
Vue.use(VueRouter);
import { mapState } from "vuex";

var routes = [
  { path: '/', component: hello },
  ...checkSettings,
];

const router = new VueRouter({
  // mode:'history',
  // base: __dirname,
  routes
});

//全局路由钩子
router.afterEach((route) => {})

export default router;
