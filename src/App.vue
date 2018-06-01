<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <header class="this_header">
      <div class="left">
        <div class="logo"></div>
        <div class="txt">岱江健康服务平台</div>
      </div>
      <div class="elmenu">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
           系统管理员<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" @click="alert.resetPass=true">修改密码</el-button>
            </el-dropdown-item>
            <el-dropdown-item @click="loginout">
              <el-button type="text" @click='loginout'>退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <article class="this_section">
      <nav class="this_nav">
        <el-button type="text" class="icon iconfont icon-zhankai" @click="isCollapse=!isCollapse"></el-button>
        <!-- 系统管理员 -->
        <el-menu :router="true" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="icon iconfont icon-set"></i>
              <span slot="title">检查设置</span>
            </template>
            <el-menu-item index="/checkInfo">
              <span slot="title">检查信息</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </nav>
      <main class="this_main">
        <router-view class="view"></router-view>
      </main>
    </article>
    <section class="resetPass">
      <el-dialog @close="resetForm('navform')" title="修改密码"  :visible.sync="alert.resetPass">
        <el-form class="false" :model="navform" ref="navform" label-width="87px">
          <el-form-item label="旧密码:" prop="oldPassword">
            <el-input type="password" placeholder="请输入旧密码" v-model="navform.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="newPassword">
            <el-input type="password" placeholder="请输入新密码" v-model="navform.newPassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="mlem false" :plain="true" type="primary" @click="alert.resetPass=false">取 消</el-button>
          <el-button class="mlem false" type="primary" @click="submitForm('navform','resetpass','resetPass')">保存</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: 'app',
  data() {
    return {
      isCollapse: true,
      user: {

      },
      alert: {
        resetPass: false, //修改密码
      },
      navform: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  computed: {
    ...mapState([
      "userMsg"
    ])
  },
  created() {
    this.login();
     let storage = window.localStorage;
     storage.username="admin";
     storage.password='88888888';
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    //登录
    login() {
      let promise = new Promise(resolve => {
        let storage = window.localStorage;
        this.get('fuselogin', {
          params: {
            username: storage.username,
            password: storage.password,
          }
        }).then(data => {
          console.log(data)
          this.user = this.copy(_.get(data, 'data', {}));
          this.$set(this.user, data.data);
          this.$store.dispatch("setUserMsg", _.get(data, 'data', {}));
          if (data.httpCode == "OK") {
            resolve(data.data);
          }
        })
      })
      this.$store.commit('toPrepare', promise);
     

    },
    //退出登录
    loginout() {
      this.get('fuselogout').then(data => {
        console.log(data);
        if (data.httpCode == 'OK') {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.$store.dispatch("setUserMsg", {});
          setTimeout(() => {
            self.location = 'login.html';
          }, 1000)
        }
      })
    },
    //修改密码
    resetpass(resolve) {
      this.get('fuseupdatePassword', {
        params: {
          ...this.navform,
          id: this.user.id
        }
      }).then(data => {
        console.log(data);
        resolve();
        if (data.httpCode == 'OK') {
          this.$message({
            message: data.message,
            type: 'success'
          });
          // this.$store.dispatch("setUserMsg", {});
          // setTimeout(() => {
          //   self.location = 'login.html';
          // }, 1000)
        }
      })
    }
  }

}

</script>
<style lang="less">
@import './assets/css/mixin.less';
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .this_header {
    height: 80px;
    width: 100%;
    background: #009933;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
    .left {
      display: flex;
      align-items: center;
      .txt {
        font-size: 30px;
        font-weight: 400;
        color: #fff;
        margin-left: 18px;
      }
      .logo {
        width: 54px;
        height: 54px;
        background: url('./assets/images/djlogo.png');
        background-size: 100%;
        border-radius: 50%;
      }
    }
    .elmenu {
      .el-dropdown-link {
        color: #fff;
      }
    }
  }

  .this_section {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    .this_nav {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #eef1f6;
      .iconfont {
        font-size: 1.1em;
      }
      .icon-zhankai {
        font-weight: 600;
        font-size: 1.5em;
      }
      .icon-zhanghushezhi {
        font-size: 1.3em;
      }
      .this_spread {
        width: 100%;
        background: #eef1f6;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        max-height: 100%;
      }
    }
    .this_main {
      // border:1px solid red;
      width: 830px;
      height: 100%;
      padding: 15px 15px 0 15px;
      flex-grow: 1;

      .view {
        width: 100%;
        height: 100%;
      }
    }
  }
  .resetPass {
    .el-dialog {
      width: 464px;
      .pub_margintop(280px);
      .el-input {
        width: 300px;
      }
    }
  }
}

.el-dropdown-menu {
  right: 6px;
  max-width: 85px;
  .el-dropdown-menu__item{
    padding:0 5px;
  }
  .el-button--text {
    color: #333 !important;
  }
}

</style>
