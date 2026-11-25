# AI 코칭 켜는 법 (한 번만, 약 5분)
AI 코칭 버튼은 안 켜도 됩니다. 규칙 기반 어드바이스 카드는 이미 자동으로 나옵니다.

1. console.anthropic.com 에서 API 키 발급 (결제 등록 필요). 키는 채팅/깃허브에 절대 붙여넣지 마세요.
2. Supabase → Edge Functions → Deploy a new function → 이름: salary-advice → 
   salary-advice-index.ts 내용을 붙여넣고 Deploy
3. Edge Functions → Secrets → ANTHROPIC_API_KEY 추가 (선택: AI_DAILY_LIMIT=40, AI_MODEL)
4. 급여 사이트에서 관리자 로그인 → 팀원 선택 → 「AI 코칭 받기」
- 보내는 데이터는 숫자뿐(이름·피보험자 제외). 하루 40회 제한. 결과는 저장되어 팀원도 볼 수 있어요.
