<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="64" :down="downOption" @down="downCallback"
		 :up="upOption" @up="upCallback">
			<!-- 数据列表 -->
			<adventures-list :list="goods"></adventures-list>
		</mescroll-uni>
	</view>
</template>

<script>
	import adventuresList from '@/components/adventures/adventures-list.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	import {
		friendlyDate
	} from '@/common/util.js';

	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			adventuresList
		},
		data() {
			return {
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~' // 提示
					}
				},
				requestParams: {
					limit: 10,
					offset: 0,
					item_id: 0
				},
				goods: [] //列表数据
			}
		},
		props: {
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default () {
					return 0
				}
			},
			tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				setTimeout(() => {
					this.mescroll.resetUpScroll();
				}, 150);
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				// let keyword = this.tabs[this.i].name
				// apiSearch(page.num, page.size, keyword).then(curPageData => {
				// 	//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				// 	this.mescroll.endSuccess(curPageData.length);
				// 	//设置列表数据
				// 	if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
				// 	this.goods = this.goods.concat(curPageData); //追加新数据
				// }).catch(() => {
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })
				this.getList(page.num);
			},
			//请求数据
			getList(currentPage) {
				this.requestParams.time = new Date().getTime() + '';
				this.requestParams.offset = (currentPage - 1) * this.requestParams.limit;
				this.requestParams.item_id = this.tabs[this.index]['itemId'];
				uni.request({
					url: 'https://adventures.jicu.vip/api/adventures',
					data: this.requestParams,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setData(data.data.adventures);
							//如果是第一页需手动制空列表
							if (currentPage == 1) this.goods = [];
							this.goods = this.goods.concat(list);
							//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
							this.mescroll.endSuccess(list.length);
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						//联网失败, 结束加载
						this.mescroll.endErr();
					},
					complete: (e) => {}
				});
			},
			setData: function(items) {
				var adventuresItems = [];
				items.forEach(adventure => {
					adventuresItems.push({
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
						script_content: adventure.scriptContent,
						article_type: 1
					});
				});
				return adventuresItems;
			}
		}
	}
</script>
<style>
</style>
