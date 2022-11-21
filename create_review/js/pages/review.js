import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import {
  doc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { dbService, authService } from "../firebase.js";



// Create API
// reviews 라는 이름의 collection에 객체 형태의 Document를 신규 등록

export const save_review = async (event) => {
  event.preventDefault();
  const review = document.getElementById("review");
  const movieTitle = document.getElementById("movieTitle")
  const {uid,photoURL, displayName} = authService.currentUser;
  try {
    await addDoc(collection(dbService, "reviews"), {
      movieTitle : movieTitle.value,
      review : review.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    review.value = "",
    movieTitle.value = "",
    getReviewList();
    alert('리뷰저장')
  } catch (error) {
    alert (error);
    console.log("error in addDoc")
  }
}


export const getReviewList = async () => {
    console.log('review')
  };


