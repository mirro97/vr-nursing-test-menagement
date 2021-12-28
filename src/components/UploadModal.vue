<template>
  <section class="registerModal">
    <div class="select-wrapper">
      <form>
        <input id="file" ref="excelFile" name="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
      </form>

      <div class="submit-wrapper">
        <button class="btn modify" @click="submitBefore">저장 Save</button>
        <button class="btn cancel" @click="close">취소</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close")
    },
    async uploadMenu() {
      const formData = new FormData()
      formData.append("file", this.$refs.excelFile.files[0])
      await this.axios.post("/api/manager/excelUploadStudentInfoList", formData)
      alert("업로드를 완료했습니다")
    },
    submitBefore() {
      const fileCheck = document.getElementById("file").value
      if (!fileCheck) {
        alert("파일을 첨부해 주세요")
        return false
      } else {
        const fileKind = fileCheck.lastIndexOf(".")
        const fileName = fileCheck.substring(fileKind + 1, fileCheck.length)
        const fileType = fileName.toLowerCase()

        if (this.isXls(fileType)) {
          this.uploadMenu()
        } else {
          alert("올바른 파일이 아닙니다")
          return false
        }
      }
    },
    isXls(filename) {
      const ext = filename
      switch (ext.toLowerCase()) {
        case "xlsx":
        case "xls":
        case "csv":
          return true
      }
      return false
    },
  },
}
</script>

<style scoped>
.registerModal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
}

.select-wrapper {
  background-color: #fff;
  padding: 35px 50px;
}

.submit-wrapper {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-wrapper > button:first-child {
  margin-left: 0;
}

.select {
  margin-right: 10px;
}

.modify {
  margin-right: 5px;
}
</style>
