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
import {
  ref,
  getDownloadURL,
  uploadString
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { dbService, authService, storageService }  from "../firebase.js";


// Create API
// reviews 라는 이름의 collection에 객체 형태의 Document를 신규 등록

export const save_image = async () => {
  const imgRef = ref(
    storageService,
    `movies/${authService.currentUser.uid}/${uuidv4()}`
  );
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  console.log('imgdataurl:',imgDataUrl)
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    console.log('response :',response)
    downloadUrl = await getDownloadURL(response.ref);
    console.log(downloadUrl)
    
  }
  return downloadUrl;
};
 
export const uploadImage = (event) => {
        const theFile = event.target.files[0]; // file 객체
        const reader = new FileReader();
        reader.readAsDataURL(theFile); 
        reader.onloadend = (finishedEvent) => {
        const imgDataUrl = finishedEvent.currentTarget.result;
        console.log(imgDataUrl)
        localStorage.setItem("imgDataUrl", imgDataUrl);
        
 }; }



// Create API
// reviews 라는 이름의 collection에 객체 형태의 Document를 신규 등록
export const save_review = async (event) => {
  event.preventDefault();
  const review = document.getElementById("review");
  const movieTitle = document.getElementById("movieTitle");
  let movieImage = await save_image();
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "reviews"), {
      movieTitle : movieTitle.value,
      review : review.value,
      movieImage : movieImage,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    review.value = "",
    movieTitle.value = "",
    movieImage = "",
    alert('리뷰를 저장했습니다.')
    getReviewList();
  } catch (error) {
    alert (error);
    console.log("error in addDoc")
  }
}

// review 수정
export const onEditing = (event) => {
  // 수정버튼 클릭
  event.preventDefault();
  const udBtns = document.querySelectorAll(".editBtn, .deleteBtn");
  udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

  const cardBody = event.target.parentNode.parentNode;
  const commentText = cardBody.children[0].children[0];
  const commentText2 = cardBody.children[0].children[1];
  const commentInputP = cardBody.children[0].children[2];

  commentText.classList.add("noDisplay");
  commentText2.classList.add("noDisplay");
  commentInputP.classList.add("d-flex");
  commentInputP.classList.remove("noDisplay");
  commentInputP.children[0].focus();
};

export const update_comment = async (event) => {
  event.preventDefault();
  //이부분을 변경해야할것같음...
  console.log('event.targer:', event.target.parentNode.children);
  const newComment = event.target.parentNode.children[1].value;
  const movieComment = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const commentText = parentNode.children[0];
  const commentText2 = parentNode.children[1];
  commentText.classList.remove("noDisplay");
  commentText2.classList.remove("noDisplay");
  const commentInputP = parentNode.children[2];
  commentInputP.classList.remove("d-flex");
  commentInputP.classList.add("noDisplay");

  const commentRef = doc(dbService, "reviews", id);
  try {
    await updateDoc(commentRef, { movieTitle: movieComment, review: newComment });
    getReviewList();
  } catch (error) {
    alert(error);
  }
};


// review 삭제
export const delete_comment = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 응원글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "reviews", id));
      getReviewList();
    } catch (error) {
      alert(error);
    }
  }
};


// my review list
export const getReviewList = async () => {
  let cmtObjList = [];
  const q = query(
    collection(dbService, "reviews"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const commentObj = {
      ...doc.data(),
      id: doc.id
    };
    cmtObjList.push(commentObj);
  });
  const commentList = document.getElementById("review-list");
  const currentUid = authService.currentUser.uid;
  commentList.innerHTML = "";
  cmtObjList.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html =
      `<div class="card commentCard">
          <div class="card-body">
              <blockquote class="blockquote mb-0">
                  <img id="movieImage" src="${cmtObj.movieImage}" alt="moviePoster">
                  <p class="commentText">${cmtObj.movieTitle}</p>
                  <p class="commentText">${cmtObj.review}</p>
                  <p id="${cmtObj.id}" class="noDisplay">
                  <input class="newtitleInput" type="text" maxlength="30" />
                  <input class="newCmtInput" type="text" maxlength="30" />
                  <button class="updateBtn" onclick="update_comment(event)">완료</button></p>
                  <footer class="quote-footer">
                    <div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${cmtObj.profileImg ?? '../assets/blank_profile.png'}" alt="profileImg" />
                    <span>${cmtObj.nickname ?? "닉네임 없음"}</span>
                    </div>
                    <div class="cmtAt">${new Date(cmtObj.createdAt).toString().slice(0, 25)}</div>
                  </footer>
              </blockquote>
              <div class="${isOwner ? "updateBtns" : "noDisplay"}">
                   <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
                <button name="${cmtObj.id
      }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
              </div>            
            </div>
     </div>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commentList.appendChild(div);
  });
};