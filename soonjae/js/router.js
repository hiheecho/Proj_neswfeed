import { authService } from "./firebase.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/home.html",
  loginMain: "/pages/loginMain.html",
  profile: "/pages/profile.html",
  review: "/pages/review.html",
};


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
  if (path === "main") {
    // 로그인한 회원의 프로필 사진과 닉네임 표시
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "../assets/blank_profile.png";
  }
};
export const goToMain = () => {
  window.location.hash = "";
};
export const goToReview = () => {
  window.location.hash = "#review";
};
