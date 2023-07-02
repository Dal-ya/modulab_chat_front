## OpenAI API 테스트 UI

### 설치 & 실행
```bash
npm install
npm run dev
```
### env(로컬)
- .env.local 파일 생성 후 진행
```bash
#local example
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://127.0.0.1:8000/api" # localhost -> 127.0.0.1 로 명시
AUTH_SECRET="asd123AD@ff"
```