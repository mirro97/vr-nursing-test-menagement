<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
* {
  box-sizing: border-box;
  color: #495057;
  margin: 0px;
  padding: 0px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
}

body {
  width: 100%;
  height: 100vh;
}

h1,
h2,
h1 {
  font-weight: normal;
}

span,
a {
  text-decoration: none;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

.btn {
  white-space: nowrap;
  background-color: #dee2e6;
  border: none;
  padding: 7px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #ced4da;
}

.btn.login {
  background-color: #4263eb;
  color: #fff;
  padding: 11px 0;
}

.btn.login:hover {
  background-color: #3b5bdb;
}

.btn.search:hover {
  background-color: #dee2e6;
}

.btn.delete {
  background-color: #fa5252;
  color: #fff;
}

.btn.delete:hover {
  background-color: #f03e3e;
}

.btn.add {
  background-color: #40c057;
  color: #fff;
}

.btn.add:hover {
  background-color: #37b24d;
}

.fas {
  cursor: pointer;
}
</style>
