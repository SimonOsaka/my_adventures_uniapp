<template>
	<view>
		<!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
		<me-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :tab-width="130"></me-tabs>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i">
				<mescroll-item :i="i" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./page-swiper.vue";

	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				height: "400px", // 需要固定swiper的高度
				tabs: [{
					name: '全部'
				}, {
					name: '剧本'
				}, {
					name: '搞笑'
				}, {
					name: '游戏'
				}, {
					name: '影视'
				}, {
					name: '旅游'
				}],
				tabIndex: 0 // 当前tab的下标
			}
		},
		methods: {
			// 轮播菜单
			swiperChange(e) {
				this.tabIndex = e.detail.current
			}
		},
		onReady() {
			// 需要固定swiper的高度
			uni.getSystemInfo({
				success: (res) => {
					this.height = res.windowHeight + 'px'
					// console.log(this.height);
				}
			})
		}
	}
</script>

<style>
	.debug {
		border-color: red;
		border-style: solid;
		border-width: 1rpx;
	}
</style>
