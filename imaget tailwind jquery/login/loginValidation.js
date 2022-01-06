$(() => {
  $("form[name='login']").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      password: {
        required: "You need to enter your password!",
      },
      email: "Please provide a valid email address",
    }
  });
  console.log("hello")
});
