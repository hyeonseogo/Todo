# 프로젝트 API 테스트 결과

이 문서에서는 프로젝트의 API 테스트 결과를 보여줍니다. 각 API 요청과 응답을 확인할 수 있습니다.

---

## 🟢 회원가입 - POST /users/signup

회원가입 API는 사용자가 입력한 정보를 데이터베이스에 저장하는 API입니다.

- **요청:**

````json
{
  "userid": "testuser",
  "userpw": "1234",
  "name": "홍길동",
  "email": "test@example.com"
}

{
  "userId": 1
}

🟢 로그인 - POST /users/login

로그인 API는 사용자가 입력한 아이디와 비밀번호를 확인하여 JWT 토큰을 발급하는 API입니다.

- **요청:**
```json
{
  "userid": "testuser",
  "userpw": "1234"
}

{
  "message": "로그인 성공",
  "token": "jwt_token_example"
}

🟢 할 일 목록 조회 - GET /todos

이 API는 사용자가 등록한 할 일 목록을 불러오는 API입니다.

{
  "Authorization": "Bearer jwt_token_example"
}

````
