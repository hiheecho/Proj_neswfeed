import { authService } from "./firebase.js";
//해쉬된 값에 따 내용을 다르게 바꿔줄 파일
export const route = (event) => {
    event.preventDefault();
    window.location.hash = event.target.hash;
  };
  
  const routes = {
    "/": "/pages/home.html",
    review: "/pages/review.html",
    page2: "/pages/page2.html",
    404: "/pages/404.html",
  };
  import { getReviewList } from "./pages/review.js";
  
  export const handleLocation = async () => {
    let path = window.location.hash.replace("#", ""); //""
  
    // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
    if (path.length == 0) {
      path = "/";
    }
    const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]
  
    const html = await fetch(route).then((data) => data.text());

    document.getElementById("main-page").innerHTML = html;

    if (path === "review") {
        // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시
        document.getElementById("nickname").textContent =
          authService.currentUser.displayName ?? "닉네임 없음";
    
        document.getElementById("profileImg").src =
          authService.currentUser.photoURL ?? "../assets/unknow_profile.png";
    
          getReviewList();
      }
  };
  export const goToMain = () => {
    window.location.hash = "";
  };
    
    