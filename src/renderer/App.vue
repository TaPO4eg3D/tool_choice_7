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

button {
  cursor: pointer;
  padding: 20px;

  color: #fff;
  border: none;
  border-radius: 6px;
  background-color: #00aacc;

  font-weight: 600;

  text-transform: uppercase;
  transition: .5s ease background-color;
}

button:hover {
  background-color: #0088a3;
}

</style>
