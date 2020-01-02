<template>
	<div class="container">
		<div>
			<logo />
		</div>
	</div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
	components: {
		Logo
	},
	async mounted () {
		const ret = await this.$http('/user/info');
		console.log(ret);
	}
}
</script>

<style>

</style>
