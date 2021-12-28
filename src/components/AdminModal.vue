<template>
  <section class="s-modal">
    <div class="modal">
      <h2 class="m-title">관리자 정보 {{ modalState }}</h2>
      <div class="input-container">
        <div class="m-row">
          <label for="userId">아이디: </label>
          <input v-if="modalState === '추가'" type="text" id="userId" v-model="admin.id" />
          <input v-if="modalState === '수정'" type="text" id="userId" v-model="admin.id" readonly />
        </div>
        <div class="m-row">
          <label for="userPw">비밀번호: </label>
          <input type="text" id="userPw" v-model="admin.password" />
        </div>
        <div class="m-row">
          <label for="name">이름: </label>
          <input type="text" id="name" v-model="admin.name" />
        </div>
        <div class="m-row">
          <label for="company">소속: </label>
          <input type="text" id="company" v-model="admin.company" />
        </div>
        <div class="m-row">
          <label for="phone">연락처: </label>
          <input type="text" id="phone" v-model="admin.phoneNumber" />
        </div>
      </div>
      <div class="btn-container">
        <button v-if="modalState === '추가'" class="btn add" @click="addInfo()">{{ modalState }}</button>
        <button v-if="modalState === '수정'" class="btn modify" @click="modifyInfo()">{{ modalState }}</button>
        <button class="btn cancel" @click="close">취소하기</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    modalState: String,
    managerId: String,
  },
  data() {
    return {
      admin: {},
    }
  },
  created() {
    this.getManagerInfo()
  },
  methods: {
    async getManagerInfo() {
      if (this.managerId) {
        const managerInfo = await this.axios.post("/api/admin/findManager", { id: this.managerId })
        this.admin = managerInfo.data.oResult.adminInfo
      } else if (this.managerId === null) {
        this.admin = {}
      }
    },
    async modifyInfo() {
      await this.axios.post("/api/admin/updateManager", {
        idx: this.admin.idx,
        id: this.admin.id,
        password: this.admin.password,
        name: this.admin.name,
        company: this.admin.company,
        phoneNumber: this.admin.phoneNumber,
      })
      alert("사용자 정보가 수정되었습니다")
      this.close()
    },
    async addInfo() {
      await this.axios.post("/api/admin/insertManager", {
        id: this.admin.id,
        password: this.admin.password,
        name: this.admin.name,
        company: this.admin.company,
        phoneNumber: this.admin.phoneNumber,
      })
      alert("사용자 정보가 추가되었습니다")
      this.close()
    },
    close() {
      this.$emit("close")
    },
  },
}
</script>

<style scoped>
.s-modal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  padding: 50px;
  background-color: #fff;
  width: 500px;
  height: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.m-title {
  font-size: 21px;
}

.input-container {
  width: 100%;
}

.m-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.m-row > input {
  margin-left: 20px;
  padding: 7px 10px;
  width: 75%;
}

.m-row:last-child {
  margin-bottom: 0;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}

.btn:first-child {
  margin-right: 5px;
}
</style>
