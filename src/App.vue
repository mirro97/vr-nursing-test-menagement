<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
}
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
  background-color: #fad586;
  border: none;
  padding: 7px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #fbd148;
}

.btn.login {
  background-color: #22756c;
  color: #fff;
  padding: 11px 0;
}

.btn.login:hover {
  background-color: #1e5e56;
}

.btn.cancel {
  background-color: #d7d7d6;
}

.btn.cancel:hover {
  background-color: #c8c8c6;
}

.btn.search:hover {
  background-color: #ffd43b;
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
