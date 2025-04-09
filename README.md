# 🪧 주변 시위 NOW

> **서울 시위 정보 실시간 조회 및 응원/참여 인증 서비스**  
> 서울시 경찰청 데이터를 기반으로 시위 정보를 수집하고, 사용자는 위치 기반 시위 정보 조회, 현장 참여 인증, 실시간 응원 기능을 통해 시위 참여를 독려할 수 있는 웹 서비스입니다.

---

## 📌 프로젝트 개요

**주요 목적**

- 서울시 시위 정보를 실시간으로 제공하고, 사용자가 위치 기반으로 주변 시위 정보를 쉽게 확인
- 온라인 및 오프라인을 통한 시위 참여 독려
- GPS 기반 참여 인증 및 실시간 응원 기능 제공

**핵심 기능**

1. **시위 정보 조회**

   - 서울시 경찰청 시위 데이터를 매일 22시에 자동 수집 및 DB 저장
   - 사용자는 현재 위치 기준 주변 시위 정보를 지도에서 조회

2. **시위 상세 정보**

   - 시위 제목, 주최, 일시, 장소, 참여 인원, 상세 설명
   - 신고 인원과 인증 인원 분리 표시
   - 카카오톡 공유 기능 제공

3. **현장 참여 인증**

   - 로그인 사용자 대상
   - 시위 장소 반경 1km 이내에서만 인증 가능
   - 사진 최대 3장 및 코멘트 업로드
   - 계정당 시위별 1회 인증 제한
   - GPS 스푸핑 방지

4. **실시간 시위 응원**

   - 실시간 응원 메시지 및 응원 수 표시

5. **시위 정보 등록 요청**
   - Google Form을 통해 사용자 등록 요청 가능
   - 법적 리스크로 인해 사전 미신고 시위 등록은 불가

---

## 🚀 주요 기술 스택

| 목적        | 기술 스택                           |
| ----------- | ----------------------------------- |
| 프레임워크  | React (Vite)                        |
| 상태 관리   | Zustand, React Query                |
| 스타일링    | Styled-Components 또는 Tailwind CSS |
| API 통신    | Fetch API                           |
| 지도        | Kakao Maps SDK                      |
| 실시간 통신 | WebSocket (STOMP + SockJS)          |
| 기타        | 카카오톡 공유 API, Geolocation API  |

---

## 🧑‍💻 협업 방식

### PR 승인

- 파트별 팀원이 **1명 이상 승인** 후 merge 진행

### 이슈 관리

- 긴급 이슈는 **실시간 공유**
- 모든 이슈는 GitHub Issues 에 기록 및 관리

### 커밋 컨벤션

| Type     | 설명                                 |
| -------- | ------------------------------------ |
| feat     | 새로운 기능 추가                     |
| fix      | 버그 수정                            |
| docs     | 문서 수정                            |
| style    | 코드 포맷팅, 세미콜론 누락 등        |
| refactor | 코드 리팩토링                        |
| test     | 테스트 코드 추가 및 리팩토링         |
| chore    | 빌드 수정 등 production code 외 작업 |
| comment  | 주석 추가 및 변경                    |
| remove   | 파일/폴더 삭제                       |
| rename   | 파일/폴더명 수정                     |

> 커밋 메시지 예시: `fix : add component`

### 브랜치 컨벤션

- 브랜치 이름: `${타입}-${작업 내용}`
- 예시: `feature-login`
