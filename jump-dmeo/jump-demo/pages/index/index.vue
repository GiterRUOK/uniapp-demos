<template>
	<view class="content">
		<!-- #ifdef H5 -->
		<web-hotel-jump></web-hotel-jump>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<mini-jump></mini-jump>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import WebHotelJump from '../../components/web-hotel-jump.vue'
	import MiniJump from '../../components/mini-jump.vue'
</script>

<style>
</style>