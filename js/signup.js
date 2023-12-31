import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var signup = document.getElementById("signup");

var email = document.getElementById("email");
var password = document.getElementById("password");

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    location.href = "/auth/panel.html";
  }
});

window.onloadTurnstileCallback = function () {
  turnstile.render("#turnstile", {
    sitekey: "0x4AAAAAAACYWAGYl5B5l4E9",
    callback: function (token) {
      signup.removeAttribute("disabled");
    },
  });
};

turnstile.ready(onloadTurnstileCallback);

signup.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.localStorage.setItem("email", user.email);
      window.location.href = "/auth/panel.html";
    })
    .catch((error) => {
      const errorcode = error.code;
      let errormessage = error.message;

      errormessage = errormessage.replace("Firebase: Error ", "")

      if (errorcode == "auth/email-already-in-use") {
        document.getElementById("error-mess").textContent =
          "ユーザーがすでに存在します。";
      } else {
        document.getElementById("error-mess").textContent =
          "エラー: " + errormessage;
      }
    });
});
