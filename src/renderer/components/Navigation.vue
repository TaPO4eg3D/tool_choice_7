<template>
  <div class='navigation'>
    <router-link to="/" href="#">Главная</router-link>
    <router-link to="/alternatives">Альтернативы</router-link>
    <router-link to="/criterias">Критерии</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
}
</script>

<style>
.navigation {
  margin: 0px;
  background-color: gray;

  display: flex;
  list-style: none;
  text-decoration: none;
}

.router-link-exact-active {
  background-color: #595959;
}

a {
  color: #fff;
  display: block;
  padding: 20px 30px;
  text-decoration: none;
}

a:hover {
  background-color: #595959;
}


</style>
