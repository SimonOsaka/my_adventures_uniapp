<template>
	<view>
		<view class="uni-list">
			<block v-for="(value, index) in listData" :key="index">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="value.image_url"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ value.title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ value.type_name }} {{ value.source }}</text>
								<text>{{ value.datetime }}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {
		friendlyDate
	} from '@/common/util.js';

	export default {
		components: {
			uniLoadMore,
		},
		data() {
			return {
				banner: {},
				listData: [],
				last_id: '',
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			};
		},
		onLoad() {
			this.requestParams = {
				limit: 10,
				offset: 0,
				item_id: 0
			};
			this.getList();
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = '';
			this.requestParams.offset = 0;
			this.getList();
		},
		onReachBottom() {
			this.status = 'more';
			this.getList();
		},
		methods: {
			getList() {
				this.requestParams.time = new Date().getTime() + '';
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
				}
				uni.request({
					url: 'http://192.168.3.7:3030/api/adventures',
					data: this.requestParams,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data.adventures);
							if (list.length <= 0) {
								this.status = 'noMore';
							} else {
								this.last_id = list[list.length - 1].id;
							}
							this.listData = this.reload ? list : this.listData.concat(list);
							this.reload = false;

							this.requestParams.offset += this.requestParams.limit;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					},
					complete: (e) => {
						uni.stopPullDownRefresh();
					}
				});
			},
			goDetail: function(detail) {
				uni.navigateTo({
					url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach(adventure => {
					newItems.push({
						id: adventure.id,
						title: adventure.title,
						image_url: adventure.imageUrl,
						datetime: friendlyDate(new Date(adventure.createdAt.replace(/\-/g,
							'/')).getTime()),
						source: adventure.authorName,
						type_name: adventure.itemTypeName,
						link: adventure.link,
						article_type: 1
					});
				});
				return newItems;
			}
		}
	};
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

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
