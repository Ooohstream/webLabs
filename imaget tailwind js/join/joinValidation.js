const validateEmail = (emailField) => {
  if (
    emailField.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) === null
  )
    return "Wrong email address";
};

const validateName = (nameField) => {
  if (nameField.value.length < 2) return "At least 2 characters";
};

const validatePassword = (passwordField) => {
  if (
    passwordField.value.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    ) === null
  )
    return "The password should contain at least one number and one special character";
};

const validateRepeatPassword = (repeatPasswordField, passwordField) => {
  if (repeatPasswordField.value !== passwordField.value)
    return "Passwords are not the same";
};

const validateEmpty = (field) => {
  if (!field.value.trim()) return "Required";
};

const form = document.getElementsByTagName("form")[0];
form.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    [...form.getElementsByTagName("input")].forEach((input) => {
      let errorText = [];

      if (input.getAttribute("name") === "email")
        errorText.push(validateEmail(input));
      if (
        input.getAttribute("name") === "firstName" ||
        input.getAttribute("name") === "lastName"
      )
        errorText.push(validateName(input));
      if (input.getAttribute("name") === "password")
        errorText.push(validatePassword(input));

      if (input.getAttribute("name") === "repeatPassword")
        errorText.push(validateRepeatPassword(input, form.password));

      errorText.push(validateEmpty(input));

      errorText = errorText.filter((text) => text);

      if (errorText.length > 0) {
        input.classList.remove("border-black");
        input.classList.add("border-red-500");

        if (!input.parentElement.getElementsByTagName("p").length > 0)
          input.parentElement.innerHTML += `
          <p class="text-xs absolute top-full text-red-500">
            ${errorText.join(". ")}
          </p>`;
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-black");
        [...input.parentElement.getElementsByTagName("p")].forEach((pTag) => {
          input.parentElement.removeChild(pTag);
        });
      }
    });
  },
  true
);
