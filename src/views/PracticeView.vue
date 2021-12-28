<template>
  <section class="result-body">
    <div class="padding-body">
      <div class="table-container search-container">
        <select class="select-type" v-model="selectedType">
          <option value="" disabled>타입선택(이름, 학번, 시나리오)</option>
          <option value="이름">이름</option>
          <option value="학번">학번</option>
          <option value="시나리오">시나리오</option>
        </select>
        <input class="search-input" v-model="searchItem" type="text" name="" id="" placeholder="검색" @keyup.enter="search" />
        <button class="btn search" @click="search">조회</button>
      </div>
      <div class="table-container">
        <div class="search-result">검색결과 {{ practicecInfos.length }} 건</div>
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
          <div class="table-body" v-for="(info, infoIndex) in practicecInfos" :key="infoIndex">
            <div>{{ info.name }}</div>
            <div>{{ info.studentId }}</div>
            <div>{{ info.scenario }}</div>
            <div>{{ info.timeTaken }}</div>
            <div>{{ info.ex1 }}</div>
            <div>{{ info.ex2 }}</div>
            <div>{{ info.ex3 }}</div>
            <div>{{ info.ex4 }}</div>
            <div>{{ info.ex5 }}</div>
            <div>{{ info.ex6 }}</div>
            <div>{{ info.round }}</div>
          </div>
        </div>

        <div class="icon-container">
          <div class="icon-wrapper" title="download" @click="downloadExcel()">
            <i class="fas fa-download"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
  <loading ref="loading" />
</template>

<script>
import loading from "../components/Loading.vue"
export default {
  components: {
    loading,
  },
  data() {
    return {
      practicecInfos: {},
      selectedType: "",
      searchItem: "",
    }
  },
  created() {
    this.getPracticeInfo()
  },
  mounted() {
    this.$refs.loading.isShow(true)
  },
  methods: {
    async getPracticeInfo() {
      const getPracticeData = await this.axios.post("/api/manager/findTestInfoList", {})
      this.practicecInfos = getPracticeData.data.oResult.testInfos
      this.$refs.loading.isShow(false)
    },
    async search() {
      this.$refs.loading.isShow(true)
      if (this.selectedType === "이름") {
        const result = await this.axios.post("/api/manager/findTestInfoList", { studentName: this.searchItem })
        this.practicecInfos = result.data.oResult.testInfos
      } else if (this.selectedType === "학번") {
        const result = await this.axios.post("/api/manager/findTestInfoList", { studentId: this.searchItem })
        this.practicecInfos = result.data.oResult.testInfos
      } else if (this.selectedType === "시나리오") {
        const result = await this.axios.post("/api/manager/findTestInfoList", { scenario: this.searchItem })
        this.practicecInfos = result.data.oResult.testInfos
      }
      this.$refs.loading.isShow(false)
    },
    async downloadExcel() {
      let url = "/api/manager/excelDownloadTestInfoList"
      let data = {}
      if (this.selectedType === "이름") data.studentName = this.searchItem
      else if (this.selectedType === "학번") data.studentId = this.searchItem
      else if (this.selectedType === "시나리오") data.scenario = this.searchItem

      await this.axios({
        methods: "get",
        url: url,
        responseType: "blob",
        params: data,
      }).then((res) => {
        if (res) {
          let name = res.headers["content-disposition"].split("filename=")[1]
          name = decodeURIComponent(name)
          const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }))
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", name)
          document.body.appendChild(link)
          link.click()

          document.body.removeChild(link)
        }
      })
    },
  },
}
</script>

<style scoped>
.result-body {
  width: 100%;
  min-width: 1200px;
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
  background-color: #d6efc7;
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
