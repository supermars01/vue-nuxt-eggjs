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
                <el-input v-model="form.email" placeholder="邮箱"></el-input>
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
export default {
	layout: 'login',
	data(){
        return {
            form:{
                email: '',
                captcha: '',
            },
            rules:{
                email: [
                    {required: true, message: '请输入邮箱'},
                    {type: 'email', message: '请输入正确的邮箱格式'}
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
                    let params = {
                        email: this.form.email,
                        captcha: this.form.captcha
                    }
                    let ret = await this.$http.post('/user/register', params);
                }
            })
        }
    }
}
</script>

<style>

</style>
