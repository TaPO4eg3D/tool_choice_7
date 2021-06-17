<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'tool-choice',
  components: {
    Navigation,
  }
}
</script>

<style>
body, html {
  margin: 0px;
  padding: 0px;
}
</style>
