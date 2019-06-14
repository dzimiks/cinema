$(document).ready(function () {
	// $('.movie-description').each(() => {
	// 	const description = $(this);
	// 	const desc = $(this).val();
	//
	// 	// console.log(description);
	// 	// console.log(desc);
	//
	// 	if (desc.length > 256) {
	// 		console.log('Replacing text...');
	// 		const replacement = desc.substring(0, 256) + '...';
	// 		description.replaceWith(replacement);
	// 	}
	// });

	// $(".delete-movie-btn").click((e) => {
	// 	e.preventDefault();
	//
	// 	$.ajax({
	// 		type: "post",
	// 		url: "/delete-movie",
	// 		data: {
	// 			data: JSON.stringify($(this).text())
	// 		},
	// 		success: function (result) {
	// 			alert('ok');
	// 		},
	// 		error: function (result) {
	// 			alert('error');
	// 		}
	// 	});
	// });

	$.get("/api/movies", (data) => {
		$("#search_input").typeahead({
			source: data,
			displayText: (item) => {
				const html = '<div class="row">' +
					'<div class="col-4">' +
					'<img src="https://picsum.photos/200/150/?random" class="img-fluid">' +
					'</div>' +
					'<div class="col-8">' +
					'<h3>' + item.title + '</h3>' +
					'<p class="small">' + item.genre + ' | ' + item.duration + '</p>' +
					'<p>' + item.description + '</p>' +
					'</div>' +
					'</div>' +
					'<hr>';
				return html;
			},
			afterSelect: (item) => {
				window.location.href = 'http://localhost:3000/movies/' + item.url;
			},
			items: 4
		});

		if ($('#movies-table').length) {
			let movies = data;
			let final = [];

			for (let movie of movies) {
				final.push([
					movie.title,
					movie.description,
					movie.genre.toLowerCase(),
					movie.duration,
					movie.actors
				]);
			}

			$('#movies-table').DataTable({
				responsive: true,
				data: final
			});
		}
	}, 'json');

	$.get("/api/users", (data) => {
		if ($('#users-table').length) {
			let users = data;
			let final = [];

			for (let user of users) {
				final.push([
					user.firstName,
					user.lastName,
					user.email,
					user.password,
					user.username,
					user.role.name,
					user.status.name,
					user.isBanned,
					user.banHistory,
					user.reservationNumber
				]);
			}

			$('#users-table').DataTable({
				responsive: true,
				data: final
			});
		}
	}, 'json');
});
