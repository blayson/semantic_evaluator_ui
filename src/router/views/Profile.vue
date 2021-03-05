<template>
  <div>
    <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        v-if="isLoading"
        indeterminate
    ></v-progress-circular>
    <div v-else>
      <p>Name: {{userInfo.name}}</p>
<!--      <p>Surname: {{userInfo.surname}}</p>-->
<!--      <p>Login: {{userInfo.login}}</p>-->
      <p>Email: {{userInfo.email}}</p>
<!--      <p>Gender: {{userInfo.gender}}</p>-->
<!--      <p>Registered: {{userInfo.registered}}</p>-->
    </div>
    <v-btn>Edit</v-btn>
  </div>
</template>

<script>
import {UPDATE_INTERVAL} from "@/code/constants";

export default {
  name: "Profile",
  data() {
    return {
      userInfo: null,
      isLoading: true,
      timer: null,
    }
  },
  methods: {
    async loadUser() {
      try {
        // const response = await this.$http.get(`/users/${this.$route.params.id}`);
        const response = await this.$http.get(`/users`);
        this.userInfo = response.data;
      } catch (e) {
        // await this.$router.push({name: "notFound"});
      }
      this.isLoading = false;
    }

  },
  mounted() {
    this.loadUser();
    this.timer = setInterval(this.loadInfo, UPDATE_INTERVAL);
  },


  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>

</style>
