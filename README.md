# 링크: https://graymood-timetable.o-r.kr/

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

![image.png](attachment:0113785a-3d89-48b7-80e6-759d44aae412:image.png)

---

### 2) 공지 확인

### 사용자 뷰

![image.png](attachment:b51ee0ed-871c-4844-ad67-8cf8eb4e57d8:image.png)

### 관리자 뷰

![image.png](attachment:ba4eb5d1-dc90-4cb7-8685-5af4833ff4cf:image.png)

---

### 3) 날짜 선택 (DatePicker)

![image.png](attachment:7b7a7c8f-5966-4584-b25a-6220f869f2c8:image.png)

![image.png](attachment:f2ce9485-e2d9-4bd8-bd3e-76cbe41d1fdd:image.png)

---

![image.png](attachment:789bddc9-f4a5-4126-883d-2895c1c93cce:image.png)

### 4) 예약 생성

![image.png](attachment:37234a50-b3e9-464f-859b-98526ad1e9e1:image.png)

---

### 5) 캘린더 확인 (Week / Month)

### 주간 뷰

![image.png](attachment:f30397c6-7a0b-43e8-a66e-7076d10a79fa:image.png)

### 월간 뷰

![image.png](attachment:2b1dfce3-ea4f-4a47-9726-89755a41f113:image.png)

---

### 6) 예약 수정/삭제

![image.png](attachment:8dfcc446-47d7-49aa-86af-c4fd0b08c067:image.png)

---

### 7) 권한별 예약 수정/삭제 차이

### 동아리원 (비밀번호 필요)

- 예약을 수정/삭제하려면 본인이 입력한 비밀번호를 먼저 확인해야 합니다.
- 올바른 비밀번호를 입력하면 이후 수정/삭제 화면이 열립니다.

![image.png](attachment:f3c98813-310a-430e-8d73-678c884ee3dd:image.png)

### 관리자

- 비밀번호 입력 단계 없이 바로 수정/삭제 화면이 열립니다.
- 모든 예약에 대해 접근 가능하며, 공지사항 변경도 지원합니다.

---

## 핵심 기능 요약

- **간편 로그인 코드**: 관리자 / 동아리원 분리
- **공지 관리(관리자 전용)**: 예약 우선순위, 사용 수칙 공지 가능
- **날짜·시간 선택** 후 **이름/용도/비밀번호** 입력으로 예약 생성
- **주/월 캘린더 뷰**에서 예약 현황 확인
- **예약 클릭 → 수정/삭제** 가능
- **동아리원은 비밀번호 확인**, **관리자는 바로 접근 가능**
