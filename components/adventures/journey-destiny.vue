<template>
	<view class="journey-destiny-view">
		<scroll-view scroll-y="true" :style="{'height': scrollHeight}">
			<uni-grid :column="3" @change="goJourney">
				<uni-grid-item v-for="(item, index) in provinces" :index="index" :key="index">
					<view class="grid-item-box">
						<text class="text">{{ item.value }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</scroll-view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";

	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				provinces: [{
						value: '北京',
						key: 'beijing'
					},
					{
						value: '天津',
						key: 'tianjin'
					},
					{
						value: '河北',
						key: 'hebei'
					},
					{
						value: '山西',
						key: 'shanxi_jin'
					},
					{
						value: '内蒙古自治区',
						key: 'neimenggu'
					},
					{
						value: '辽宁',
						key: 'liaoning'
					},
					{
						value: '吉林',
						key: 'jilin'
					},
					{
						value: '黑龙江',
						key: 'heilongjiang'
					},
					{
						value: '上海',
						key: 'shanghai'
					},
					{
						value: '江苏',
						key: 'jiangsu'
					},
					{
						value: '浙江',
						key: 'zhejiang'
					},
					{
						value: '安徽',
						key: 'anhui'
					},
					{
						value: '福建',
						key: 'fujian'
					},
					{
						value: '江西',
						key: 'jiangxi'
					},
					{
						value: '山东',
						key: 'shandong'
					},
					{
						value: '河南',
						key: 'henan'
					},
					{
						value: '湖北',
						key: 'hubei'
					},
					{
						value: '湖南',
						key: 'hunan'
					},
					{
						value: '广东',
						key: 'guangdong'
					},
					{
						value: '广西壮族自治区',
						key: 'guangxi'
					},
					{
						value: '海南',
						key: 'hainan'
					},
					{
						value: '重庆',
						key: 'chongqing'
					},
					{
						value: '四川',
						key: 'sichuan'
					},
					{
						value: '贵州',
						key: 'guizhou'
					},
					{
						value: '云南',
						key: 'yunnan'
					},
					{
						value: '西藏自治区',
						key: 'xizang'
					},
					{
						value: '陕西',
						key: 'shanxi_shan'
					},
					{
						value: '甘肃',
						key: 'gansu'
					},
					{
						value: '青海',
						key: 'qinghai'
					},
					{
						value: '宁夏回族自治区',
						key: 'ningxia'
					},
					{
						value: '新疆维吾尔自治区',
						key: 'xinjiang'
					},
					{
						value: '澳门',
						key: 'aomen'
					},
					{
						value: '香港',
						key: 'xianggang'
					},
					{
						value: '台湾',
						key: 'taiwan'
					}
				]
			}
		},
		computed: {
			scrollHeight() {
				const sys = uni.getSystemInfoSync();
				let h = sys.windowHeight + sys.statusBarHeight - 64 + 'px';
				return h;
			}
		},
		methods: {
			goJourney: function(e) {
				let {
					index
				} = e.detail;
				let provinceJson = this.provinces[index];
				uni.navigateTo({
					url: '/pages/adventures/journey-destiny-list?query=' + encodeURIComponent(JSON.stringify(provinceJson))
				});
			},
		}
	}
</script>

<style>
	.journey-destiny-view {
		margin-top: 64upx;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.test {
		border-width: 1upx;
		border-color: red;
		border-style: solid;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
	*/
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
</style>
