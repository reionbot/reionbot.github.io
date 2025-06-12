document.addEventListener('DOMContentLoaded', function() {
    const desktopAuthContainer = document.getElementById('auth-buttons-desktop');
    const mobileAuthContainer = document.getElementById('auth-buttons-mobile');
    
    // Cek status login dari simulasi penyimpanan browser (localStorage)
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    let desktopButtonsHTML = '';
    let mobileButtonsHTML = '';

    if (loggedInUser) {
        // Jika pengguna sudah login
        const user = JSON.parse(loggedInUser);
        const dashboardUrl = user.role === 'admin' ? 'dashboard-admin.html' : 'dashboard-pelanggan.html';
        
        desktopButtonsHTML = `
            <a href="${dashboardUrl}" class="bg-gray-200 text-gray-800 font-semibold px-5 py-2 rounded-lg hover:bg-gray-300">Dashboard</a>
            <button id="logout-button-desktop" class="text-gray-600 font-medium hover:text-indigo-600">Logout</button>
        `;
        mobileButtonsHTML = `
            <a href="${dashboardUrl}" class="block py-2 text-gray-600 font-semibold bg-gray-100 text-center rounded-lg">Dashboard</a>
            <button id="logout-button-mobile" class="block w-full text-left py-2 text-gray-600 mt-2">Logout</button>
        `;
    } else {
        // Jika pengguna belum login
        desktopButtonsHTML = `
            <a href="login.html" class="text-gray-600 font-medium hover:text-indigo-600">Login</a>
            <a href="#harga" class="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 shadow hover:shadow-lg">Daftar</a>
        `;
        mobileButtonsHTML = `
            <a href="login.html" class="block py-2 text-gray-600">Login</a>
            <a href="#harga" class="block mt-2 bg-indigo-600 text-white text-center font-semibold px-5 py-2 rounded-lg">Daftar</a>
        `;
    }
    
    desktopAuthContainer.innerHTML = desktopButtonsHTML;
    mobileAuthContainer.innerHTML = mobileButtonsHTML;
    
    // Fungsi untuk proses logout
    function logout() {
        localStorage.removeItem('loggedInUser');
        // Arahkan kembali ke halaman utama setelah logout
        window.location.href = 'index.html';
    }

    // Tambahkan event listener ke tombol logout jika ada
    if (loggedInUser) {
        document.getElementById('logout-button-desktop').addEventListener('click', logout);
        document.getElementById('logout-button-mobile').addEventListener('click', logout);
    }
});

