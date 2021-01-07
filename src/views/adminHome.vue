<template>
  <!--    页面布局-->
  <el-container class="home-container">
    <!--        头部区域-->
    <el-header>
      <div>
        <img src="../assets/img/logo.png" height="60" />
      </div>
      <div class="out-button">
        <el-dropdown>
          <span class="el-dropdown-link" style="margin-right: 15px">
            <el-badge is-dot class="item" :hidden="showDot">
              <el-avatar :src="imgUrl"></el-avatar>
            </el-badge>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="navigation-text" id="username-div">{{
              username
            }}</el-dropdown-item>
            <el-dropdown-item
              class="navigation-text"
              @click.native="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item class="navigation-text" @click.native="message">
              <el-badge value="new" class="item" :hidden="showDot"
                >系统消息</el-badge
              >
            </el-dropdown-item>
            <el-dropdown-item class="navigation-text" @click.native="goWelcome"
              >回到首页</el-dropdown-item
            >
            <el-dropdown-item
              class="navigation-text"
              id="exit-div"
              divided
              @click.native="logOut"
              >退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!--        页面主体-->
    <el-container class="main-container">
      <!--            侧边栏-->
      <el-aside width="200px">
        <el-menu
          router
          background-color="rgb(239,239,239)"
          text-color="rgb(43,43,43)"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/adminWelcome">
            <i class="el-icon-s-home"></i>
            欢迎页
          </el-menu-item>
          <el-submenu index="0">
            <template slot="title"><i class="el-icon-menu"></i>审核</template>
            <el-menu-item index="/checkRegister">账户审核</el-menu-item>
            <el-menu-item index="/adminLoan">借贷审核</el-menu-item>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>管理</template>
            <el-menu-item index="/adminCompany">公司管理</el-menu-item>
            <el-menu-item index="/adminInvestment">产品管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--            右侧内容主体-->
      <el-main style="padding-left: 35px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      showDot: false,
      username: "管理员",
      imgUrl: window.sessionStorage.getItem("imgUrl"),
    };
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(this.CurentTime, 1000);
    });
  },
  methods: {
    CurentTime() {
      let loginTime = window.sessionStorage.getItem("loginTime");
      if (loginTime != null && new Date().getTime() - loginTime > 7200000) {
        //2*60*60*1000 两小时
        this.$message.success("太久未登录,强制退出!");
        this.logOut();
      }
    },
    //退出按钮
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/touristWelcome");
    },
    changePassword() {
      this.$router.push("/changePassword");
    },
    message() {
      this.showDot = true;
      this.$router.push("/adminMessage");
    },
    goWelcome() {
      this.$router.push("/touristWelcome");
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.main-container {
  height: 100%;
}
#username-div {
  font-size: 20px;
  font-weight: bold;
  font-family: 楷体;
}

#exit-div {
  text-align: center;
  font-weight: bold;
}

.el-header {
  background-color: rgb(43, 43, 43);
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
}

.el-aside {
  background-color: rgb(239, 239, 239);
  height: 100%;
}

.el-main {
  background-color: rgb(255, 255, 255);
}

.out-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>