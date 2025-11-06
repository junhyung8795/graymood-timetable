
# 동아리원 접속코드는 Member, 관리자 접속코드는 Manager입니다.

# [api는 wiki 페이지에서 확인할 수 있습니다.](https://github.com/junhyung8795/graymood-timetable/wiki) 

# 프로젝트 이름

대학 밴드 동아리(graymood) 연습실 예약 웹사이트

## 개요

이 프로젝트는 다음 카페의 게시글로 연습실을 예약할 때의 예약 현황의 낮은 가시성과 이용 방법이 직관적이지 않은 문제를 해결하기 위해를 사용자 친화적인 ui와 CRUD를 구현한 웹 애플리케이션입니다. 부가적으로 동아리원 외에 관리자 등급을 추가하여 부가적인 권한을 부여하였고, jwt를 이용하여 접속 코드를 알지 못하는 사람이 접속할 수 없도록 했습니다.

## 주요 기능

-   달력이나 에브리 타임의 주간 시간표 같은 인터페이스를 추가하여 예약이 있는 시간대를 사용자로 하여금 확인 시키고자 하였습니다.
-   예약 사항, 공지 사항(필독 사항)의 CRUD 기능과 접속 코드를 Update 하는 기능을 구현했습니다.
-   jwt를 활용하여 보안을 강화하고 로그인하지 않은 상태에서 url로 직접 접속할 경우 로그인 페이지로 redirect 되도록 했습니다. 이에 더해 jwt가 유효한 상태라면 로그인 페이지로 접속하려고 할 때 자동으로 /notice페이지로 redirect 되도록 했습니다.

## 기술 스택

-   프론트엔드: Next.js, React.js, Material UI
-   백엔드: Next.js
-   데이터베이스: MongoDB
-   배포: AWS EC2, Nginx, pm2, Certbot

## 실행 방법

1. 저장소 클론: `git clone https://github.com/junhyung8795/graymood-timetable.git`
2. 의존성 설치: `npm install`
3. .env파일에 NEXT_PUBLIC_MONGODB_URL, NEXTAUTH_URL, NEXTAUTH_SECRET 환경 변수를 추가해야합니다.
4. 개발 서버 실행: `npm run build` + `npm run start`

## 상세 내용

더 자세한 프로젝트 설명은 [노션 링크](https://vintage-orbit-bf6.notion.site/155e84ee7a7480f9aa97ca8be63d0b3b)에서 확인할 수 있습니다.


## 기능 미리보기

### 1) 로그인
<img width="1852" height="1202" alt="image" src="https://github.com/user-attachments/assets/f8604900-4a29-4e32-8c51-23236f4ce449" />


---

### 2) 공지 확인

### 사용자 뷰

<img width="2047" height="899" alt="image" src="https://github.com/user-attachments/assets/85e001d5-0e84-4cb5-a532-065e962ee376" />


### 관리자 뷰

<img width="2048" height="1196" alt="image" src="https://github.com/user-attachments/assets/c572a707-7285-4042-8f7f-23c902444244" />


---

### 3) 날짜 선택 (DatePicker)

<img width="2814" height="1534" alt="image" src="https://github.com/user-attachments/assets/304c38e7-ca1c-4c36-b925-621906a2c60c" />


<img width="2048" height="1134" alt="image" src="https://github.com/user-attachments/assets/d2cc1803-c69b-41a7-bbdf-9f5b68fda10d" />


---

<img width="2832" height="1500" alt="image" src="https://github.com/user-attachments/assets/d54f9b5a-dcba-4dcc-930a-8920cdff797e" />


### 4) 예약 생성

<img width="2824" height="1514" alt="image" src="https://github.com/user-attachments/assets/71d343e8-c646-47c3-ba8d-1c2e9b25d904" />


---

### 5) 캘린더 확인 (Week / Month)

### 주간 뷰

<img width="2048" height="1085" alt="image" src="https://github.com/user-attachments/assets/f2e226d3-c3e1-421c-8a3a-4f203e4ebc93" />


### 월간 뷰

<img width="2048" height="1082" alt="image" src="https://github.com/user-attachments/assets/c78ada18-d6c4-4f0f-8e66-e9dad897f97d" />


---

### 6) 예약 수정/삭제

<img width="2048" height="1110" alt="image" src="https://github.com/user-attachments/assets/907ff472-b731-430f-ad9c-c3befb227d0a" />
<img width="2048" height="1089" alt="image" src="https://github.com/user-attachments/assets/31b3a244-0e5c-49aa-9a55-122560a14460" />

---

### 7) 권한별 예약 수정/삭제 차이

### 동아리원 (비밀번호 필요)

- 예약을 수정/삭제하려면 본인이 입력한 비밀번호를 먼저 확인해야 합니다.
- 올바른 비밀번호를 입력하면 이후 수정/삭제 화면이 열립니다.


### 관리자

- 비밀번호 입력 단계 없이 바로 수정/삭제 화면이 열립니다.
- 모든 예약에 대해 접근 가능하며, 공지사항 변경도 지원합니다.

---

## 핵심 기능 요약

- **간편 로그인 코드**: 관리자 / 동아리원 분리
- **공지 관리(관리자 전용)**: 공지사항 수정, 삭제, 추가 가능
- **날짜·시간 선택** 후 **이름/용도/비밀번호** 입력으로 예약 생성
- **주/월 캘린더 뷰**에서 예약 현황 확인
- **예약 클릭 → 수정/삭제** 가능
- **동아리원은 비밀번호 확인**, **관리자는 바로 접근 가능**
