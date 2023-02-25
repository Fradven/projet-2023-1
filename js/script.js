// fetch login form when the page loads
$(document).ready(() => {
  $.post(
    "php/api.php",
    { action: "session" },
    (data) => {
      if (data.session === "none") {
        $.post("template/connection.tpl", (data) => {
          $("main").append(data);
        });
      } else {
        $.post(
          "php/store.php",
          { action: "liste" },
          (albums) => {
            albums.map((album) => {
              $("main").append(`
                <div class="card text-white bg-dark" style="width: 12rem;">
                    <img class="card-img-top" src=${album.cover} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${album.name}</h5>
                        <p class="card-text">artist: ${album.artist}</p>
                    </div>
                </div>
                `);
            });
          },
          "json"
        );
      }
    },
    "json"
  );
});

// show login button if username and pqssword input are not empty
$("main").on("keyup", "input#username, input#pwd", () => {
  let username = $("input#username").val().trim();
  let pwd = $("input#pwd").val().trim();

  if (username && pwd)
    $(".container__login-btn").html(
      `<button type="submit" class="btn btn-gold submit" value="login" name="login">Login</button>`
    );
  else $(".submit").remove();
});

// if login is right, fetch store front
$("main").on("click", ".submit", () => {
  let username = $("#username").val().trim();
  let password = $("#pwd").val().trim();
  let rememberMe = $("#rememberMe").is(":checked");

  $.post(
    "php/api.php",
    {
      action: "login",
      username: username,
      pwd: password,
      rememberMe: rememberMe,
    },
    (data) => {
      if (data.error) {
        $("body").append(`
                <div id="myModal" class="modal-component">
                    <div class="modal-content bg-dark">
                        <p>${data.error}</p>
                    </div>
                </div>
            `);
      } else {
        $("main").html("");
        $.post(
          "php/store.php",
          { action: "liste" },
          (albums) => {
            albums.map((album) => {
              $("main").append(`
                    <div class="card text-white bg-dark" style="width: 12rem;">
                        <img class="card-img-top" src=${album.cover} alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${album.name}</h5>
                            <p class="card-text">artist: ${album.artist}</p>
                        </div>
                    </div>
                    `);
            });
		},
		"json"
        );
      }
    },
    "json"
  );
});

$("body").on("click", "div#myModal", () => {
  $("#myModal").remove();
});

$(".kill-session").click(() => {
  $.post("php/action.php", { action: "kill" }, () => {
    location.reload();
  });
});
