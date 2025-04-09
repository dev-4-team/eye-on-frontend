# *프로젝트 리드미용*

# 📦 주변시위 Now 프로젝트 컨벤션

본 문서는 팀 내 개발 및 협업 효율성을 높이기 위해 정리한 컨벤션입니다. 프로젝트 진행 과정에서 발견된 문제를 기반으로 논의하여 최종 확정된 규칙입니다.

> 해당 컨벤션은 프로젝트 진행 상황에 따라 지속적으로 업데이트됩니다.
> 

---

## 📁 프로젝트 디렉토리 구조

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

---

## 📝 네이밍 규칙

- **상수**: 영어 대문자 + 스네이크 케이스 (`UPPER_SNAKE_CASE`)
- **변수 및 함수**: 카멜 케이스 (`camelCase`)
    - 함수 컨벤션
        - 모든 핸들러는 `handle[Target][Action]` 형태로 통일한다.
        - prop 으로 전달하는 콜백 함수는 `on[Target][Action]` 형태로 작성한다.
        
        네이밍 패턴
        
        | 요소 | 설명 |
        | --- | --- |
        | `handle` | 무조건 고정 접두사 (핸들러 함수임을 명확하게 표시) |
        | `[Target]` | 어떤 요소/상태/이벤트의 대상인지 |
        | `[Action]` | 수행하는 동작 (submit, change, toggle 등) |
        
        함수 네이밍 예시
        
        | 목적 | 함수명 |
        | --- | --- |
        | 로그인 폼 제출 | `handleLoginSubmit` |
        | 이메일 input 변경 | `handleEmailChange` |
        | 드롭다운 토글 | `handleDropdownToggle` |
        | 리스트에서 항목 삭제 | `handleItemDelete` |
        | 키보드 Enter 감지 | `handleEnterPress` |
        | 유저 정보 불러오기 트리거 | `handleUserFetch` |
        
        사용 예시
        
        prop 전달 시
        
        ```tsx
        <MyModal onModalClose={handleModalClose} />
        ```
        
        컴포넌트 내부 사용 시
        
        ```tsx
        type MyModalProps = {
          onClose: () => void;
        };
        
        const MyModal = ({ onClose }: MyModalProps) => (
          <button onClick={onClose}>닫기</button>
        );
        
        ```
        
- **이벤트 핸들러**
    - props 로 전달하는 함수는 기본적으로 `handle` 접두어 사용
    - 상황에 따라 유연하게 적용
- **컴포넌트**
    - 함수 표현식 + named export 사용
        
        ```tsx
        export const Component = () => {
        	return <컴포넌트 />
        }
        ```
        

---

## 🧩 GitHub 협업 방식

- **PR 승인**
    - 파트별 팀원이 1명 이상 승인 후 merge 진행
- **이슈 공유**
    - 긴급 이슈는 실시간 공유
    - 모든 이슈는 GitHub Issues 를 통해 기록 및 관리

---

## 🔖 브랜치 네이밍

형식: `{커밋 타입}/{기능명}-#{이슈번호}` (기능명은 하나의 명사로 작성)

예시 : feature/login-#12

| 타입 | 설명 |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷팅, 세미콜론 누락 등 |
| refactor | 코드 리팩토링 |
| test | 테스트 코드 추가 및 리팩토링 |
| chore | 빌드 수정, 불필요한 코드 삭제 등 |
| comment | 주석 추가 및 변경 |
| remove | 파일/폴더 삭제 |
| rename | 파일/폴더명 수정 |

### 커밋 애매한 상황별 가이드

- 불필요한 코드 삭제 (console.log, dead code 등): `chore`
- 파일/폴더 삭제: `remove`
- 에러나 문제를 일으킨 코드 수정: `fix`
- 사소하게 한두 줄 코드 추가 (에러는 아니지만 로직 영향 있음): `chore`

---

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