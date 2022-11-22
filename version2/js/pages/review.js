import {
  doc,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { dbService, authService } from "../firebase.js";
import { getReviewList } from "./home.js";

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

export const onEditing = (event) => {
  // 수정버튼 클릭
  event.preventDefault();
  const udBtns = document.querySelectorAll(".editBtn, .deleteBtn");
  udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

  const cardBody = event.target.parentNode.parentNode;
  const reviewText = cardBody.children[0].children[0];
  const reviewInputP = cardBody.children[0].children[1];

  reviewText.classList.add("noDisplay");
  reviewInputP.classList.add("d-flex");
  reviewInputP.classList.remove("noDisplay");
  reviewInputP.children[0].focus();
};

export const update_review = async (event) => {
  event.preventDefault();
  const newreview = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const reviewText = parentNode.children[0];
  reviewText.classList.remove("noDisplay");
  const reviewInputP = parentNode.children[1];
  reviewInputP.classList.remove("d-flex");
  reviewInputP.classList.add("noDisplay");

  const reviewRef = doc(dbService, "reviews", id);
  try {
    await updateDoc(reviewRef, { text: newreview });
    getreviewList();
  } catch (error) {
    alert(error);
  }
};

export const delete_review = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 리뷰를 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "reviews", id));
      getreviewList();
    } catch (error) {
      alert(error);
    }
  }
};



