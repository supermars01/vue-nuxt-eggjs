<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
	.login-container{
		.login-form{
			width: 500px;
			margin:0 auto;
		}
		.title-container{
			text-align:center;
			margin: 20px 0;
		}
		.button-container{
			text-align: center;
		}
		.icon-box{
			display: inline-block;
			position: absolute;
			left: 10px;
			z-index: 10;
		}
		.el-input input{
			padding-left: 30px;
		}
		.captcha-item .el-input{
			width: 80%;
		}
		.code-box{
			display: inline-block;
			width: 15%;
			position: absolute;
			right: 0;
			top: 3px;
		}
	}
</style>
