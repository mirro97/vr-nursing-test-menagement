<template>
  <div class="page">
    <img class="page-icon" src="../assets/paging/paging_first.png" alt="page left" @click="movePageWithIcon(1)" />
    <img class="page-icon" src="../assets/paging/paging_prev.png" alt="page prev" @click="movePageWithIcon(2)" />
    <ul v-for="(index, i) in range()" :key="i">
      <li :class="{ selected: index == currentPage }" class="page-index" @click="changePage(index)">{{ index }}</li>
    </ul>
    <img class="page-icon" src="../assets/paging/paging_next.png" alt="page next" @click="movePageWithIcon(3)" />
    <img class="page-icon" src="../assets/paging/paging_last.png" alt="page last" @click="movePageWithIcon(4)" />
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    listSize: {
      type: Number,
      default: 10,
    },
    pageItemCount: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    maxPage() {
      return Math.ceil(this.count / this.pageItemCount) // listsize 가 12면 maxPage 는 2임
    },
    range() {
      const list = []
      const curFirstPageIndex = this.currentPage - ((this.currentPage - 1) % this.listSize)
      let curLastPageIndex = curFirstPageIndex + this.listSize - 1

      if (curLastPageIndex >= this.maxPage()) {
        curLastPageIndex = this.maxPage()
      }

      for (let i = curFirstPageIndex; i <= curLastPageIndex; i++) {
        list.push(i)
      }
      return list
    },
    changePage(currentPage) {
      this.$emit("loadBoardList", currentPage)
    },
    movePageWithIcon(dir) {
      let toPage = this.currentPage
      switch (dir) {
        case 1:
          toPage = 1
          break
        case 2:
          toPage -= 1
          if (toPage < 1) toPage = 1
          break
        case 3:
          toPage += 1
          if (toPage >= this.maxPage()) {
            toPage = this.maxPage()
            if (this.maxPage() === 1) toPage = 1
          }
          break
        case 4:
          toPage = this.maxPage()
          if (toPage < 1) toPage = 1
          break
      }
      this.$emit("loadBoardList", toPage)
    },
  },
}
</script>

<style scoped>
.selected {
  text-decoration: underline;
}

/* pageing css */
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;
}

.page-index {
  padding: 10px;
}

.page-icon:hover,
.page-index:hover {
  cursor: pointer;
}

.page-icon {
  width: 22px;
  height: fit-content;
}
</style>
