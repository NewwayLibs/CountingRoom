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
                <router-link :to="{ name: 'auth-login'}">Login</router-link>
            </li>
        </ul>

        <v-btn error dark>Error</v-btn>
    </div>

</template>

<script>
  export default {
    name: 'Links'
  }
</script>
