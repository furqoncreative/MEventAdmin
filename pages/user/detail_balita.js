window.onload = inicializar;
var mahasiswaRef;
var tableValidasi;
var user_id;

function $_GET(key) {
	var queries = window.location.href.split('?').pop().split('&');
	var params = {};
	queries.map(function (query) {
		var set = query.split('=');
		params[set[0]] = set[1];
	});

	if (key) {
		return params[key] || null;
	} else {
		return params;
	}
}

function inicializar() {
	user_id = $_GET("id");
	tableValidasi = document.getElementById("tbody");
	mahasiswaRef = firebase.database().ref().child("History").orderByChild('id').equalTo(user_id);
	tampil();
}

function tampil(){
	mahasiswaRef.on("value", function (snapshot) {
		var data = snapshot.val();
		var files = "";

		for (var key in data) {
			files += "<tr>" +
				"<td>" + data[key].hari + "</td>" +
				"<td>" + data[key].tinggi + "</td>" +
				"<td>" + data[key].berat + "</td><tr>";
		}
		tableValidasi.innerHTML = files;
	});
}

