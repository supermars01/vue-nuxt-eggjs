// controller只写业务逻辑，公用的功能，抽象成service，(如：生成验证码)
const Service = require('egg').Service
const svgCaptcha = require('svg-captcha')

class ToolsService extends Service{
    captcha(){
        let _captcha = svgCaptcha.create({
            size:4,
            fontSize:50,
            width:100,
            height:40,
            noise:3
        });
        return _captcha;
    }
}
module.exports = ToolsService

