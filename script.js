let cart = [];
let voucherDiscount = 0;

const validVouchers = {
  "BELANJAHEMAT": 100000,
  "GITHUB": 100000,
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

  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  if (!name || !address || !phone) {
    alert("Harap lengkapi data pemesan.");
    return;
  }

  let orderSummary = `Pesanan atas nama: ${name}\nAlamat: ${address}\nNomor HP: ${phone}\n\nPesanan:\n`;
  cart.forEach(item => {
    orderSummary += `- ${item.name} - Rp ${item.price}\n`;
  });

  const total = Math.max(0, cart.reduce((t, i) => t + i.price, 0) - voucherDiscount);
  orderSummary += `\nDiskon: Rp ${voucherDiscount}\nTotal Bayar: Rp ${total}`;

  alert("Pesanan berhasil!\n\n" + orderSummary);

  // Reset semuanya
  cart = [];
  voucherDiscount = 0;
  document.getElementById('voucher').value = '';
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-address').value = '';
  document.getElementById('customer-phone').value = '';
  updateCart();
}

  
  