let cart = [];
let voucherDiscount = 0;

const validVouchers = {
  "BELANJAHEMAT": 100000,
  "GITHUB": 100000,
"MASUKKAN KODE...": lol,
  "HOSTEDBYGITHUB": 100000000,
"Massukan kode...": lol,
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
    document.getElementById("deskripsi-home").textContent = "Order your favorite food fast and safely!";
    document.getElementById("deskripsi-homee").textContent = "To order food, press the menu button.";
    document.getElementById("judul-menu").textContent = "Our Menu";
    document.getElementById("judul-cart").textContent = "Your Cart";
    document.getElementById("label-voucher").textContent = "Voucher Code:";
    document.getElementById("label-nama").placeholder = "Full Name";
    document.getElementById("label-alamat").placeholder = "Full Address";
    document.getElementById("label-hp").placeholder = "Phone Number";
    document.querySelector(".order-btn").textContent = "Place Order";
  } else {
    currentLanguage = "id";
    langBtn.textContent = "🇮🇩 Indonesia";

    // Ubah kembali ke Indonesia
    document.getElementById("judul-home").textContent = "Selamat Datang di BlueDek Food";
    document.getElementById("deskripsi-home").textContent = "Pesan makanan favoritmu cepat dan aman!";
    document.getElementById("deskripsi-homee").textContent = "Untuk Memesan Makanan Pencet Tombol Menu.";
    document.getElementById("judul-menu").textContent = "Menu Kami";
    document.getElementById("judul-cart").textContent = "Keranjang Kamu";
    document.getElementById("label-voucher").textContent = "Kode Voucher:";
    document.getElementById("label-nama").placeholder = "Nama lengkap";
    document.getElementById("label-alamat").placeholder = "Alamat lengkap";
    document.getElementById("label-hp").placeholder = "Nomor HP";
    document.querySelector(".order-btn").textContent = "Order Sekarang";
  }
}

  
  