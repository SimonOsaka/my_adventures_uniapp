<template>
	<view class="uni-list">
		<block v-for="(value, index) in list" :key="index">
			<script-item :dataItem="value" v-if="value.item_type === 1" />
			<journey-item :dataItem="value" v-else-if="value.item_type === 5" />
			<global-item :dataItem="value" v-else />
		</block>
	</view>
</template>

<script>
	import globalItem from './adventures-item.vue';
	import journeyItem from './adventures-item-journey.vue';
	import scriptItem from './adventures-item-script.vue';

	export default {
		components: {
			globalItem,
			journeyItem,
			scriptItem
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {};
		},
		methods: {

		}
	};
</script>

<style>

</style>
