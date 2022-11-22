import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export const getReviewList = async () =>{
  let rvObjList = [];
  const q = query(
    collection(dbService,"reviews"),
    orderBy("createdAt","desc")
  )
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const reviewObj = {
      id: doc.id,
      ...doc.data(),
    };
    rvObjList.push(reviewObj);    
  });
  
  const reviewList = document.getElementById("review-list")
  //const currentUid = authService.currentUser.uid;
  rvObjList.forEach((rvObj) => {
   // const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = `
              <div class="pre-card card">
                <a href="#read">
                  <div class="card-body" >
                    <h5 class="card-title">${rvObj.movieTitle}</h5>
                    <p class="card-text">${rvObj.review}</p>
                  </div>
                  <div class="card-foot">
                      <img id="profileImg" width="50px" height="50px" src="${rvObj.profileImg}" />
                      <span>${rvObj.nickname}</span>
                      <span>${new Date(rvObj.createdAt).toString()
                        .slice(0,25)}</span>
                  </div>
                </a>
              </div>
            
          `;
    const div = document.createElement("div");
    div.classList.add("swiper-slide")
    div.innerHTML = temp_html;  
    reviewList.appendChild(div);
  });
};
function moveLeft() {
  const position = 0
  const slide = document.getElementById('slide');
  slide.position.left = position - 330 + 'px';
}
function moveRight() {
  const slide = document.getElementById('slide');
  const position = 0
  slide.position.left = position + 330+'px';
}
