const dummyUsers = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];
function openLogin() {
  document.getElementById('loginModal').classList.remove('hidden');
  clearLoginError();
}
function closeLogin() {
  document.getElementById('loginModal').classList.add('hidden');
  clearLoginError();
}
function clearLoginError() {
  let err = document.getElementById('loginError');
  if (err) err.innerText = '';
}
function showLoginError(msg) {
  let err = document.getElementById('loginError');
  if (err) {
    err.innerText = msg;
  }
}
function loginUser() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const user = dummyUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('username', username);
    alert('Login successful');
    closeLogin();
    updateNavbarForLogin();
  } else {
    showLoginError('Login yoki parol noto‘g‘ri!');
  }
}
function isLoggedIn() {
  return !!localStorage.getItem('token');
}
function updateNavbarForLogin() {
  const loginBtn = document.getElementById('loginBtn');
  const userActions = document.getElementById('userActions');
  if (isLoggedIn()) {
    loginBtn.classList.add('hidden');
    userActions.classList.remove('hidden');
    updateCartCount();
  } else {
    loginBtn.classList.remove('hidden');
    userActions.classList.add('hidden');
  }
}
function handleBuy(productName) {
  if (!isLoggedIn()) {
    openLogin();
  } else {
    window.location.href = 'buy.html';
  }
}

function handleCart(productName) {
  if (!isLoggedIn()) {
    openLogin();
  } else {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(productName + ' savatga qo‘shildi!');
  }
}
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.getElementById('cartCount');
  if (cart.length > 0) {
    cartCount.innerText = cart.length;
    cartCount.style.display = 'inline-block';
  } else {
    cartCount.style.display = 'none';
  }
}
document.getElementById('cartBtn').addEventListener('click', () => {
  if (isLoggedIn()) {
    window.location.href = 'buy.html';
  } else {
    openLogin();
  }
});
document.getElementById('userBtn').addEventListener('click', () => {
  if (confirm('Chiqishni tasdiqlaysizmi?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    updateNavbarForLogin();
    alert('Siz tizimdan chiqdingiz');
  }
});
window.addEventListener('load', () => {
  updateNavbarForLogin();
  updateCartCount();
});
let endTime = Number(localStorage.getItem('endTime')) || Date.now() + 23*3600*1000;
function updateCountdown() {
  let diff = endTime - Date.now();
  if (diff < 0) {
    endTime = Date.now() + 23*3600*1000;
    localStorage.setItem('endTime', endTime);
    diff = endTime - Date.now();
  }
  const h = String(Math.floor(diff/3600000)).padStart(2,'0');
  const m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
  const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
  document.getElementById('countdown').innerText = `${h}:${m}:${s}`;
}
setInterval(updateCountdown,1000);
updateCountdown();
localStorage.setItem('endTime', endTime);
