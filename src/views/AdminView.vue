<template>
  <section class="result-body">
    <div class="padding-body">
      <div class="table-container search-container">
        {{ selected }}
        <select class="select-type" v-model="selected">
          <option value="" disabled>타입선택(이름, 소속)</option>
          <option value="이름">이름</option>
          <option value="소속">소속</option>
          <option value="시나리오">시나리오</option>
        </select>
        <input class="search-input" v-model="searchItem" type="text" name="" id="" placeholder="검색" />
        <button class="btn search" @click="search">조회</button>
      </div>
      <div class="table-container">
        <div class="search-result">검색결과 {{ count }} 건</div>
        <div class="result-table">
          <div class="table-header">
            <div><input type="checkbox" class="chk-all" @click="checkAll($event.target.checked)" /></div>
            <div>이름</div>
            <div>소속</div>
            <div>연락처</div>
            <div>아이디</div>
            <div>패스워드</div>
          </div>
          <div class="table-body" @click="modifyInfo()">
            <!-- <div class="table-body" v-for="(info, infoIndex) in pResult" :key="infoIndex"> -->
            <div><input type="checkbox" /></div>
            <div>테스트하는테스터</div>
            <div>오르카소프트</div>
            <div>010-8883-2111</div>
            <div>jkfsdf97</div>
            <div>sdfksdf12!</div>
          </div>
          <div class="table-body" @click="modifyInfo()">
            <!-- <div class="table-body" v-for="(info, infoIndex) in pResult" :key="infoIndex"> -->
            <div><input type="checkbox" /></div>
            <div>테스팅</div>
            <div>오르카소프트</div>
            <div>010-4682-7146</div>
            <div>sdfsdt48</div>
            <div>bnttu!</div>
          </div>
        </div>

        <div class="icon-container">
          <button class="btn delete" @click="deleteInfo()">삭제하기</button>
          <button class="btn add" @click="addInfo()">추가하기</button>
        </div>
      </div>
    </div>
  </section>
  <AdminModal v-if="open" @click.self="close" v-on:close="close" :modalState="curModal" />
</template>

<script>
import AdminModal from "../components/AdminModal.vue";
export default {
  components: {
    AdminModal,
  },
  data() {
    return {
      pResult: {},
      selected: "",
      searchItem: "",
      count: 0,
      curModal: "",
      checkUsers: [],
      open: false,
    };
  },
  methods: {
    selectType() {
      console.log(event.target.value);
    },
    search() {
      console.log("검색할 단어: ", this.searchItem);
    },
    deleteInfo() {
      console.log("삭제하기");
    },
    modifyInfo(userInfo) {
      // 수정하기라 해당 데이터 넘겨야함
      this.open = true;
      this.curModal = "수정";
      console.log("해당 열 수정하기: ", userInfo);
    },
    addInfo() {
      // 추가하기라 데이터 넘길필요x
      this.curModal = "추가";
      this.open = true;
      console.log("추가하기");
    },
    downloadExcel() {
      console.log("엑셀로 다운로드");
    },
    uploadExcel() {
      console.log("엑셀로 업로드");
    },
    checkAll(checked) {
      if (checked) {
        for (const detail in this.detailInfo.dataList) {
          this.checkUsers[detail] = this.detailInfo.dataList[detail].empNo;
        }
      } else {
        this.checkUsers.splice(0, this.checkUsers.length);
      }
    },
    close() {
      this.open = false;
    },
  },
};
</script>

<style scoped>
.result-body {
  width: 100%;
  min-width: 1000px;
  height: 100vh;
  background-color: #f8f9fa;
  padding-left: 200px;
}

.padding-body {
  padding: 41px 70px 0 70px;
}

.search-container {
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.select-type {
  padding: 7px 6px;
}

.search-input {
  padding: 7px 6px;
  margin-right: 4px;
  width: 100%;
}

/* table css */
.result-table {
  width: 100%;
  margin-bottom: 20px;
}

.table-header,
.table-body {
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
}

.table-header {
  background-color: #dbe4ff;
}

.table-body {
  cursor: pointer;
}

.table-header > div,
.table-body > div {
  /* white-space: nowrap; */
  padding: 7px 10px;
  text-align: center;
  font-size: 13px;
}

.table-body > div {
  border-bottom: 1px solid #e5e5e5;
}

.table-container {
  background-color: #fff;
  margin-top: 12px;
  padding: 36px 19px;
  border-radius: 4px;
  box-shadow: 2px 2px 10px 0px rgb(56 56 56 / 5%);
}

.search-result {
  margin-bottom: 5px;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.icon-container > * {
  margin-left: 8px;
}
</style>
