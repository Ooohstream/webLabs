const previewModal = (e) => {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");

  const modalContent = document.getElementById("modal-content");
  const img = e.target.cloneNode(true);
  modalContent.appendChild(img);
  modalContent.innerHTML += `
    <div class="flex flex-1 mt-5">
        <div class="flex-1 flex flex-col justify-evenly items-start">
            <span>Photo name</span>
            <span>By Chris Neyman</span>
            <span>Added 01.01.2022</span>
            <span>Category: Wallpapers</span>
        </div>
        <div class="flex-1 bg-white flex justify-around items-center flex-col">
        <button class="p-1 bg-black text-white rounded-lg w-5/6">
            Download
         </button>
         <button class="p-1 bg-black text-white rounded-lg w-5/6">
            Preview in full size
         </button>
        </div>
    </div>
  `;
};

let section = document.getElementsByClassName("gallery-grid-container")[0];

document.getElementById("modal").addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";
});

document.getElementById("modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

for (let i = 0; i < 100; i++) {
  const screenWidth = parseInt(Math.random() * (3840 - 640) + 640);
  const screenHeight = parseInt(Math.random() * (2160 - 360) + 360);
  const galleryContainer = document.createElement("div");

  galleryContainer.classList.add("gallery-container", "wi-2", "he-2");

  galleryContainer.innerHTML = `
    <div class="gallery-item">
        <div class="image">
            <img src="https://picsum.photos/${screenWidth}/${screenHeight}?random" />
        </div>
    </div>`;

  galleryContainer.addEventListener("click", (e) => {
    previewModal(e);
  });

  section.appendChild(galleryContainer);
}
