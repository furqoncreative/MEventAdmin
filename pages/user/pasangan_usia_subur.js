window.onload = inicializar ;
var from_validasi;
var mahasiswaRef;
var tableValidasi;
var CREATE = "Create";
var UPDATE ="Update";
var status=CREATE;
var editRef;

function inicializar(){
	from_validasi = document.getElementById("from-validasi");
	from_validasi.addEventListener("submit", validasiFirebase , false);
	tableValidasi =document.getElementById("tbody"); 
	mahasiswaRef = firebase.database().ref().child("Users").orderByChild('pendaftar').equalTo('Pasangan Usia Subur');
	tampil();
}

function tampil(){

	mahasiswaRef.on("value", function(snapshot)
	{
		var data = snapshot.val();
		var files ="";
		
		for(var key in data)
		{
			files += "<tr>"+
							   
							   "<td>" + data[key].nama + "</td>"+
							   "<td>" + data[key].alamat + "</td>"+
							   "<td>" + data[key].goldar + "</td>"+
							   "<td>" + data[key].ponsel + "</td>"+ 
							    "<td>" + data[key].pendaftar + "</td>"+ 
							   '<td>'+'<button class="btn btn-danger hapus" data-validasi="'+key+'">Hapus</button>'+'</td>' +
							  "<tr>";
			

		}
		tableValidasi.innerHTML= files;
		if (files !="") {	

			// var elementEditTabel = document.getElementsByClassName("edit");
			// for (var i =0; i<elementEditTabel.length; i++) {
			// 	elementEditTabel[i].addEventListener("click",editaFirebase,false);			}


			var elementHapusTable = document.getElementsByClassName("hapus");
			for (var i =0; i<elementHapusTable.length; i++) {
				elementHapusTable[i].addEventListener("click",hapusFirebase,false);			}
		}
	});
}

function editaFirebase(){
	var keyEdit = this.getAttribute("data-validasi");
	editRef = mahasiswaRef.child(keyEdit);
	editRef.once("value", function(snap){
		var data = snap.val();
		document.getElementById("nama_id").value = data.nama;
		document.getElementById("alamat_id").value = data.alamat;
		document.getElementById("goldar_id").value = data.goldar;
		document.getElementById("ponsel").value = data.ponsel;
		document.getElementById("pendaftar").value = data.pendaftar;
	});
	document.getElementById("buttom-form").value =UPDATE;
	status = UPDATE;
	
}

function hapusFirebase(){
	
	if(confirm('This entry will be permanently delete. Are you sure?')){
		var keyHapus = this.getAttribute("data-validasi");
		var hapusRef = mahasiswaRef.child(keyHapus);
        hapusRef.remove();
    }
}



function validasiFirebase(event){
	event.preventDefault();

    switch(status)
    {
    	case CREATE:	
	    mahasiswaRef.push({
		nama : event.target.nama.value,
		alamat : event.target.alamat.value,
		goldar : event.target.goldar.value,
		ponsel : event.target.ponsel.value,
		pendaftar : event.target.pendaftar.value
	});
	break;
		case UPDATE:
		editRef.update({
		nama : event.target.nama.value,
		alamat : event.target.alamat.value,
		goldar : event.target.goldar.value,
		ponsel : event.target.ponsel.value,
		pendaftar : event.target.pendaftar.value
		})
      document.getElementById("buttom-form").value =UPDATE;

    }
	from_validasi.reset();
}
