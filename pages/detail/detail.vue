<template>
	<view>
		<view class="banner" auto-focus>
			<view class="title-area">
				<text class="title-text">{{banner.title}}</text>
			</view>
		</view>
		<view class="article-meta">
			<text class="article-meta-text article-author">{{banner.source}}</text>
			<text class="article-meta-text article-text">发表于</text>
			<text class="article-meta-text article-time">{{banner.datetime}}</text>
		</view>
		<view class="article-content">
			<img class="content-img" :src="banner.image_url">
		</view>
		<view class="article-link">
			<uni-link :href="banner.link" text="点击观看" fontSize="22"></uni-link>
		</view>
		<view class="comment-wrap"></view>
	</view>
</template>

<script>
	// https://ext.dcloud.net.cn/plugin?id=1182#detail
	import uniLink from "@/components/uni-link/uni-link.vue"
	export default {
		components: {uniLink},
		data() {
			return {
				banner: {},
				content: []
			} 
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
			}
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.banner = JSON.parse(decodeURIComponent(event.query));
			} catch (error) {
				this.banner = JSON.parse(event.query);
			}

			uni.setNavigationBarTitle({
				title: " "
			});

		},
		methods: {
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		min-height: 100%;
	}

	/* #endif */

	.banner {
		height: 80upx;
		position: relative;
		background-color: #fff;
		flex-direction: row;
		overflow: hidden;
	}

	.content-img {
		flex: 1;
		height: 70%;
	}

	.title-area {
		position: absolute;
		left: 30upx;
		right: 30upx;
		top: 30upx;
		bottom: 30upx;
		z-index: 11;
	}

	.title-text {
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		lines: 2;
		overflow: hidden;
	}

	.article-meta {
		padding: 10upx 30upx 20upx 30upx;
		background-color: #fff;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.article-meta-text {
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author {
		font-size: 30upx;
	}

	.article-time {
		font-size: 30upx;
	}

	.article-content {
		font-size: 30upx;
		padding: 0 30upx;
		background-color: #fff;
		overflow: hidden;
		text-align: center;
	}
	
	.article-link {
		background-color: #fff;
		text-align: center;
	}
</style>
