<template>
  <div>
    <ul>
      <li>
        <router-link :to="{ name: 'home'}">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'contacts'}">Contacts</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'pages', params: { page: 'about' }}">Pages - about</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login'}">Login</router-link>
      </li>
      <li>
        <v-btn @click="logout()" dark>Logout</v-btn>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'Links',
    methods: {
      logout () {
        this.$auth.logout({
          makeRequest: false,
          success: () => {
            console.log('Logout success')
          },
          redirect: '/'
        })
      }
    }
  }
</script>
