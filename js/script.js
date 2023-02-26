import { showStore } from "./storeFront"

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
            showStore();
          }
        },
        "json"
      );
});

// show login button if username and password input are not empty
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
	let rememberMe = $("#rememberMe").is(":checked") ? "true" : "false";

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
            showStore();
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
$(".kill-cookie").click(() => {
	$.post("php/action.php", { action: "cookie" }, () => {
		location.reload();
	});
});
