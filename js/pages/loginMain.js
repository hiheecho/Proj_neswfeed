import {
    doc,
    collection,
    orderBy,
    query,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  import { dbService, authService } from "../firebase.js";

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
              <button name="${cmtObj.id}" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
          </div>            
        </div>
    </div>`;
      const div = document.createElement("div");
      div.classList.add("mycards");
      div.innerHTML = temp_html;
      commentList.appendChild(div);
    });
  };