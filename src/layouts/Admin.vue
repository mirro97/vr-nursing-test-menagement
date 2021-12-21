<template>
  <NavMenu />
  <router-view></router-view>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
export default {
  components: { NavMenu },
};
</script>

<style scoped></style>
