<template>
  <div class="login-body">
    <div class="login-container">
      <h1 class="title">VEMC LOGIN!</h1>
      <form class="login-form" @submit.prevent="adminlogIn">
        <div class="input-wrapper">
          <label for="userId"> ID </label>
          <input class="input-id" type="text" id="userId" v-model="userId" />
        </div>

        <div class="input-wrapper">
          <label for="userPw"> PW </label>
          <input class="input-pw" type="password" id="userPw" v-model="userPw" />
        </div>

        <button class="btn login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      userId: "",
      userPw: "",
    }
  },
  methods: {
    async adminlogIn() {
      try {
        await this.$store
          .dispatch("adminlogIn", {
            id: this.userId,
            password: this.userPw,
          })
          .then(() => {
            const curType = this.$store.state.admin.type
            this.redirect(curType)
          })
      } catch (e) {
        console.error(e)
      }
    },
    redirect(type) {
      if (type === "admin") this.$router.push("/admin/superAdmin")
      else if (type === "manager") this.$router.push("/admin/practice")
    },
  },
}
</script>

<style scoped>
.login-body {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d7d7d6;
}

.login-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 60px 70px;
  box-shadow: 2px 2px 10px 0px rgb(56 56 56 / 5%);
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.input-wrapper > label {
  margin-right: 10px;
}

.input-id,
.input-pw {
  height: 43px;
  padding: 0 12px;
}
</style>
