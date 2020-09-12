<template>
	<view class="uni-list-cell" @click="goDetail">
		<view class="uni-media-list">
			<view class="uni-media-list-body">
				<view class="uni-media-list-text-top">
					<text class="script_content">{{ dataItem.script_content }}</text>
				</view>
				<view class="uni-media-list-text-bottom">
					<text class="name">{{ dataItem.type_name }} {{ dataItem.author_name }}</text>
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
					url: '/pages/adventures/script-detail?query=' + encodeURIComponent(JSON.stringify(this.dataItem))
				});
			},
		}
	}
</script>

<style>
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.script_content {
		max-height: 86rpx;
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

		font-size: 38upx;
		line-height: 44upx;
	}

	.uni-media-list-text-top {
		height: 100rpx;
		font-size: 28rpx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20rpx;
		color: #CCCCCC;
	}

	.uni-media-list-text-bottom .name {
		font-size: 28upx;
	}

	.uni-media-list-text-bottom .time {
		font-size: 28upx;
	}
</style>
