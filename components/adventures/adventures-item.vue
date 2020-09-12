<template>
	<view class="uni-list-cell" @click="goDetail">
		<view class="uni-media-list">
			<image class="uni-media-list-logo" :src="dataItem.image_url"></image>
			<view class="uni-media-list-body">
				<view class="uni-media-list-text-top">
					<text class="title">{{ dataItem.title }}</text>
				</view>
				<view class="uni-media-list-text-mid">
					<text class="name">{{ dataItem.type_name }} {{ dataItem.author_name }}</text>
				</view>
				<view class="uni-media-list-text-bottom">
					<text class="from">来自{{ dataItem.from }}</text>
					<text class="time">{{ dataItem.datetime }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataItem: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		methods: {
			goDetail: function() {
				uni.navigateTo({
					url: '/pages/adventures/detail?query=' + encodeURIComponent(JSON.stringify(this.dataItem))
				});
			},
		}
	}
</script>

<style>
	.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 100rpx;
		font-size: 28upx;
		overflow: hidden;
	}
	
	.uni-media-list-text-top .title {
		font-size: 38upx;
		line-height: 44upx;
		max-height: 86upx;
		
		overflow: hidden;
		white-space: normal;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}

	.uni-media-list-text-mid {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20upx;
		color: #CCCCCC;
	}
	
	.uni-media-list-text-mid .name {
		font-size: 28upx;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20upx;
		color: #CCCCCC;
	}
	
	.uni-media-list-text-bottom .from {
		font-size: 28upx;
	}
	
	.uni-media-list-text-bottom .time {
		font-size: 28upx;
	}
</style>
