<template>
    <web-view :src="url"></web-view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
	  name: ''
    }
  },
  onLoad(e = {}) {
	  try {
	  	const url = decodeURIComponent(e.url)
			this.url = url
	  } catch {}
  },
}
</script>

<style>
</style>
