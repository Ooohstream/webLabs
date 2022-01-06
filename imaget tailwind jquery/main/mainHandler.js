const previewModal = (e) => {
  $("#modal").removeClass("hidden");

  $("#modal-content")
    .append($(e.target).clone())
    .append(
      $(`
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
`)
    );
};

let section = $(".gallery-grid-container")[0];

$("#modal").click((e) => {
  e.preventDefault();
  $("#modal").addClass("hidden");
  $("#modal-content").html("");
});

$("#modal-content").click((e) => {
  e.stopPropagation();
});

for (let i = 0; i < 100; i++) {
  const screenWidth = parseInt(Math.random() * (3840 - 640) + 640);
  const screenHeight = parseInt(Math.random() * (2160 - 360) + 360);

  const tile = $(`
  <div class="gallery-container wi-2 he-2">
    <div class="gallery-item">
        <div class="image">
            <img src="https://picsum.photos/${screenWidth}/${screenHeight}?random" />
        </div>
    </div>
  </div>
  `).click((e) => {
    previewModal(e);
  });

  $(section).append(tile);
}
