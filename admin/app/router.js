'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/getUserInfo', controller.user.info);
  router.get('/user/captcha', controller.user.captcha);
  router.post('/user/register', controller.user.register);
};
