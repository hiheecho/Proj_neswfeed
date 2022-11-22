//최상위파일로 전체적인 허브역할을 하여 페이지별로 쪼개는 역할
import { handleAuth, onToggle, logout } from "./pages/auth.js";
import { socialLogin } from "./pages/auth.js";
import { route, handleLocation, goToReview, goToMain } from "./router.js";
 //import { goToProfile, changeProfile, onChangeProfile, } from "./pages/profile.js";
import { authService } from "./firebase.js";
//import { save_review } from "./pages/review.js";

// url 바뀌면 handleLocation 실행
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로 고침 실행 시 handleLocation 실행
document.addEventListener("DOMContentLoaded", function () {
  authService.onAuthStateChanged((user) => {
    handleLocation();
    const hash = window.location.hash;

    if (user) {
      // 로그인 상태
      if (hash === "") {
        // 로그인 상태에서는 이전으로 돌아갈 수 없다
        window.location.replace("#loginmain");
      }
    } else {
      // 로그아웃 상태
      if (hash !== "") {
        window.location.replace("");
      }
    }
  });
});

// 이밴트 핸들러 리스트
window.route = route;
window.onToggle = onToggle;
window.handleAuth = handleAuth;
//window.goToProfile = goToProfile;
// window.changeProfile = changeProfile;
// window.onChangeProfile = onChangeProfile;
window.socialLogin = socialLogin;
window.logout = logout;
//window.save_review = save_review;
window.goToReview = goToReview;
window.goToMain = goToMain;
