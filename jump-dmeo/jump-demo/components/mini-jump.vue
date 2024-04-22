<template>
	<view style="display: flex; align-items: center; flex-direction: column;">
		<view style="margin-bottom: 24px;">
			<view>预备账号</view>
			<view v-for="item in phoneHolder" key="item" @click="copyToInter(item)">
				<view style="padding: 5px;">{{item}}</view>
			</view>
		</view>
		<input v-model="phone" placeholder="输入手机号" style="border: 1px solid grey;" />
		<button @click="goFenda" style="margin-top: 24px;">goFenda</button>

		<view style="margin-top: 24px;">
			<view>历史账号</view>
			<view v-for="item in phoneHistory" key="item" @click="copyToInter(item)">
				<view style="padding: 5px;">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSecret
	} from '../utils/getSecret.js'
	export default {
		name: "web-hotel-jump",
		data() {
			return {
				phoneHolder: ['13745678922', '14112341234', '13711112222'],
				phoneHistory: [],
				phone: '13745678922'
			};
		},
		onShow() {
			this.phoneHistory = uni.getStorageSync('phoneHistory') || []
		},
		methods: {
			async goFenda() {
				const phone = this.data.phone
				if (phone.length !== 11) {
					uni.showToast({
						title: '请检查手机号',
						icon: 'none',
					})
					return
				}
				if (!this.phoneHistory.includes(phone)) {
					this.phoneHistory.push(phone)
					uni.setStorageSync('phoneHistory', this.phoneHistory)
				}
				uni.navigateToMiniProgram({
					appId: 'wx9b1357fcfd0c7c64', // Fenda悠享住
					// shortLink: '#小程序://Allway/ZsTk6nm3ZvnyjZx',
					extraData: {
						s: getSecret(),
						t: this.data.phone
					},
					envVersion: 'trial' // develop/trial/release
				})
			}
		},
	}
</script>

<style>

</style>