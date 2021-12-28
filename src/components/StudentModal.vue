<template>
  <section class="s-modal">
    <div class="modal">
      <h2 class="m-title">학생정보 {{ modalState }}</h2>
      <div class="input-container">
        <div class="m-row">
          <label for="name">이름: </label>
          <input type="text" id="name" v-model="student.name" />
        </div>
        <div class="m-row">
          <label for="studentId">학번: </label>
          <input type="text" id="studentId" v-model="student.id" />
        </div>
        <div class="m-row">
          <label for="dateOfB">생년월일: </label>
          <input type="text" id="dateOfB" v-model="student.password" />
        </div>
        <div class="m-row">
          <label for="phone">연락처: </label>
          <input type="text" id="phone" v-model="student.phoneNumber" />
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
    studentId: String,
  },
  data() {
    return {
      student: {},
    }
  },
  created() {
    this.getStudentInfo()
  },
  methods: {
    async getStudentInfo() {
      if (this.studentId) {
        const studentInfo = await this.axios.post("/api/manager/findStudentInfo", { id: this.studentId })
        this.student = studentInfo.data.oResult.studentInfo
      } else if (this.studentId === null) {
        this.student = {}
      }
    },
    async modifyInfo() {
      await this.axios.post("/api/manager/updateStudentInfo", {
        idx: this.student.idx,
        id: this.student.id,
        password: this.student.password,
        name: this.student.name,
        phoneNumber: this.student.phoneNumber,
      })
      alert("사용자 정보가 수정되었습니다")
      this.close()
    },
    async addInfo() {
      await this.axios.post("/api/manager/insertStudentInfo", {
        id: this.student.id,
        password: this.student.password,
        name: this.student.name,
        phoneNumber: this.student.phoneNumber,
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
  height: 410px;
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
