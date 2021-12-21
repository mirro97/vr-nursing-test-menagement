<template>
  <section class="s-modal">
    <div class="modal">
      <h2 class="m-title">학생정보 {{ modalState }}</h2>
      <div class="input-container">
        <div class="m-row">
          <label for="name">이름: </label>
          <input type="text" id="name" />
        </div>
        <div class="m-row">
          <label for="studentId">학번: </label>
          <input type="text" id="studentId" />
        </div>
        <div class="m-row">
          <label for="dateOfB">생년월일: </label>
          <input type="text" id="dateOfB" />
        </div>
        <div class="m-row">
          <label for="phone">연락처: </label>
          <input type="text" id="phone" />
        </div>
      </div>
      <div class="btn-container">
        <button class="btn add">{{ modalState }}</button>
        <button class="btn" @click="close">취소하기</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    modalState: String,
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
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
