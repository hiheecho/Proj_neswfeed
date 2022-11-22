const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const btnOpenPopup = document.querySelector(".btn-open-popup");

btnOpenPopup.addEventListener("click", () => {
  modal.classList.toggle("show");

  if (modal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }

  if (modal.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show");

    if (!modal.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  }
});

//불러온 img파일을 데이터 형식으로 변환시켜 html에 있는 class="image-on" 에 넣는다
const onFileChange = (event) => {
  const theFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(theFile);
  reader.onloadend = (finishedEvent) => {
    const imgDataUrl = finishedEvent.currentTarget.result;
    document.getElementById("image-on").src = imgDataUrl;
  };
};

//데이터 파일로 변환된 img 파일을 화면에 표시
function createElement(e, file) {
  const imageOn = document.createElement("image-on");
  const img = document.createElement("img");
  img.setAttribute("src", e.target.result);
  img.setAttribute("data-file", file.name);
  imageOn.appendChild(img);

  return imageOn;
}

//화면에 표시된 camera 아이콘을 클릭하면 img파일을 upload 할 수 있는 판업창을 화면에 표시함
const cameraUpload = document.querySelector(".camera-upload");
const camera = document.querySelector(".profile-camera");

camera.addEventListener("click", () => cameraUpload.click());

cameraUpload.addEventListener("change", onFileChange);
