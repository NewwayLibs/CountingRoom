<template>
  <footer id="footer">
    <ul>
      <li>
        <router-link :to="{ name: 'home'}">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'contacts'}">Contacts</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'pages', params: { page: 'about' }}">About</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'pages', params: { page: 'faq' }}">Faq</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'pages', params: { page: 'error' }}">With error</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login'}">Login</router-link>
      </li>
    </ul>
  </footer>

</template>

<script>
  export default {
    name: 'appFooter'
  }
</script>
<style lang="sass">
  #footer
    position: absolute
    bottom: 0
    width: 100%
    text-align: center
    height: 120px

    ul
      li
        display: inline-block
        margin: 0 20px

</style>

