<template>
	<view>
		<view class="uni-list">
			<block v-for="(value, index) in listData" :key="index">
				<journey-item :newsItem="value" v-if="value.item_type === 5"/>
				<news-item :newsItem="value" v-else/>
			</block>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import newsItem from './news-item.vue';
	import journeyItem from './news-item-journey.vue';
	import {
		friendlyDate
	} from '@/common/util.js';

	export default {
		components: {
			uniLoadMore,
			newsItem,
			journeyItem
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
					url: 'https://adventures.jicu.vip/api/adventures',
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
			setTime: function(items) {
				var newItems = [];
				items.forEach(adventure => {
					newItems.push({
						id: adventure.id,
						title: adventure.title,
						image_url: adventure.imageUrl,
						datetime: friendlyDate(new Date(adventure.createdAt.replace(/\-/g,
							'/')).getTime()),
						author_name: adventure.authorName,
						source: adventure.source,
						from: adventure.sourceName,
						item_type: adventure.itemType,
						type_name: adventure.itemTypeName,
						link: adventure.link,
						journey_destiny_name: adventure.journeyDestinyName,
						article_type: 1
					});
				});
				return newItems;
			}
		}
	};
</script>

<style>

</style>
