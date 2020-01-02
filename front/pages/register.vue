<template>
    <div class="login-container">
        <el-form class="login-form" :model="form" :rules="rules" ref="registerForm">
            <div class="title-container">
                <img src="/nuxt.svg" width="120" />
            </div>
            <el-form-item prop="email">
                <span class="icon-box">
                    <i class="el-icon-user"></i>
                </span>
                <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
                <span class="icon-box">
                    <i class="el-icon-setting"></i>
                </span>
                <el-input v-model="form.nickname" placeholder="请填写昵称"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="icon-box">
                    <i class="el-icon-document"></i>
                </span>
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
                <span class="icon-box">
                    <i class="el-icon-document-copy"></i>
                </span>
                <el-input v-model="form.repassword" placeholder="请再次输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="captcha-item">
                <span class="icon-box">
                    <i class="el-icon-check"></i>
                </span>
                <el-input v-model="form.captcha" placeholder="验证码"></el-input>
                <span class="code-box">
                    <img :src="captchaImg" width="100%" @click="getCaptcha" />
                </span>
            </el-form-item>
            <el-form-item class="button-container">
                <el-button type="primary" @click.native.prevent="register">注册</el-button>
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
                nickname: 'test1',
                password: '123456',
                repassword: '123456',
                captcha: '',
            },
            rules:{
                email: [
                    {required: true, message: '请输入邮箱'},
                    {type: 'email', message: '请输入正确的邮箱格式'}
                ],
                nickname: [
                    {required: true, message: '请输入昵称'}
                ],
                password: [
                    {required: true, message: '请输入密码'}
                ],
                repassword: [
                    {required: true, message: '请再次输入密码'}
                ],
                captcha: [
                    {required: true, message: '请输入验证码'}
                ]
            },
            // 图片验证码
            captchaImg: '/api/user/captcha'
        }
    },
    methods: {
        async getCaptcha(){
            this.captchaImg = '/api/user/captcha?_t='+new Date().getTime()
        },
        register(){
            this.$refs.registerForm.validate(async valid=>{
                if(valid){
                    console.log('校验成功');
                    let params = Object.assign({}, this.form, {
                        password: md5(this.form.password)
                    });
                    delete params.repassword;
                    let ret = await this.$http.post('/user/register', params);
                    if(ret.code == 0){
                        this.$message.success(ret.data);
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
