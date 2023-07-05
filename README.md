## OpenAI API 활용 임시 UI

- node.js 18 이상
### 설치 & 실행
```bash
npm install
npm run dev
```
### env
- 로컬 진행시 -> .env.local 파일 생성 후 진행
```bash
# example
NEXTAUTH_URL="http://localhost:3000" # 상용 배포시 해당 URL
NEXT_PUBLIC_BASE_URL="http://localhost:8000/api" # api 서버 URL
AUTH_SECRET="asd123AD@ff" # NEXT_AUTH 에서 사용하는 시크릿키(사용자 정의)
```