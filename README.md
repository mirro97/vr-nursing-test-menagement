# VR-Nursing-Test Menagement

간호시험  결과 확인 및 학생/관리자 정보 관리 시스템입니다. 


## VR-Nursing-Test Menagement 기능설명

### 일반관리자 / 슈퍼관리자 접근
vue.js 의 네비게이션 가드(navigation guard)를 사용하여 사용자 타입별 접근 가능한 페이지 구분

> /router/index.js
```
{
        path: "/admin/student",
        name: "student",
        component: StudentView,
        beforeEnter: () => {
          if (store.state.admin.type === "admin") {
            alert("일반관리자가 아닙니다")
            history.back()
          }
        },
      },
      {
        path: "/admin/superAdmin",
        name: "superAdmin",
        component: SAdminView,
        beforeEnter: () => {
          if (store.state.admin.type === "manager") {
            alert("슈퍼관리자가 아닙니다")
            history.back()
          }
        },
      },
```

### 일반관리자 기능 (Admin)
1. Create
    - 학생 추가: 이름, 학번, 생년월일, 연락처를 입력하여 추가

2. Read
    - 학생 시험 결과 출력
    - 학생 정보 출력

3. Update
    - 학생 수정: 학생 이름, 학번, 생년월일, 연락처를 수정
    
4. Delete
    - 학생 정보 삭제: 선택 삭제 및 일괄삭제 가능

5. Search
    - 학생 정보 검색: 이름, 학번 타입 선택하여 검색
    - 실습결과 검색: 이름, 학번, 시나리오 타입 선택하여 검색

6. Download 
    - 학생정보 엑셀로 저장
    - 실습결과 엑셀로 저장

### 슈퍼관리자 기능 (Super Admin)
1. Create
    - 일반 관리자 추가: 아이디, 비밀번호, 이름, 소속, 연락처 입력하여 추가

2. Read
    - 일반 관리자 정보 출력

3. Update
    - 일반관리자 수정: 아이디, 비밀번호, 이름, 소속, 연락처 입력하여 수정

4. Delete
     - 일반관리자 삭제: 선택 삭제 및 일괄 삭제 

5. Search
    - 일반관리자 검색: 이름, 소속 타입 선택하여 검색
