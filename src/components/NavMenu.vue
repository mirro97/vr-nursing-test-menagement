<template>
  <div class="nav-body">
    <div class="logo-wrapper">
      <i v-if="!adminType" class="fas fa-user-cog"></i>
      <i v-if="adminType" class="fas fa-user-edit"></i>
    </div>

    <template v-if="adminType">
      <div class="user-info">
        <div class="info-container">
          <h2 class="title">관리자 정보</h2>
          <button class="btn logout" @click="logout()">로그아웃</button>
        </div>
        <span>이름: {{ user.name }}</span>
        <span>소속: {{ user.belong }}</span>
        <span>연락처: {{ user.phone }}</span>
      </div>

      <div class="btn-container">
        <div class="link-btn">
          <router-link to="/admin/practice" class="result-page" :class="{ 'cur-page': $route.path === '/admin/practice' }">실습 결과</router-link>
          <router-link to="/admin/student" class="student-page" :class="{ 'cur-page': $route.path === '/admin/student' }">학생 정보</router-link>
        </div>
      </div>
    </template>

    <div v-else-if="!adminType" class="user-info">
      <div class="info-container">
        <h2 class="title">슈퍼관리자</h2>
        <button class="btn logout" @click="logout()">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: this.$store.state.admin.name,
        belong: this.$store.state.admin.company,
        phone: this.$store.state.admin.phoneNumber,
      },
      adminType: false, // true 면 admin, false 면 manager
    }
  },
  created() {
    const curType = this.$store.state.admin.type
    if (curType === "admin") this.adminType = false
    else if (curType === "manager") this.adminType = true
  },
  methods: {
    logout() {
      this.$router.push("/login")
    },
  },
}
</script>

<style scoped>
.nav-body {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #184d47;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;

  padding: 30px 13px;
}
.logo-wrapper {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 28px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fas {
  font-size: 60px;
  margin-left: 10px;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.title {
  font-weight: bold;
}

.user-info {
  width: 100%;
  padding: 25px 16px;
  background-color: #fff;
  margin-bottom: 32px;
  border-radius: 4px;
}

.user-info > span {
  font-size: 14px;
}

.info-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.btn.logout {
  padding: 3px 6px;
}

.logout {
  font-size: 12px;
}

.btn-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.result-page,
.student-page {
  background-color: #f1f7e7;
  margin-bottom: 8px;
  border-radius: 4px;
  padding: 10px 25px;
  text-align: center;
  color: #495057;
}

.cur-page {
  background-color: #cee5d0;
}
</style>
