<template>
  <section class="result-body">
    <div class="padding-body">
      <div class="table-container search-container">
        {{ selected }}
        <select class="select-type" v-model="selected">
          <option value="" disabled>타입선택(이름, 학번, 시나리오)</option>
          <option value="이름">이름</option>
          <option value="학번">학번</option>
          <option value="시나리오">시나리오</option>
        </select>
        <input class="search-input" v-model="searchItem" type="text" name="" id="" placeholder="검색" />
        <button class="btn search" @click="search">조회</button>
      </div>
      <div class="table-container">
        <div class="search-result">검색결과 {{ count }} 건</div>
        <div class="result-table">
          <div class="table-header">
            <div>이름</div>
            <div>학번</div>
            <div>시나리오명</div>
            <div>시간</div>
            <div>문제1</div>
            <div>문제2</div>
            <div>문제3</div>
            <div>문제4</div>
            <div>문제5</div>
            <div>문제6</div>
            <div>회차</div>
          </div>
          <div class="table-body">
            <!-- <div class="table-body" v-for="(info, infoIndex) in pResult" :key="infoIndex"> -->
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
            <div>테스트</div>
          </div>
        </div>

        <div class="icon-container">
          <div class="icon-wrapper" title="download">
            <i class="fas fa-download"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pResult: {},
      selected: "",
      searchItem: "",
      count: 0,
    };
  },
  methods: {
    selectType() {
      console.log(event.target.value);
    },
    search() {
      console.log("검색할 단어: ", this.searchItem);
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
  padding: 41px 47px 0 47px;
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
  grid-template-columns: 2fr 2fr 3fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr;
  width: 100%;
}

.table-header {
  background-color: #dbe4ff;
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
  justify-content: flex-end;
}

.fas {
  font-size: 24px;
}
</style>
