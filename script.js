// 🔌 Cek koneksi internet saat halaman dibuka
(async function checkInternetAccess() {
  if (!navigator.onLine) {
    showOfflinePage();
    return;
  }

  try {
    // Ping Google (tanpa-cors karena browser modern batasi)
    await fetch("https://www.google.com", { mode: "no-cors" });
  } catch (e) {
    showOfflinePage();
  }
})();

function showOfflinePage() {
  document.body.innerHTML = `
    <div style="text-align:center; padding:50px; font-family:sans-serif">
      <h1>🚫 Tidak Ada Koneksi Internet</h1>
      <p>Silakan sambungkan ke internet untuk menggunakan BlueDek Food.</p>
    </div>
  `;
}
let cart = [];
let voucherDiscount = 0;

const validVouchers = {
  "BELANJAHEMAT": 100000,
  "GITHUB": 100000,
  "EASTEREGG": 10000,
 
};

function navigate(page) {
  document.querySelectorAll('main section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(page).classList.add('active');
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function applyVoucher() {
  const code = document.getElementById('voucher').value.trim().toUpperCase();
  if (validVouchers[code]) {
    voucherDiscount = validVouchers[code];
    alert(`Voucher berhasil diterapkan: -Rp ${voucherDiscount}`);
  } else {
    voucherDiscount = 0;
    alert("Voucher tidak valid");
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const totalDisplay = document.getElementById('total');
  cartList.innerHTML = '';
  let total = 0;
  // Update badge jumlah item keranjang di tombol navigasi
const navCartBadge = document.getElementById("nav-cart-badge");
if (navCartBadge) {
  const cartCount = cart.length;
  if (cartCount > 0) {
    navCartBadge.textContent = cartCount;
    navCartBadge.style.display = "inline-block";
  } else {
    navCartBadge.style.display = "none"; // Sembunyikan badge
  }
}

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp ${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  total -= voucherDiscount;
  if (total < 0) total = 0;

  totalDisplay.textContent = total;
}

function placeOrder() {
  const name = document.getElementById('customer-name').value.trim();
  const address = document.getElementById('customer-address').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const metode = document.getElementById('metode-pembayaran').value;
  const estimasiEl = document.getElementById('estimasi-pengantaran');

  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  if (!name || !address || !phone) {
    alert("Harap lengkapi data pemesan.");
    return;
  }

  // Random estimasi waktu 25–35 menit
  const min = 25;
  const max = 35;
  const estimasi = Math.floor(Math.random() * (max - min + 1)) + min;

  // Tampilkan estimasi di halaman
  estimasiEl.textContent = `Pesanan Anda diproses. Estimasi pengantaran: ${estimasi} menit.`;

  // Ringkasan
  let ringkasan = `Pesanan atas nama: ${name}\nAlamat: ${address}\nNomor HP: ${phone}\nPembayaran: ${metode}\n\nPesanan:\n`;
  let total = 0;
  cart.forEach(item => {
    ringkasan += `- ${item.name} - Rp ${item.price}\n`;
    total += item.price;
  });
  total -= voucherDiscount;
  if (total < 0) total = 0;

  ringkasan += `\nDiskon: Rp ${voucherDiscount}\nTotal Bayar: Rp ${total}\nEstimasi antar: ${estimasi} menit`;

  alert("Pesanan berhasil!\n\n" + ringkasan);

  // Reset
  cart = [];
  voucherDiscount = 0;
  document.getElementById('voucher').value = '';
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-address').value = '';
  document.getElementById('customer-phone').value = '';
  updateCart();
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  // Ganti emoji pada tombol
  const btn = document.getElementById("dark-mode-btn");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Night Mode";
  }
}
let currentLanguage = "id";

function toggleLanguage() {
  const langBtn = document.getElementById("language-btn");

  if (currentLanguage === "id") {
    currentLanguage = "en";
    langBtn.textContent = "🇬🇧 English";

    // Ubah teks ke English
    document.getElementById("judul-home").textContent = "Welcome to BlueDek Food";
    document.getElementById("akhir-an").textContent = "See All My Project";
    document.getElementById("popup-tolo").textContent = "Are you sure you want to log out?";
    document.getElementById("popup-tolo").textContent = "Are you sure you want to log out?";
    document.getElementById("but-ton").textContent = "Cart";
    document.getElementById("pesan-barang").textContent = "Order";
    document.getElementById("versi-bluedek").textContent = "Version 4.0";
    document.getElementById("order-barang").textContent = "Order Now";
    document.getElementById("deskripsi-home").textContent = "Order your favorite food fast and safely!";
    document.getElementById("deskripsi-homee").textContent = "To order food, press the menu button.";
    document.getElementById("judul-menu").textContent = "Our Menu";
    document.getElementById("judul-cart").textContent = "Your Cart";
    document.getElementById("label-voucher").textContent = "Voucher Code:";
    document.getElementById("label-nama").placeholder = "Full Name";
    document.getElementById("label-alamat").placeholder = "Full Address";
    document.getElementById("order-barang1").textContent = "Order";
document.getElementById("order-barang2").textContent = "Order";
document.getElementById("order-barang3").textContent = "Order";
document.getElementById("order-barang4").textContent = "Order";
document.getElementById("order-barang5").textContent = "Order";
document.getElementById("order-barang6").textContent = "Order";
document.getElementById("order-barang7").textContent = "Order";
document.getElementById("order-barang8").textContent = "Order";
document.getElementById("order-barang9").textContent = "Order";
document.getElementById("order-barang10").textContent = "Order";
document.getElementById("order-barang11").textContent = "Order";
document.getElementById("order-barang11").textContent = "Order";
document.getElementById("order-barang12").textContent = "Order";
document.getElementById("order-barang13").textContent = "Order";
document.getElementById("order-barang14").textContent = "Order";
document.getElementById("order-barang15").textContent = "Order";
document.getElementById("order-barang16").textContent = "Order";
    document.getElementById("label-hp").placeholder = "Phone Number";
    document.querySelector(".order-btn").textContent = "Place Order";
  } else {
    currentLanguage = "id";
    langBtn.textContent = "🇮🇩 Bahasa";

    // Ubah kembali ke Indonesia
    document.getElementById("judul-home").textContent = "Selamat Datang di BlueDek Food";
    document.getElementById("akhir-an").textContent = "Lihat Semua Projek Kami";
    document.getElementById("popup-tolo").textContent = "Apakah kamu yakin ingin logout?";
    document.getElementById("but-ton").textContent = "Keranjang";
    document.getElementById("pesan-barang").textContent = "Pesan";
    document.getElementById("versi-bluedek").textContent = "Versi 4.0";
    document.getElementById("order-barang").textContent = "Order Sekarang";
    document.getElementById("deskripsi-home").textContent = "Pesan makanan favoritmu cepat dan aman!";
    document.getElementById("deskripsi-homee").textContent = "Untuk Memesan Makanan Pencet Tombol Menu.";
    document.getElementById("judul-menu").textContent = "Menu Kami";
    document.getElementById("judul-cart").textContent = "Keranjang Kamu";
    document.getElementById("label-voucher").textContent = "Kode Voucher:";
    document.getElementById("label-nama").placeholder = "Nama lengkap";
    document.getElementById("label-alamat").placeholder = "Alamat lengkap";
        document.getElementById("order-barang1").textContent = "Pesan";
document.getElementById("order-barang2").textContent = "Pesan";
document.getElementById("order-barang3").textContent = "Pesan";
document.getElementById("order-barang4").textContent = "Pesan";
document.getElementById("order-barang5").textContent = "Pesan";
document.getElementById("order-barang6").textContent = "Pesan";
document.getElementById("order-barang7").textContent = "Pesan";
document.getElementById("order-barang8").textContent = "Pesan";
document.getElementById("order-barang9").textContent = "Pesan";
document.getElementById("order-barang10").textContent = "Pesan";
document.getElementById("order-barang11").textContent = "Pesan";
document.getElementById("order-barang11").textContent = "Pesan";
document.getElementById("order-barang12").textContent = "Pesan";
document.getElementById("order-barang13").textContent = "Pesan";
document.getElementById("order-barang14").textContent = "Pesan";
document.getElementById("order-barang15").textContent = "Pesan";
document.getElementById("order-barang16").textContent = "Pesan";
    document.getElementById("label-hp").placeholder = "Nomor HP";
    document.querySelector(".order-btn").textContent = "Order Sekarang";
  }
}
function searchMenu() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".menu-grid .card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name");
    if (name.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
  // Sembunyikan tombol Register/Login jika sudah login
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector('a[href="login.html"]');
  if (loginLink && localStorage.getItem("isLoggedIn") === "true") {
    loginLink.style.display = "none";
  }
});
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.reload();
}

// Tampilkan tombol logout jika user login
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn && localStorage.getItem("isLoggedIn") === "true") {
    logoutBtn.style.display = "inline-block";
  }
});
  function confirmLogout() {
  const konfirmasi = confirm("Apakah kamu ingin logout dari akunmu?");
  if (konfirmasi) {
    localStorage.removeItem("isLoggedIn");
    window.location.reload(); // atau arahkan ke login.html
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn && localStorage.getItem("isLoggedIn") === "true") {
    logoutBtn.style.display = "inline-block";
  }
});
function showLogoutPopup() {
  document.getElementById("logout-popup").style.display = "flex";
}
function closeLogoutPopup() {
  const popup = document.getElementById("logout-popup");
  popup.style.animation = "fadeOut 0.2s ease";
  setTimeout(() => {
    popup.style.display = "none";
    popup.style.animation = "fadeIn 0.3s ease"; // reset animasi untuk dibuka ulang nanti
  }, 200);
}

function logoutConfirm() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html"; // arahkan ke halaman login
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn && localStorage.getItem("isLoggedIn") === "true") {
    logoutBtn.style.display = "inline-block";
  }
});
function saveFeedback() {
  const feedbackText = document.querySelector('#feedback textarea').value.trim();
  if (!feedbackText) {
    alert("Feedback kosong!");
    return;
  }

  const blob = new Blob([feedbackText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "feedback.txt";
  a.click();

  URL.revokeObjectURL(url);
}
function cekKota() {
  const output = document.getElementById("lokasi-output");

  if (!navigator.geolocation) {
    output.textContent = "Geolocation tidak didukung di browser ini.";
    return;
  }

  output.textContent = "Sedang mencari lokasi...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();

        const city = data.address.city || data.address.town || data.address.village || data.address.county;
        const country = data.address.country;

        output.textContent = `Lokasi Anda: ${city}, ${country}`;
      } catch (e) {
        output.textContent = "Gagal mengambil informasi lokasi.";
      }
    },
    () => {
      output.textContent = "Gagal mendapatkan lokasi (mungkin izin ditolak).";
    }
  );
}