# 주변시위 Now 프로젝트 컨벤션

> 해당 컨벤션은 프로젝트 진행 상황에 따라 지속적으로 업데이트됩니다.

## 디렉토리 구조

- **폴더 네이밍**
  - 기본: 카멜 케이스 (`camelCase`)
  - 컴포넌트 폴더: 파스칼 케이스 (`PascalCase`)
- **파일 네이밍**
  - 컴포넌트: `.tsx`
  - 그 외: `.ts`
- **구조 원칙**
  - 컴포넌트 위치는 명확하게
  - 과도한 책임을 가지지 않도록 역할 분리
  - 이해하기 쉬운 구조와 충분한 주석 작성

```
my-app/
│
├── src/
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── common/             # 전역적으로 사용되는 컴포넌트 (버튼, 헤더, 푸터 등)
│   │   └── BlogContainer/      # 블로그 컨테이너 컴포넌트
│   │       ├── index.tsx
│   │       ├── BlogContainer.tsx
│   │       └── BlogContainer.stories.tsx
│   │
│   ├── store/                  # 전역 상태 관리 (Context API, Redux, recoil, zustand 등)
│   │
│   ├── app/                    # Next.js app 라우팅
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/                    # API 관련 로직
│   │
│   ├── hooks/                  # 커스텀 React 훅
│   │
│   ├── constants/              # 상수 값 관리
│   │
│   ├── types/                  # 타입 (TypeScript)
│   │
│   │
│   └── utils/                  # 유틸리티 함수
│
└── ... (생략)
```

## 네이밍 규칙

### 상수

- 영어 대문자 + 스네이크 케이스 (`UPPER_SNAKE_CASE`)
- 예: `MAX_DISTANCE`, `EMOJI`, `DEFAULT_LOCATION`

### 변수 및 함수

- 카멜 케이스 (`camelCase`)
- 일반 함수: 역할이 명확한 이름
- 이벤트 핸들러: `handle[Target][Action]` 형태
- prop 콜백 함수: `on[Target][Action]` 형태

### 예시

```ts
const handleLoginSubmit = () => { ... };

<MyModal onModalClose={handleModalClose} />;
```

---

## 컴포넌트 작성 방식

- 컴포넌트는 `화살표 함수 + default export`를 원칙으로 한다.
- props 타입은 컴포넌트 내부에서 `Props`라는 이름으로 작성한다.
- props 타입이 재사용되거나 복잡한 경우 `types/`에 별도 분리

```tsx
interface Props {
  protestId: string
}

const ProtestCard = ({ protestId }: Props) => {
  return <div>{protestId}</div>
}

export default ProtestCard
```

---

## 커스텀 훅 및 Zustand store

- 커스텀 훅 파일은 반드시 `use` 접두어를 붙인다. (`useSendCheerMutation.ts`)
- 전역 상태 훅은 `store/`에 위치시키고, 이름에 `Store`를 붙인다. (`useUserInfoStore.ts`)
- 비즈니스 로직 관련 훅은 `hooks/`에 위치시킨다.

---

## 타입 네이밍

- 간단하고 지역적인 타입은 컴포넌트 내 인라인으로 작성
- 도메인 개념이 뚜렷하거나 재사용 가능한 타입은 `types/` 디렉토리로 분리
- 제네릭은 의미 있는 타입 이름으로 작성

  ```ts
  // 나쁜 예시
  const customFetch = <T, U>(url: T, options: U) => {}

  // 좋은 예시
  const customFetch = <URL, OPTIONS>(url: URL, options: OPTIONS) => {}
  ```

---

## Next.js 시스템 파일 규칙

다음 파일들은 반드시 `export default`를 사용하고 명명도 아래와 같이 해야 정상 동작합니다.

| 파일명          | 설명                       |
| --------------- | -------------------------- |
| `page.tsx`      | 라우트 페이지              |
| `layout.tsx`    | 레이아웃 컴포넌트          |
| `not-found.tsx` | 404 페이지                 |
| `error.tsx`     | 에러 핸들링 컴포넌트       |
| `loading.tsx`   | 로딩 중 표시할 UI (권장됨) |

```tsx
// 올바른 예
export default function Page() {
  return <div>페이지입니다</div>
}
```

---

## GitHub 협업 규칙

### PR 승인

- 동일 파트 팀원이 최소 1명 이상 승인 후 merge 가능

### 이슈 관리

- 긴급 이슈는 실시간 공유
- 모든 작업은 GitHub Issues를 통해 기록 및 공유

---

## 브랜치 네이밍

형식: `{타입}/{기능명}-#{이슈번호}`  
예시: `feature/login-#12`

| 타입     | 설명                    |
| -------- | ----------------------- |
| feat     | 새로운 기능 추가        |
| fix      | 버그 수정               |
| docs     | 문서 수정               |
| style    | 스타일 및 포맷 수정     |
| refactor | 기능 변경 없는 리팩토링 |
| test     | 테스트 코드             |
| chore    | 기타 설정, 빌드 등      |
| comment  | 주석 추가/수정          |
| remove   | 파일 삭제               |
| rename   | 이름 변경               |

---

### 애매한 경우 가이드

| 상황                             | 타입    |
| -------------------------------- | ------- |
| console.log 삭제, dead code 정리 | chore   |
| import 경로 정리만 한 경우       | chore   |
| 에러가 나던 코드 수정            | fix     |
| 단순 주석만 추가                 | comment |
| 파일 삭제                        | remove  |

## 🗂️ 전체 예시

### 커밋 예시

```tsx
// Header
${커밋 타입}/#${이슈 넘버} : 버튼을 클릭해도 작동하지 않는 문제를 해결한다

// Body
- 내용 ~~~~~
- 내용 ~~~~~
```

### PR

```tsx
제목 : [FE] ${커밋 타입} : 버튼을 클릭해도 작동하지 않는 문제를 해결한다

아래는 템플릿대로 필요하면 커스텀하기
```

### 이슈

```tsx
제목 : [FE] ${커밋 타입} : 버튼을 클릭해도 작동하지 않는 문제를 해결한다

아래는 템플릿대로 필요하면 커스텀하기
```
