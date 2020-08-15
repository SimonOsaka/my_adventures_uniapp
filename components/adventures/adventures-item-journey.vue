<template>
	<view class="uni-list-cell" @click="goDetail">
		<view class="uni-media-list">
			<image class="uni-media-list-logo" :src="dataItem.image_url"></image>
			<view class="uni-media-list-body">
				<view class="uni-media-list-text-top">
					<text>{{ dataItem.title }}</text>
				</view>
				<view class="uni-media-list-text-mid">
					<text>{{ dataItem.type_name }} {{ dataItem.from }}</text>
				</view>
				<view class="uni-media-list-text-bottom">
					<text>{{ dataItem.journey_destiny_name }}</text>
					<text>{{ dataItem.datetime }}</text>
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
		height: 74rpx;
		font-size: 28rpx;
		overflow: hidden;
	}

	.uni-media-list-text-mid {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20rpx;
		color: #CCCCCC;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20rpx;
		color: #CCCCCC;
	}
</style>
