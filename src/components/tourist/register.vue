<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name"><el-input v-model="ruleForm.name"></el-input></el-form-item>
        <el-form-item label="密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input></el-form-item>
        <el-form-item label="确认密码" prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input></el-form-item>
        <el-form-item>
             <el-button type="primary" @click="submintForm('ruleForm')">注册</el-button>
             <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data(){
        var vaildatePass=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请输入密码'));
            }else{
                if(this.ruleForm,checkPass!==''){
                    this.$refs.ruleForm.vaildateField('checkPass');
                }
                callback();
            }
        };
        var vaildatePass2=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请再次输入密码'));
            }else if(value!==this.ruleForm.pass){
                callback(new Error('两次输入密码不一致！'));
            }else{
                callback();
            }
        };
        return{
            activeName:'second',
            ruleForm:{
                name:'',
                pass:'',
                checkPass:''
            },
            rules:{
                name:[{required:true,message:'请输入您的名称',trigger:'blur'},{min:2,max:5,message:'长度在2到5个字符',trigger:'blur'}],
                pass:[{required:true,vaildator:vaildatePass,trigger:'blur'}],
                checkPass:[{required:true,vaildator:vaildatePass2,trigger:'blur'}]
            }
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].vaildate(vaild=>{
                if(vaild){
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    });
                }else{
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
};
</script>