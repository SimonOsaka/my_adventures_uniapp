<template>
	<view class="tabs">
		<newsPage class="page-item" :nid="0" ref="page0"></newsPage>
	</view>
</template>

<script>
	import newsPage from './news-page.vue';

	export default {
		components: {
			newsPage
		},
		data() {
			return {}
		},
		onReady() {

		},
		methods: {}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.page-item {
		flex: 1;
		flex-direction: row;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
</style>
