'use strict';

const BaseController = require('./base');
const md5 = require('md5');
const HashSalt = 'kkb13579@%%$';

class UserController extends BaseController {
    async info() {
        this.success({
            name: 'kkb'
        })
    }
    async captcha() {
        let { ctx } = this;
        const captcha = this.service.tools.captcha();
        console.log('验证码', captcha.text);
        ctx.session.captcha = captcha.text;
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
    async checkEmail(email) {
        let user = await this.ctx.model.User.findOne({ email });
        return user;
    }
    async checkNickname(nickname) {
        let user = await this.ctx.model.User.findOne({ nickname });
        return user;
    }
    async register() {
        let { ctx } = this;
        const { email, nickname, password, captcha } = ctx.request.body;
        if (captcha.toUpperCase() == ctx.session.captcha.toUpperCase()) {
            // 新增用户
            if (await this.checkEmail(email)) {
                return this.error('邮箱已存在');
            }
            if (await this.checkNickname(nickname)) {
                return this.error('昵称已存在');
            }
            let ret = await ctx.model.User.create({
                email,
                nickname,
                password: md5(password + HashSalt),   // 密码再次加盐加密
            })
            if (ret._id) {
                this.success('注册成功')
            }
        } else {
            this.error('验证码错误');
        }
    }
    async login(){
        let {ctx, app} = this;
        const {email, password} = ctx.request.body;
        let user = await ctx.model.User.findOne({
            email,
            password: md5(password + HashSalt)
        });
        if(user){
            // 生成token
            const {nickname, _id} = user;
            const token = app.jwt.sign({
                email,
                nickname,
                _id
            }, app.config.jwt.secret, {expiresIn: '1h'});
            this.success({email, nickname, token});
        } else{
            this.error('用户名或密码错误')
        }
  }
}

module.exports = UserController;
