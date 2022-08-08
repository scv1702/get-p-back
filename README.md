# get-p-back

## API 명세서

Nest의 Swagger 모듈을 이용하여 OpenAPI 사양에 맞게 작성하였다.

### 실행 방법

1. `get-p-back` 레포지토리를 클론한다.

```bash
git clone https://github.com/get-p-dev/get-p-back.git
```

2. 클론한 디렉토리로 이동 후 `npm install`을 통해 필요한 의존성들을 설치한다.

```bash
cd get-p-back
npm install
```

3. 환경변수 파일(`.env`)을 디렉토리의 루트 경로에 추가한다. 환경변수 파일은 슬랙의 #개발에 업로드되어 있다.

4. `npm start`을 통해 `get-p-back`을 실행시킨다.

```bash
npm start
```

5. `http://localhost:8080/api`로 접속하면 API 문서 열람 및 테스팅을 할 수 있다.
