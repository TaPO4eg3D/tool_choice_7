<template>
  <div class='navigation'>
    <router-link to="/" href="#">Главная</router-link>
    <router-link to="/criterias">Критерии</router-link>
    <router-link to="/alternatives">Варианты</router-link>
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
  background-color: #00aacc;

  display: flex;
  list-style: none;
  text-decoration: none;
}

.router-link-exact-active {
  background-color: #004a59;
}

a {
  color: #fff;
  font-weight: 600;
  display: block;
  padding: 20px 30px;
  text-decoration: none;
  text-transform: uppercase;
  transition: .5s ease background-color;
}

a:hover {
  background-color: #004a59;
}


</style>
