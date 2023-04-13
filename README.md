<center>
<h1>MucketList</h1>
</center>

🔗 Github : https://github.com/somn45/mucketlist  
🔗 Page Link : https://mucketlist.com  
🧩 스포티파이 테스트용 아이디 : mucketlisttest@gmail.com(구글)  
🧩 스포티파이 테스트용 비밀번호 : myreactapp(구글)

## 🎉Intro

---

- MucketList는 Spotify API를 이용한 음악 에플리케이션 입니다.
- 사용자가 관심 있는 장르를 검색하면 해당 장르에 맞는 트랙 리스트들이 출력되고 트랙을 감상할 수 있습니다. -또한 리스트에 포함된 트랙을 다 듣거나 트랙을 찜했다면 해당 트랙을 토대로 하여 추천 트랙을 리스트에 추가합니다. 이로써 사용자가 관심 있는 트랙을 지속적으로 감상 할 수 있도록 도와주는 에플리케이션 입니다.

- Spotify 연동 계정을 위 스포티파이 테스트용 계정을 구글 로그인으로 진행하시면 Mucketlist를 체험해 보실 수 있습니다.

## 💾 Build

### 프로젝트 빌드

```
npm run build:server
npm run build:client
```

### 개발용 클라이언트 실행

```
npm run dev:client
```

### 개발용 서버 실행

```
npm run dev:server
```

## 📕 Guide

### 로그인

![Login](./image/login.PNG)

가입된 아이디와 비밀번호를 입력하여 MucketList 메인 페이지로 접속할 수 있습니다.  
가입되어 있는 아이디가 없다면 아래의 회원가입 링크를 통해 가입이 가능합니다.

### 회원가입

![Join](./image/join.PNG)

회원가입 페이지에서 원하는 아이디를 통해 회원가입을 할 수 있습니다.  
이미 가입되어 있는 계정이 있다면 아래의 로그인 링크를 통해 로그인이 가능합니다.

### 트랙 검색

![Genre Modal](./image/genre.PNG)

로그인이 완료된 후 처음으로 앱에 접속하거나 음악 리스트가 없다면  
사용자의 음악의 관심 장르를 선택할 수 있는 창이 나옵니다.  
관심 장르를 선택하고 트랙 검색하기 버튼을 누르면 선택한 장르의 음악 리스트가 생성됩니다.

![Option Modal](./image/option.PNG)

장르 선택을 완료하면 음악의 재생 순서를 묻는 창이 나옵니다.  
트랙의 재생 순서 옵션을 정하고 음악 재생 순서 결정 버튼을 누르면  
음악 리스트가 선택된 옵션에 맞게 다시 재조정됩니다.

### 메인 페이지

![Home](./image/main.PNG)

검색이 완료되면 메인 페이지에 접속됩니다.  
아래의 플레이어를 통해 음악을 감상할 수 있습니다.

![Player&&AddCustomTrack](./image/player_and_addcustomtrack.PNG)

플레이어의 기능은 왼쪽에서 아래 순서대로 다음과 같습니다.

1. 재생/일시정지
2. 이전 트랙으로 건너뛰기
3. 다음 트랙으로 건너뛰기
4. 반복 재생(Repeat Mode)
5. 랜덤 재생(Shuffle Mode)
6. 볼륨 믹서

오른쪽 아래의 하트 모양 버튼은 음악 감상 중 좋았던 음악이 있다면  
음악을 찜할 수 있는 기능입니다.

### 메뉴

![Header](./image/menu.PNG)

메뉴는 다음과 같은 기능이 있습니다.

1. 찜한 트랙 목록 : 이 때까지 찜했던 음악 리스트들을 확인할 수 있습니다.
2. 트랙 초기화 : 트랙 검색 단계로 돌아가 음악을 다시 검색할 수 있습니다.
3. 도움말 : 아직 앱 사용이 익숙하지 않은 사용자를 위해 사용 가이드가 나타납니다.
4. 로그아웃 : 로그인 전으로 돌아가 사용을 마치거나 다른 계정으로 로그인 할 수 있습니다.

### 찜한 트랙 목록

![CustomPlayList](./image/customplaylist.PNG)

메뉴의 찜한 트랙 목록을 누르면 다음과 같이 찜했던 음악을 확인할 수 있습니다.  
만약 잘못 찜했거나 음악이 마음에 들지 않을 경우  
트랙 제목 옆의 빨간 X 버튼을 누르면 찜한 음악 리스트에서 삭제됩니다.  
이전 메인 페이지로 돌아가고 싶을 경우 오른쪽 위의 하얀 X 버튼을 누르면 됩니다.

---

## 🔧 Tech Stack

<center><h2>Frontend</h2></center>

<center>
<img alt="react" src ="https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=black"/>
<img alt="typescript" src ="https://img.shields.io/badge/typescript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="styled components" src ="https://img.shields.io/badge/styled components-DB7093.svg?&style=for-the-badge&logo=styled components&logoColor=white"/>
<img alt="axios" src ="https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"/>
<img alt="redux" src ="https://img.shields.io/badge/redux-764ABC.svg?&style=for-the-badge&logo=redux&logoColor=white"/>
</center>

<center><h2>Backend</h2></center>

<center>
<img alt="ts-node" src ="https://img.shields.io/badge/tsnode-3178C6.svg?&style=for-the-badge&logo=ts-node&logoColor=white"/>
<img alt="express" src ="https://img.shields.io/badge/express-000000.svg?&style=for-the-badge&logo=express&logoColor=white"/>
<img alt="Spotify" src ="https://img.shields.io/badge/SpotifyApi-1DB954.svg?&style=for-the-badge&logo=Spotify&logoColor=white"/>
</center>

<center><h2>DevOps</h2></center>

<center>
<img alt="git" src ="https://img.shields.io/badge/git-F05032.svg?&style=for-the-badge&logo=git&logoColor=white"/>
<img alt="firebase" src ="https://img.shields.io/badge/firebase-FFCA28.svg?&style=for-the-badge&logo=firebase&logoColor=black"/>
</center>

---

## 📱 Contact

📧 email: somn45@gmail.com  
📞 phone: 010-2823-3075
