<template>
  <div>
    <h2>Login</h2>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
        ></v-text-field>
        <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="doLogin"
        >
          Login
        </v-btn>
      </v-form>
    </template>
  </div>
</template>

<script>
import {tokenManager} from "@/main";

export default {
  name: "Email",
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      emailRules: [
        v => !!v || "Login is required"
      ],
      passwordRules: [
        v => !!v || "Password is required"
      ]
    }
  },
  methods: {
    async doLogin() {
      try {
        this.$refs.form.validate();
        const response = await this.$http.post(
            "/auth/login",
            {
              email: this.email,
              password: this.password
            })
        const {token} = response.data
        tokenManager.setToken(token)
        const {userId} = tokenManager.getPayload()
        this.$emit("userLogged", {userId})
        await this.$router.push('profile')
      } catch (e) {
        if (e.response.status === 401) {
          if (e.response.status === 401) {
            await this.$router.push({name: "notFoundUser"});
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
