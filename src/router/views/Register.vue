<template>
  <div>
    <h2>Register</h2>
    <v-form @submit.prevent="doRegister" class="form">
      <v-row>
<!--        <v-col class="form-item">-->
<!--          <label>Login: </label>-->
<!--          <v-text-field-->
<!--              type="text" v-model="userData.login" required-->
<!--          ></v-text-field>-->

<!--        </v-col>-->
        <v-col class="form-item">
          <label>Email: </label>
          <v-text-field
              placeholder="test@example.com"
              type="text" v-model="userData.email" required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="form-item">
          <label>Name: </label>
          <v-text-field
              type="text" v-model="userData.name" required
          ></v-text-field>
        </v-col>
<!--        <v-col class="form-item">-->

<!--          <label>Surname: </label>-->
<!--          <v-text-field-->
<!--              type="text" v-model="userData.surname" required-->
<!--          ></v-text-field>-->
<!--        </v-col>-->
      </v-row>
      <v-row>
        <v-col class="form-item">
          <label>Password: </label>
          <v-text-field
              type="password" v-model="userData.password1" required
          ></v-text-field>
        </v-col>
        <v-col class="form-item">
          <label>Password again: </label>
          <v-text-field
              type="password" v-model="userData.password2" required
          ></v-text-field>
        </v-col>
      </v-row>
<!--      <v-row>-->
<!--        <v-col class="form-item col-6">-->
<!--          <v-select-->
<!--              :items="genders"-->
<!--              v-model="userData.gender"-->
<!--              label="Gender"-->
<!--              required-->
<!--          ></v-select>-->
<!--        </v-col>-->
<!--      </v-row>-->
      <v-row>
        <v-btn color="success" type="submit" class="form-submit">Register</v-btn>
      </v-row>
      <v-row>
        <div v-if="error != null" class="form-error">
          {{error}}
        </div>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      userData: {
        // login: "",
        email: "",
        name: "",
        // surname: "",
        password1: "",
        password2: "",
        // gender: null,
      },
      // genders: [
      //   "male",
      //   "female"
      // ],
      error: null
    }
  },
  methods: {
    async doRegister() {
      const {password1, password2} = this.userData
      if (password1 === password2 && password1.length > 4) {
        const payload = {
          ...this.userData,
          password1: undefined,
          password2: undefined,
          password: this.userData.password1
        }
        try {
          await this.$http.post("/auth/register", payload)
          await this.$router.push({name: "login"})
        } catch (e) {
          if (e.response.status === 409) {
            await this.$router.push({name: "FoundUser"});
          } else {
            await this.$router.push({name: "notFound"});

          }
        }
      } else {
        this.error = "Passwords not matches"
      }
    }
  }
}
</script>

<style scoped>
</style>
