const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  [...form.getElementsByTagName("input")].forEach((input) => {
    if (!input.value.trim()) {
      input.classList.remove("border-black");
      input.classList.add("border-red-500");
      if (!input.parentElement.getElementsByTagName("p").length > 0)
        input.parentElement.innerHTML += `
          <p class="text-xs absolute top-full text-red-500">
            Can't be empty
          </p>`;
    } else {
      [...input.parentElement.getElementsByTagName("p")].forEach((pTag) => {
        input.parentElement.removeChild(pTag);
      });
      input.classList.remove("border-red-500");
      input.classList.add("border-black");
    }
  });
});
