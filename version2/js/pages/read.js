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

    const reviewContent = document.getElementById("read-container")
    const currentUid = authService.currentUser.uid;
    rvObjList.forEach((rvObj) => {
      const temp_html = `
            <div class="form-floating">
                <h3>${rvObj.movieTitle}</h3>
                <p>${rvObj.review}</p>
                <span>${new Date(rvObj.createdAt).toString()
                    .slice(0,25)}</span>
            </div>
            `;
      const div = document.createElement("div");
      div.classList.add("review-content")
      div.innerHTML = temp_html;  
      reviewContent.appendChild(div);
    });

  