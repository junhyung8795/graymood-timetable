# 링크: https://graymood-timetable.o-r.kr/
# 동아리원 접속코드는 Member, 관리자 접속코드는 Manager입니다.
# [api는 wiki페이지에서 확인할 수 있습니다.](https://github.com/junhyung8795/graymood-timetable/wiki)

# 프로젝트 이름

## 개요
이 프로젝트는 다음 카페의 게시글로 연습실을 예약할 때의 예약 현황의 낮은 가시성과 이용 방법이 직관적이지 않은 문제를 해결하기 위해를 사용자 친화적인 ui와 CRUD를 구현한 웹 애플리케이션입니다. 부가적으로 동아리원 외에 관리자 등급을 추가하여 부가적인 권한을 부여하였고, jwt를 이용하여 접속 코드를 알지 못하는 사람이 접속할 수 없도록 했습니다. 

## 주요 기능
- 달력이나 에브리 타임의 주간 시간표 같은 인터페이스를 추가하여 예약이 있는 시간대를 사용자로 하여금 확인 시키고자 하였습니다.
- 예약 사항, 공지 사항(필독 사항)의 CRUD 기능과 접속 코드를 Update하는 기능을 구현했습니다.
- jwt를 활용하여 보안을 강화하고 로그인 하지 않은 상태에서 url로 직접 접속할 경우 로그인 페이지로 redirect되도록 했습니다. 이에 더해 jwt가 유효한 상태라면 로그인 페이지로 접속 하려고 할 때 자동으로 /notice페이지로 redirect되도록 했습니다.

## 기술 스택
- 프론트엔드: Next.js, React, Material UI
- 백엔드: Next.js
- 데이터베이스: MongoDB
- 배포: AWS EC2, Nginx, pm2

## 실행 방법
1. 저장소 클론: `git clone https://github.com/junhyung8795/graymood-timetable.git`
2. 의존성 설치: `npm install`
3. .env파일에 NEXT_PUBLIC_MONGODB_URL, NEXTAUTH_URL, NEXTAUTH_SECRET를 추가해야합니다.
4. 개발 서버 실행: `npm run build` + `npm run start`


## 상세 내용
더 자세한 프로젝트 설명은 [노션 링크](https://www.notion.so/155e84ee7a7480f9aa97ca8be63d0b3b#a85efe6d58a6487f9a8f4fa4445c15e4)에서 확인할 수 있습니다.
