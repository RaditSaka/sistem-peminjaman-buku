// Ambil elemen dari HTML
const form = document.getElementById("formPeminjaman");
const namaInput = document.getElementById("nama");
const bukuInput = document.getElementById("buku");
const tglPinjamInput = document.getElementById("tglPinjam");
const tglKembaliInput = document.getElementById("tglKembali");
const dataTable = document.getElementById("dataTable");

// Array untuk menyimpan data
let dataPeminjaman = [];

// Untuk menyimpan index saat edit
let editIndex = null;

// Event ketika tombol Simpan ditekan
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // VALIDASI
    if (namaInput.value === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    if (bukuInput.value === "-- Pilih Buku --") {
        alert("Silakan pilih buku!");
        return;
    }

    if (tglPinjamInput.value === "") {
        alert("Tanggal pinjam tidak boleh kosong!");
        return;
    }

    if (tglKembaliInput.value === "") {
        alert("Tanggal kembali tidak boleh kosong!");
        return;
    }

    if (tglKembaliInput.value < tglPinjamInput.value) {
        alert("Tanggal kembali tidak boleh sebelum tanggal pinjam!");
        return;
    }

    const data = {
        nama: namaInput.value,
        buku: bukuInput.value,
        tglPinjam: tglPinjamInput.value,
        tglKembali: tglKembaliInput.value,
        status: "Dipinjam"
    };

    if (editIndex === null) {
        // CREATE (Tambah data)
        dataPeminjaman.push(data);
    } else {
        // UPDATE (Edit data)
        dataPeminjaman[editIndex] = data;
        editIndex = null;
    }

    form.reset(); // kosongkan form
    tampilkanData(); // tampilkan ulang tabel
});

// Fungsi untuk menampilkan data ke tabel (READ)
function tampilkanData() {
    dataTable.innerHTML = "";

    dataPeminjaman.forEach(function(item, index) {
        dataTable.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.buku}</td>
            <td>${item.tglPinjam}</td>
            <td>${item.tglKembali}</td>
            <td>${item.status}</td>
            <td>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="hapusData(${index})">Hapus</button>
            </td>
        </tr>
        `;
    });
}

// DELETE
function hapusData(index) {
    dataPeminjaman.splice(index, 1);
    tampilkanData();
}

// Ambil data untuk diedit
function editData(index) {
    const data = dataPeminjaman[index];

    namaInput.value = data.nama;
    bukuInput.value = data.buku;
    tglPinjamInput.value = data.tglPinjam;
    tglKembaliInput.value = data.tglKembali;

    editIndex = index;
}