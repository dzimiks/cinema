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

	$.get("/api/movies", function (data) {
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
	}, 'json');
});
