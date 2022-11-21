//최상위파일로 전체적인 허브역할을 하여 페이지별로 쪼개는 역할
import { handleAuth, onToggle, logout, socialLogin } from "./pages/auth.js";
import { authService } from "./firebase.js"; //firebase에서 authservice가 임포트
import { handleLocation , route ,goToMain} from "./router.js"; 
//firebase,router.js와 한 파일이라고 생각
import {
    save_review
  } from "./pages/review.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", ()=>{
    //firebase가 연결이 되면 화면 표시
    // 로그인 상태 모니터링
    authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
		// user === authService.currentUser 와 같은 값
        handleLocation();
        if (user) {
        // 로그인 상태인 경우
          //  alert('로그인')
        } else {
        // 로그아웃 상태인 경우
            //alert('로그아웃')
        }
    });
});

// 전역 함수 리스트
window.route = route;
window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout;
window.goToMain = goToMain;
window.save_review = save_review;

