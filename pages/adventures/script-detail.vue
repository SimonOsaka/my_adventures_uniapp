<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<text class="text-box">{{banner.script_content}}</text>
		</view>
		<view class="article-meta">
			<text class="article-meta-text article-author">{{banner.author_name}}</text>
			<text class="article-meta-text article-text">发表于</text>
			<text class="article-meta-text article-time">{{banner.datetime}}</text>
		</view>
		<view class="comment-wrap"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: {},
				content: []
			}
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/adventures/script-detail?query=' + JSON.stringify(this.banner)
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
				title: '详细内容'
			});

		},
		methods: {}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		min-height: 100%;
	}

	/* #endif */

	.text-box {
		margin-bottom: 40rpx;
		padding: 40rpx 0;
		display: flex;
		min-height: 300rpx;
		background-color: #FFFFFF;
		justify-content: center;
		align-items: center;
		text-align: left;
		font-size: 30rpx;
		color: #353535;
		line-height: 1.8;
		text-indent: 60rpx;
	}

	.article-meta {
		padding: 20upx 30upx 20upx 30upx;
		background-color: #fff;
		text-align: right;
	}

	.article-meta-text {
		color: gray;
	}

	.article-text {
		font-size: 20upx;
	}

	.article-author {
		font-size: 20upx;
		padding-right: 20upx;
	}

	.article-time {
		font-size: 20upx;
	}

</style>
