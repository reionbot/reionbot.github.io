// =================================================================
// INI ADALAH CONTOH KODE UNTUK BACK-END SERVER (berjalan di Node.js)
// =================================================================

// 1. Impor semua library yang dibutuhkan
const express = require('express');      // Untuk membuat web server & webhook
const http = require('http');            // Modul dasar untuk server HTTP
const { Server } = require("socket.io"); // Library untuk koneksi real-time (WebSocket)
// const db = require('./database');     // Ini adalah koneksi ke database Anda nanti

// 2. Inisialisasi Server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Izinkan koneksi dari semua alamat (untuk pengembangan)
  }
});

// Middleware untuk membaca data JSON dari request
app.use(express.json());

// 3. LOKET PENERIMAAN PESAN DARI WHATSAPP (WEBHOOK)
// WhatsApp akan mengirim data ke alamat ini: https://namadomainanda.com/webhook
app.post('/webhook', (req, res) => {
    console.log('Pesan baru diterima dari WhatsApp:', req.body);

    // Ambil detail pesan dari data yang dikirim WhatsApp
    const pesanMasuk = req.body.message;
    const nomorPengirim = req.body.from;
    const idPelanggan = 'user123'; // Nanti, Anda akan mencari ID pelanggan dari database berdasarkan nomor bot

    // SIMULASI PROSES di SERVER:
    // a. Simpan pesan ke database Anda
    // db.saveMessage(idPelanggan, pesanMasuk);

    // b. Ambil statistik terbaru dari database setelah diupdate
    // const statistikTerbaru = db.getStats(idPelanggan); -> contoh: { totalMasuk: 151, totalTerkirim: 148 }
    
    // c. BUAT DATA PALSU untuk dikirim ke dashboard (karena kita tidak punya database)
    const dataUpdatePalsu = {
        totalMasuk: Math.floor(Math.random() * 1000) + 500, // Angka acak baru
        pesanBaru: pesanMasuk,
        waktu: new Date().toLocaleTimeString()
    };
    
    // 4. "BERTERIAK" KE DASHBOARD (MENGIRIM SINYAL REAL-TIME)
    // Mengirim event bernama 'data_baru_dari_server' ke semua dashboard yang terhubung
    io.emit('data_baru_dari_server', dataUpdatePalsu);
    console.log('Sinyal real-time dikirim ke dashboard.');

    // 5. Kirim balasan "OK" ke WhatsApp untuk memberitahu bahwa pesan sudah diterima
    res.status(200).send('OK');
});

// 6. Saat ada dashboard yang terhubung ke server ini
io.on('connection', (socket) => {
    console.log('Sebuah dashboard telah terhubung via WebSocket!');
    
    socket.on('disconnect', () => {
        console.log('Sebuah dashboard terputus.');
    });
});

// 7. Jalankan server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server Reion Bot sedang berjalan di http://localhost:${PORT}`);
});

