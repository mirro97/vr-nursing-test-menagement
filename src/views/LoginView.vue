<template>
  <div class="login-body">
    <div class="login-container">
      <h1 class="title">로그인</h1>
      <form class="login-form" @submit.prevent="signIn">
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
    };
  },
  methods: {
    signIn() {
      console.log("로그인버튼 누름");
      if (this.userId === "p") this.$router.push("/admin/practice");
      else if (this.userId === "s") this.$router.push("/admin/superAdmin");
    },
  },
};
</script>

<style scoped>
.login-body {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  border: 1px solid #e5e5e5;
  padding: 60px 70px;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
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
