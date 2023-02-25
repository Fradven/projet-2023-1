export function sessionCheck() {
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
}