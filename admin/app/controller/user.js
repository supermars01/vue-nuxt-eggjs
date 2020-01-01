'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
    async info() {
        this.success({
            name: 'kkb'
        })
    }
    async captcha() {
        let {ctx} = this;
        const captcha = this.service.tools.captcha();
        console.log('验证码', captcha.text);
        ctx.session.captcha = captcha.text;
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
    async register() {
        let {ctx} = this;
        const {email, captcha} = ctx.request.body;
        if(captcha.toUpperCase() == ctx.session.captcha.toUpperCase()){
            this.success('注册成功');
        } else{
            this.error('验证码错误');
        }
    }
}

module.exports = UserController;
