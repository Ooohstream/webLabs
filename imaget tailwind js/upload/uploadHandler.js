const uploadInput = document.getElementById("image-upload-input");

uploadInput.addEventListener("change", (e) => {
  const label = document.getElementsByTagName("h3")[0];
  label.textContent = e.target.value;
});
