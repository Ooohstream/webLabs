$(() => {
  $("form[name='join']").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6
      },
      "repeatPassword": {
        required: true,
        minlength: 6,
        equalTo: "input[name='password']"
      }
    },
    messages: {
      firstName: "You need to specify first name!",
      lastName: "You need to specify last name!",
      password: {
        required: "You need to provide password!",
        minlength: "Your password must be at least 6 characters long"
      },
      email: "Please provide a valid email address",
      "repeatPassword": {
        required: "You need to repeat password!",
        "equalTo": "Please enter the same password as above!"
      }
    }
  });
});
