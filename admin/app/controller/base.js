'use strict';
// Controller的父类，提供公用方法

const Controller = require('egg').Controller;

class BaseController extends Controller {
    success(data) {
        this.ctx.body = {
            code: 0,
            data
        }
    }
    message(message) {
        this.ctx.body = {
            code: 0,
            message
        }
    }
    error(message, code=-1) {
        this.ctx.body = {
            code,
            message
        }
    }
}

module.exports = BaseController;
