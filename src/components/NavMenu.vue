<template>
  <div class="nav-body">
    <div class="logo-wrapper">
      <img src="../assets/testImg.jpg" alt="logo" />
    </div>

    <template v-if="일반관리자">
      <div class="user-info">
        <h2 class="title">관리자 정보</h2>
        <span>이름: {{ user.name }}</span>
        <span>소속: {{ user.belong }}</span>
        <span>연락처: {{ user.phone }}</span>
      </div>

      <div class="btn-container">
        <div class="link-btn">
          <router-link to="/admin/practice" class="result-page" :class="{ 'cur-page': $route.path === '/admin/practice' }">실습 결과</router-link>
          <router-link to="/admin/student" class="student-page" :class="{ 'cur-page': $route.path === '/admin/student' }">학생 정보</router-link>
        </div>
        <button class="btn logout" @click="logout()">로그아웃</button>
      </div>
    </template>

    <template v-else-if="슈퍼관리자" class="user-info">
      <div class="info-container">
        <h2 class="title">슈퍼관리자</h2>
        <button class="btn logout" @click="logout()">로그아웃</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "테스트",
        belong: "오르카소프트",
        phone: "010-***-***",
      },
      일반관리자: true,
      슈퍼관리자: false,
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.nav-body {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #edf2ff;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;

  padding: 30px 13px;
}

.logo-wrapper {
  border-radius: 50%;
  width: 130px;
  height: 130px;
  overflow: hidden;
  margin-bottom: 28px;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.title {
  margin-bottom: 10px;
  font-weight: bold;
}

.user-info {
  width: 100%;
  padding: 25px 16px;
  background-color: #fff;
  margin-bottom: 32px;
}

.user-info > span {
  font-size: 14px;
}

.info-container,
.btn-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.result-page,
.student-page {
  background-color: #7993fc;
  margin-bottom: 8px;
  border-radius: 4px;
  padding: 10px 25px;
  text-align: center;
  color: #fff;
}

.cur-page {
  background-color: #364fc7;
}

.link-btn {
  margin-bottom: 395px;
}
</style>
