<template>
  <section class="result-body">
    <div class="padding-body">
      <div class="table-container search-container">
        <select class="select-type" v-model="selectedType">
          <option value="" disabled>타입선택(이름, 소속)</option>
          <option value="이름">이름</option>
          <option value="소속">소속</option>
        </select>
        <input class="search-input" v-model="searchItem" type="text" name="" id="" placeholder="검색" @keyup.enter="search" />
        <button class="btn search" @click="search">조회</button>
      </div>
      <div class="table-container">
        <div class="search-result">검색결과 {{ managerInfos.length }} 건</div>
        <div class="result-table">
          <div class="table-header">
            <div><input type="checkbox" class="chk-all" v-model="checkAllManagers" @click="checkAll($event.target.checked)" /></div>
            <div>이름</div>
            <div>소속</div>
            <div>연락처</div>
            <div>아이디</div>
            <div>패스워드/type</div>
          </div>
          <div class="table-body" v-for="(info, infoIndex) in managerInfos" :key="infoIndex">
            <div><input type="checkbox" v-model="checkManagers" :value="info.idx" @change="isCheckAll" /></div>
            <div @click="openModifyInfo(info.id)">{{ info.name }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.company }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.phoneNumber }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.id }}</div>
            <div @click="openModifyInfo(info.id)">{{ info.type }}</div>
          </div>
        </div>
        <div class="icon-container">
          <button class="btn delete" @click="deleteInfo()">삭제하기</button>
          <button class="btn add" @click="openAddInfo()">추가하기</button>
        </div>
      </div>
    </div>
  </section>
  <AdminModal v-if="open" @click.self="close" @close="close" :modalState="curModal" :managerId="selectedId" />
  <loading ref="loading" />
</template>

<script>
import AdminModal from "../components/AdminModal.vue"
import loading from "../components/Loading.vue"
export default {
  components: {
    AdminModal,
    loading,
  },
  data() {
    return {
      managerInfos: {},
      selectedType: "",
      searchItem: "",
      selectedId: "",
      curModal: "",
      checkManagers: [],
      checkAllManagers: false,
      open: false,
    }
  },
  created() {
    this.getManagerInfo()
  },
  mounted() {
    this.$refs.loading.isShow(true)
  },
  methods: {
    async getManagerInfo() {
      const getManagerData = await this.axios.post("/api/admin/findManagerList", {})
      this.managerInfos = getManagerData.data.oResult.adminInfos
      this.$refs.loading.isShow(false)
    },
    async search() {
      this.$refs.loading.isShow(true)
      if (this.selectedType === "이름") {
        const getManagerData = await this.axios.post("/api/admin/findManagerList", { name: this.searchItem })
        this.managerInfos = getManagerData.data.oResult.adminInfos
      } else if (this.selectedType === "소속") {
        const getManagerData = await this.axios.post("/api/admin/findManagerList", { company: this.searchItem })
        this.managerInfos = getManagerData.data.oResult.adminInfos
      }
      this.$refs.loading.isShow(false)
    },
    async deleteInfo() {
      await this.axios.post("/api/admin/deleteManagerList", { idList: this.checkManagers })
      this.checkManagers = []
      this.getManagerInfo()
    },
    async openModifyInfo(managerId) {
      this.open = true
      this.curModal = "수정"
      this.selectedId = managerId
    },
    openAddInfo() {
      this.curModal = "추가"
      this.open = true
      this.selectedId = ""
    },
    checkAll(checked) {
      if (checked) {
        for (const info in this.managerInfos) {
          this.checkManagers[info] = this.managerInfos[info].idx
        }
      } else {
        this.checkManagers.splice(0, this.checkManagers.length)
      }
    },
    isCheckAll() {
      this.checkManagers.length === this.managerInfos.length ? (this.checkAllManagers = true) : (this.checkAllManagers = false)
    },
    close() {
      this.getManagerInfo()
      this.open = false
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
  grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr 1fr;
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
</style>
