<template>
	<view>
		<view class="banner" auto-focus>
			<text class="title-text">{{banner.title}}</text>
		</view>
		<view class="article-meta">
			<text class="article-meta-text article-author">{{banner.author_name}}</text>
			<text class="article-meta-text article-text">发表于</text>
			<text class="article-meta-text article-time">{{banner.datetime}}</text>
		</view>
		<view class="article-content">
			<view v-if="banner.item_type === 6" class="word-left word-address">
				<text>地址：{{ banner.address }}</text>
			</view>
			<img class="content-img" :src="banner.image_url" @click="openURL">
			<view>
				<text class="word-left">↑点图片观看</text>
			</view>
		</view>
		<view class="article-playlist" v-if="banner.play_list !== '' && collection.length > 0">
			<view class="article-playlist-head">
				<text>播放列表</text>
				<text class="article-playlist-click">点击播放</text>
			</view>
			<block v-for="(value, index) in collection" :key="index">
				<view v-if="banner.id !== value.id" @click="clickPlayList(index)" class="article-playlist-text">
					<text>{{ value.title }}</text>
				</view>
			</block>
		</view>
		<view class="comment-wrap"></view>
	</view>
</template>

<script>
	import {
		friendlyDate
	} from '@/common/util.js';
	export default {
		data() {
			return {
				banner: {},
				collection: []
			}
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/adventures/detail?query=' + JSON.stringify(this.banner)
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
				title: this.banner.title
			});

			if (this.banner.play_list) {
				this.requestPlayList();
			}

		},
		methods: {
			requestPlayList() {
				uni.request({
					url: "https://adventures.jicu.vip/api/adventures/playlist/" + this.banner.play_list,
					sslVerify: false,
					success: (data) => {
						if (data.statusCode == 200) {
							const adventure_list = data.data.adventures;
							adventure_list.forEach(adventure => {
								this.collection.push({
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
									play_list: adventure.playList,
									address: adventure.address,
									article_type: 1
								});
							});
						}
					}
				});
			},
			clickPlayList(index) {
				uni.redirectTo({
					url: '/pages/adventures/detail?query=' + encodeURIComponent(JSON.stringify(this.collection[index]))
				});
			},
			openURL() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.banner.link)
				// #endif
				// #ifdef H5
				window.open(this.banner.link)
				// #endif
				// #ifdef MP
				uni.setClipboardData({
					data: this.banner.link
				});
				uni.showModal({
					content: '已自动复制网址，请在手机浏览器里粘贴该网址',
					showCancel: false
				});
				// #endif
			}
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
		background-color: #fff;
		padding: 30upx 30upx 0px 30upx;
	}

	.content-img {
		flex: 1;
		height: 50%;
		width: 100%;
	}

	.title-text {
		font-size: 32upx;
		font-weight: bold;
	}

	.article-meta {
		padding: 10upx 30upx 10upx 30upx;
		margin-bottom: 10upx;
		background-color: #fff;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.article-meta-text {
		color: gray;
	}

	.article-text {
		font-size: 22upx;
		margin: 0 20upx;
	}

	.article-author {
		font-size: 26upx;
	}

	.article-time {
		font-size: 26upx;
	}

	.article-content {
		font-size: 30upx;
		padding: 0 30upx;
		background-color: #fff;
		overflow: hidden;
		text-align: center;
	}
	
	.word-address {
		font-size: 32upx;
	}
	
	.word-left {
		text-align: left;
	}
	
	.article-playlist {
		background-color: #fff;
		text-align: left;
		padding: 30upx;
	}
	
	.article-playlist-head {
		font-weight: bold;
		border-bottom-width: 1upx;
		border-bottom-style: solid;
		border-bottom-color: #CCCCCC;
	}
	
	.article-playlist-click {
		font-size: 20upx;
		color: #CCCCCC;
		margin-left: 10upx;
	}
	
	.article-playlist-text {
		font-weight: 30upx;
		padding: 10upx 0;
		border-bottom-width: 1upx;
		border-bottom-style: solid;
		border-bottom-color: #CCCCCC;
	}
</style>
