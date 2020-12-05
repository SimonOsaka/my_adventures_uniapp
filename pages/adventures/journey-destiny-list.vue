<template>
	<view>
		<mescroll-item :province="province" :top="0"></mescroll-item>
	</view>
</template>

<script>
	import MescrollItem from "./page-swiper.vue";

	export default {
		components: {
			MescrollItem
		},
		onLoad(event) {
			try {
				this.provinceJson = JSON.parse(decodeURIComponent(event.query));
			} catch (error) {
				this.provinceJson = JSON.parse(event.query);
			}
			
			this.province = this.provinceJson.key;
			
			uni.setNavigationBarTitle({
				title: this.provinceJson.value + '旅游景点'
			});
		},
		data() {
			return {
				province: '',
				provinceJson: {}
			}
		},
		methods: {}
	}
</script>

<style>
</style>
