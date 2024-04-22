<template>
	<view style="display: flex; align-items: center; flex-direction: column;">
		<view style="margin-bottom: 24px;">
			<view>预备酒店id</view>
			<view v-for="item in hotelHolder" key="item" @click="copyToInter(item)">
				<view style="padding: 5px;">{{item}}</view>
			</view>
		</view>

		<input v-model="hotelId" placeholder="输入酒店id" style="border: 1px solid grey;" />
		<button @click="goFenda" style="margin-top: 24px;">goFenda</button>

		<view style="margin-top: 24px;">
			<view>历史酒店id</view>
			<view v-for="item in hotelHistory" key="item" @click="copyToInter(item)">
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
				hotelHolder: ['1780843768552886272', '1628304326261837824'],
				hotelHistory: [],
				hotelId: '1780843768552886272'
			};
		},
		onShow() {
			this.hotelHistory = uni.getStorageSync('hotelHistory') || []
		},
		methods: {
			async goFenda() {
				if (!this.hotelId.trim()) {
					uni.showToast({
						title: '请检查酒店id',
						icon: 'none',
					})
					return
				}
				if (!this.hotelHistory.includes(this.hotelId)) {
					this.hotelHistory.push(this.hotelId)
					uni.setStorageSync('hotelHistory', this.hotelHistory)
				}
				try {
					const {
						token,
						refreshToken
					} = await this.loginOpen()
					window.open(`${target}?a=${token}&r=${refreshToken}&referrer=${location}}`, '_self')
				} catch (e) {
					uni.showToast({
						title: e.data.message ?? '登录失败',
						icon: 'none'
					})
				}
			},
		
			async getSecretFromService() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'http://192.168.75.32:3000/getSecret',
						method: 'GET',
						data: {},
						success: res => {
							console.log('secret res: ', res)
							resolve(res.data)
						},
						fail: e => {
							console.log('secret fail: ', e)
							reject(e)
						}
					})
				})
			},
		
			async loginOpen() {
				return new Promise(async (resolve, reject) => {
					uni.request({
						url: 'https://dev-shc-open.tkt-innovations.com/open/union/hotel/login',
						method: 'POST',
						data: {
							hotelId: this.hotelId,
							// secret: getSecret()
							secret: await this.getSecretFromService()
						},
						success: res => {
							const {
								token,
								refreshToken
							} = res.data.data;
							if (res.data.code === 200 && token) {
								console.log('loginOpen ==> success', res)
								resolve({
									token,
									refreshToken
								})
							} else {
								console.log('loginOpen ==> 请求成功，但是登录失败')
								reject(res)
							}
						},
						fail: e => {
							conole.log('loginOpen ==> fail', e)
							reject(e)
						}
					})
				})
			},
		
			copyToInter(e) {
				this.hotelId = e
			}
		}
	}
</script>

<style>

</style>