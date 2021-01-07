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
            <el-dropdown-item class="navigation-text" @click.native="goWelcome"
              >回到首页</el-dropdown-item
            >
            <el-dropdown-item
              class="navigation-text"
              @click.native="companyInformation"
              >公司信息</el-dropdown-item
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
      username: "尚未登记公司",
      imgUrl: window.sessionStorage.getItem("imgUrl"),
    };
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(this.CurentTime, 1000);
    });
  },
  methods: {
    //退出按钮
    CurentTime() {
      let loginTime = window.sessionStorage.getItem("loginTime");
      if (loginTime != null && new Date().getTime() - loginTime > 7200000) {
        //2*60*60*1000 两小时
        this.$message.success("太久未登录,强制退出!");
        this.logOut();
      }
    },
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/touristWelcome");
    },
    changePassword() {
      this.$router.push("/changePassword");
    },
    message() {
      this.showDot = true;
      this.$router.push("/createMessage");
    },
    goWelcome() {
      this.$router.push("/touristWelcome");
    },
    companyInformation() {
      this.$router.push("/memberInformation");
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