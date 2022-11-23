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
        orderBy("createAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const reveiwObj = {
            id: doc.id,
            ...doc.data(),
        };
        cmtObjList.push(reveiwObj);
    });

    const reviewList = document.getElementById("review-list");
    const currentUid = authService.currentUser.uid;
    reviewList.innerHTML = "";
    cmtObjList.forEach((cmtObj) => {
        const isOwner = currentUid === cmtObj.creatorId;
        const temp_html = ``;
        const div = document.createElement('div');
        div.classList.add("myreview");
        div.innerHTML = temp_html;
        reviewList.appendChild(div);
    })
}