
/**
 * show list of item in the store
 */
export const showStore = () => {
	$("main").append(`
		<div class="filter d-flex mt-3 mb-3">
			<button type="button" class="filter-button btn btn-warning">Show filter</button>
			<div class="filter-list me-3 ms-3" style="display:none;">
				<span>
					<label for="artist">Artist</label>
					<input type="text" id="artist" name="artist">
				</span>
				<span>
					<label for="album">Album</label>
					<input type="text" id="album" name="album">
				</span>
				<div>
					<label for="min-price">Min price</label>
					<input type="number" id="min-price" name="min-price" min="1">
					<label for="max-price">Max price</label>
					<input type="number" id="max-price" name="max-price">
				</div>
				<div>
					<div id="checkboxes">
		  				<span class="py-2">
						  <label for="rock">
						  <input type="checkbox" id="rock" value="rock" name="rock" />Rock</label>
						</span>
		  				<span class="py-2">
						  <label for="progressive-rock">
						  <input type="checkbox" id="progressive-rock" value="progressive rock" name="progressive-rock" />Progressive rock</label>
						</span>
		  				<span class="py-2">
						  <label for="soft-rock">
						  <input type="checkbox" id="soft-rock" value="soft rock" name="soft-rock" />Soft rock</label>
						</span>
		  				<span class="py-2">
						  <label for="pop-rock">
						  <input type="checkbox" id="pop-rock" value="pop rock" name="pop-rock" />Pop rock</label>
						</span>
		  				<span class="py-2">
						  <label for="jazz">
						  <input type="checkbox" id="jazz" value="jazz  name="jazz" />Jazz</label>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div id="list" class="d-flex justify-content-around"></div>
	`);
	$.post(
		"php/store.php",
		{ action: "liste" },
		(albums) => {
			let genreFilter = [];

			albums.map((album) => {
				$("#list").append(`
					<div class="card text-white bg-dark album-card-${album.id}" style="width: 16rem;">
						<img class="card-img-top" src=${album.cover} alt="Card image cap">
						<div class="card-body">
							<h5 class="card-title">${album.name}</h5>
							<div class="card-text">artist: ${album.artist}</div>
							<div>Price: ${album.price}</div>
						</div>
						<div class="genre"></div>
						<div></div>
					</div>
				`);
				/* album.genre.map(genre => {
					console.log(genre)
					$(`album-card-${album.id}`).append(`<div class="border-warning">${genre}</div>`)
				} ) */

			});

			$("main").on("click", "input[type=checkbox]", () => {
				genreFilter = $('input[type=checkbox]:checked').map((index, element) => {
					return $(element).val();
				}).get();
			})

			$("main").on("keyup click", "input", () => {
				let artistFilter = new RegExp($("#artist").val().trim(), "i");
				let albumFilter = new RegExp($("#album").val().trim(), "i");
				let minPrice = parseInt($("#min-price").val());
				let maxPrice = parseInt($("#max-price").val());

				if (minPrice > maxPrice)
					$("#min-price").val(maxPrice - 1)

				if (maxPrice < 2)
					$("#max-price").val(2)

				albums.map(album => {
					if (artistFilter.test(album.artist)
						&& albumFilter.test(album.name)
						&& (genreFilter.length === 0 || genreFilter.some(genre => album.genre.includes(genre)))
						&& ($("#min-price").val().trim().length === 0 || parseInt(album.price) >= minPrice)
						&& ($("#max-price").val().trim().length === 0 || parseInt(album.price) <= maxPrice))
						$(`.album-card-${album.id}`).show()
					else
						$(`.album-card-${album.id}`).hide()
				})
			})
		},
		"json"
	);

	let expanded = true;

	$("main").on("click", ".filter-button", () => {
		if (!expanded) {
			$('.filter-list').hide(500, "linear");
			$('.filter-button').html("Show filter");
			expanded = true;
		}
		else {
			$('.filter-list').show(500, "linear");
			$('.filter-button').html("Hide filter");
			expanded = false;
		}
	})
}