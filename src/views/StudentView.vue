<template>
  <section class="result-body">
    <div class="padding-body">
      <div class="table-container search-container">
        <select class="select-type" v-model="selectedType">
          <option value="" disabled>타입선택(이름, 학번)</option>
          <option value="이름">이름</option>
          <option value="학번">학번</option>
        </select>
        <input class="search-input" v-model="searchItem" type="text" name="" id="" placeholder="검색" @keyup.enter="search" />
        <button class="btn search" @click="search">조회</button>
      </div>
      <div class="table-container">
        <div class="search-result">검색결과 {{ studentInfos.length }} 건</div>
        <div class="result-table">
          <div class="table-header">
            <div><input type="checkbox" class="chk-all" v-model="checkAllStudents" @click="checkAll($event.target.checked)" /></div>
            <div>이름</div>
            <div>학번</div>
            <div>생년월일</div>
            <div>전화번호</div>
          </div>
          <div class="table-body" v-for="(info, infoIndex) in studentInfos" :key="infoIndex">
            <div><input type="checkbox" v-model="checkStudents" :value="info.idx" @change="isCheckAll" /></div>
            <div @click="openModifyInfo(info.id)">{{ info.name }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.id }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.registerId }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.phoneNumber }}</div>
          </div>
        </div>

        <div class="icon-container">
          <button class="btn delete" @click="deleteInfo()">삭제하기</button>
          <button class="btn add" @click="openAddInfo()">추가하기</button>

          <div class="icon-wrapper" @click="downloadExcel()" title="download">
            <i class="fas fa-download"></i>
          </div>

          <div class="icon-wrapper" @click="uploadExcel()" title="upload">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
  <StudentModal v-if="open" @click.self="close" @close="close" :modalState="curModal" :studentId="selectedId" />
  <UploadModal v-if="uploadOpen" @click.self="close" @close="close" />
  <loading ref="loading" />
</template>

<script>
import StudentModal from "../components/StudentModal.vue"
import UploadModal from "../components/UploadModal.vue"
import loading from "../components/Loading.vue"
export default {
  components: {
    StudentModal,
    UploadModal,
    loading,
  },
  data() {
    return {
      studentInfos: {},
      selectedType: "",
      searchItem: "",
      selectedId: "",
      curModal: "",
      checkStudents: [],
      checkAllStudents: false,
      open: false,
      uploadOpen: false,
    }
  },
  created() {
    this.getStudentInfo()
  },
  mounted() {
    this.$refs.loading.isShow(true)
  },
  methods: {
    async getStudentInfo() {
      const getData = await this.axios.post("/api/manager/findStudentInfoList", {})
      this.studentInfos = getData.data.oResult.studentInfos
      this.$refs.loading.isShow(false)
    },
    async search() {
      this.$refs.loading.isShow(true)
      if (this.selectedType === "이름") {
        const getData = await this.axios.post("/api/manager/findStudentInfoList", { name: this.searchItem })
        this.studentInfos = getData.data.oResult.studentInfos
      } else if (this.selectedType === "학번") {
        const getData = await this.axios.post("/api/manager/findStudentInfoList", { id: this.searchItem })
        this.studentInfos = getData.data.oResult.studentInfos
      }
      this.$refs.loading.isShow(false)
    },
    async deleteInfo() {
      await this.axios.post("/api/manager/deleteStudentInfoList", { idList: this.checkStudents })
      this.checkStudents = []
      this.getStudentInfo()
    },
    async openModifyInfo(studentId) {
      this.open = true
      this.curModal = "수정"
      this.selectedId = studentId
    },
    openAddInfo() {
      this.curModal = "추가"
      this.open = true
      this.selectedId = ""
    },
    async downloadExcel() {
      let url = "/api/manager/excelDownloadStudentInfoList"
      let data = {}
      if (this.selectedType === "이름") {
        data.name = this.searchItem
      } else if (this.selectedType === "학번") {
        data.id = this.searchItem
      }
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
    uploadExcel() {
      this.uploadOpen = true
    },
    close() {
      this.getStudentInfo()
      this.uploadOpen = false
      this.open = false
    },
    checkAll(checked) {
      if (checked) {
        for (const info in this.studentInfos) {
          this.checkStudents[info] = this.studentInfos[info].idx
        }
      } else {
        this.checkStudents.splice(0, this.checkStudents.length)
      }
    },
    isCheckAll() {
      this.checkStudents.length === this.studentInfos.length ? (this.checkAllStudents = true) : (this.checkAllStudents = false)
    },
  },
}
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
  grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr;
  width: 100%;
}

.table-header {
  background-color: #d6efc7;
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

.fas {
  font-size: 24px;
}

.icon-wrapper:first-child {
  margin-right: 8px;
}
</style>
