<template>
  <div v-if="loading" z-index="10000" class="loading-page">
    <img src="../assets/progress.gif" alt="loading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    isShow(isShow) {
      this.loading = isShow
    },
  },
}
</script>

<style scoped>
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(71, 71, 71, 0.466);
}

.loading-page img {
  width: 240px;
}
</style>
