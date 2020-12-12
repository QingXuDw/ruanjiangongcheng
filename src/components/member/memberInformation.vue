<template>
    <div>
      <el-row :gutter="20" style="margin-top:10px">
        <el-col :span="24">
           <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                 <span>企业信息</span>
                </div>
                <div class="name-role">
                 <span class="sender">用户名 - {{dataForm.nickName}}</span>
                </div>
                <div class="registe-info">
                 <span class="registe-info">注册时间：<li class="fa fa-clock-0"></li>2020/4/10 9:40:33</span>
                </div>
                <el-divider></el-divider>
                <div class="personal-relation">
                  <div class="relation-item">企业名称：<div style="float: right; padding-right:20px;">{{dataForm.name}}</div></div>
                </div>
                <div class="personal-relation">
                  <div class="relation-item">信用评级: <div style="float: right; padding-right:20px;">Qingxu</div></div>
                </div>
                <el-button type="primary">修改信息</el-button>
              </el-card>
           </div>
        </el-col>
</template>
<script>
export default {
    data(){
        return{
            dataForm:{
                nickName:'',
                name:''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
//卡片样式
.box-card{
    width: 100%;
}
.clearfix:before,
.clearfix:after{
    display: table;
    content:"";
}
.clearfix:after{
    clear: both
}
//文本样式区
.name-role{
    font-size: 16px;
    padding: 5px;
    text-align: center;
}
.registe-info{
    text-align: center;
    padding-top: 10px;
}
.personal-relation{
    font-size:16px;
    padding:0px 5px 15px;
    margin-right:1px;
    width: 100%;
}
.relation-item{
    padding:12px;
}
.sender{
    text-align:center;
}
//布局样式区
.el-row{
    margin-bottom: 20px;
    &:last-child{
        margin-bottom:0;
    }
}
.el-col{
    border-radius:4px;
}
.bg-purple{
    background:#d3dce6;
}
.grid-content{
    border-radius: 4px;
    min-height: 36px;
}