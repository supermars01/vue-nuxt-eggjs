<template>
    <div class="login-container">
        <el-form class="login-form" :model="form" :rules="rules" ref="loginForm">
            <div class="title-container">
                <img src="/nuxt.svg" width="120" />
            </div>
            <el-form-item prop="email">
                <span class="icon-box">
                    <i class="el-icon-user"></i>
                </span>
                <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="icon-box">
                    <i class="el-icon-document"></i>
                </span>
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item class="button-container">
                <el-button type="primary" @click.native.prevent="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import md5 from 'md5'
export default {
	layout: 'login',
	data(){
        return {
            form:{
                email: 'test1@sina.com',
                password: '123456',
            },
            rules:{
                email: [
                    {required: true, message: '请输入邮箱'},
                    {type: 'email', message: '请输入正确的邮箱格式'}
                ],
                password: [
                    {required: true, message: '请输入密码'}
                ]
            }
        }
    },
    methods: {
        login(){
            this.$refs.loginForm.validate(async valid=>{
                if(valid){
                    let params = Object.assign({}, this.form, {
                        password: md5(this.form.password)
                    });
                    let ret = await this.$http.post('/user/login', params);
                    if(ret.code == 0){
                        this.$router.push({path: '/'})
                    } else{
                        this.$message.error(ret.message);
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>
