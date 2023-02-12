// fetch login form when the page loads
$(document).ready(function(){
    $.post("template/connection.tpl", function(data){
        $("main").append(data)
    })
})

// show login button if username and pqssword input are not empty
$("main").on("keyup", "input#username, input#pwd", function(){
    let username = $("input#username").val().trim();
    let pwd = $("input#pwd").val().trim();

    if (username && pwd)
        $(".container__login-btn").html(`<button type="submit" class="btn btn-gold submit" value="login" name="login">Login</button>`)
    else 
        $(".submit").remove();
})

// if login is right, fetch store front
$("main").on("click", ".submit",function(){
    let username = $("#username").val().trim();
    let password = $("#pwd").val().trim();
    let rememberMe = $("#rememberMe").is(":checked");

    $.post("php/connection.php", {login: "login", username: username, pwd: password, rememberMe:rememberMe}, function(data) {
        if (data.error) {
            console.log(data.error)
            $("body").append(`
                <div id="myModal" class="modal-component">
                    <div class="modal-content bg-dark">
                        <p>${data.error}</p>
                    </div>
                </div>
            `)
        }
        else {
            $("main").html("");
            $.post("php/store.php", {action: "liste"}, function(albums){
                albums.map(album => {
                    $("main").append(`
                    <div class="card text-white bg-dark" style="width: 12rem;">
                        <img class="card-img-top" src=${album.cover} alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${album.name}</h5>
                            <p class="card-text">artist: ${album.artist}</p>
                        </div>
                    </div>
                    `);
                })
            }, "json")
        }
    },"json")
})

$("body").on("click", "div#myModal", function() {
    $("#myModal").remove();
})