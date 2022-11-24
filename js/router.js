import { authService } from "./firebase.js";

export const route = (event) => {
    event.preventDefault();
    window.location.hash = event.target.hash;
};

const routes = {
    404: '/pages/404.html',
    '/': '/pages/main.html',
    auth: '/pages/auth.html',
    loginMain: '/pages/loginMain.html',
    review: './pages/review.html',
    profile: './pages/profile.html',
    popup: './pages/pop.html',
};

import { getReviewList } from './pages/loginMain.js';
import { myReviewList } from "./pages/review.js";

export const handleLocation = async () => {
    let path = window.location.hash.replace("#", "");
    const pathName = window.location.pathname;

    // live server를 index.html에서 오픈할 경우
    if (pathName === "/index.html") {
        window.history.pushState({}, "", "/");
    }
    if (path.length == 0) {
        path = "/";
    }

    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;

    // 특정 화면 랜더링 되면 DOM 처리

    // login 성공한 메인 페이지
    if (path === "loginMain") {
        // 로그인한 회원의 프로필 사진 표시
        document.getElementById("profileImg").src = 
            authService.currentUser.photoURL ?? "../assets/blank_profile.png";

        getReviewList();

    }

    // 내 글 보러가기 페이지
    if (path === "review") {
        // 로그인한 회원의 프로필 사진 표시
        document.getElementById("profileImg").src = 
            authService.currentUser.photoURL ?? "../assets/blank_profile.png";

        myReviewList();
    }

    // 프로필 관리 페이지
    if (path === "profile") {
        // 로그인한 회원의 프로필 사진 표시
        document.getElementById("profileImg").src = 
            authService.currentUser.photoURL ?? "../assets/blank_profile.png";
            
        // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
        document.getElementById("profileView").src =
          authService.currentUser.photoURL ?? "/assets/blank_profile.png";
        document.getElementById("profileNickname").placeholder =
          authService.currentUser.displayName ?? "닉네임 없음";
      }
}

export const goToMain = () => {
    window.location.hash = "";
};

export const goToProfile = () => {
    window.location.hash = "#profile";
}