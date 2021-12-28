import { createStore } from "vuex"
import axios from "axios"
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    admin: {
      company: "",
      id: "",
      name: "",
      phoneNumber: "",
      type: "",
    },
  },
  mutations: {
    SET_TYPE(state, adminInfo) {
      if (adminInfo) {
        state.admin.company = adminInfo.company
        state.admin.id = adminInfo.id
        state.admin.name = adminInfo.name
        state.admin.phoneNumber = adminInfo.phoneNumber
        state.admin.type = adminInfo.type
      }
    },
  },
  actions: {
    async adminlogIn({ commit }, { id, password }) {
      return await axios.post("/api/auth/loginAdmin", { id, password }).then((res) => {
        if (!res.data.bResult) {
          console.log("로그인 실패")

          throw new Error("로그인에 실패했습니다.")
        } else {
          commit("SET_TYPE", res.data.oResult.adminInfo)
        }
      })
    },
  },
  plugins: [createPersistedState()],
})
