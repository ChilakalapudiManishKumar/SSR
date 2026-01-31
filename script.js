// =================== SCROLL ===================
function scrollToQuote() {
  const quote = document.getElementById("quote");
  if (quote) {
    quote.scrollIntoView({ behavior: "smooth" });
  }
}

// =================== INSURANCE COST ===================
function calculateCost() {
  const typeEl = document.getElementById("vehicleTypeCost");
  const costEl = document.getElementById("cost");

  if (!typeEl || !costEl) return;

  const type = typeEl.value;
  const rates = JSON.parse(localStorage.getItem("vehicleRates")) || [];

  const found = rates
    .filter(r => r.type === type)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  costEl.innerText = found ? `₹ ${found.rate}` : "₹ 0";
}

// =================== WHATSAPP QUOTE ===================
const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
  quoteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value || "";
    const mobile = document.getElementById("mobile")?.value || "";
    const vehicle = document.getElementById("vehicle")?.value || "";
    const vehicleType =
      document.getElementById("vehicleTypeForm")?.value || "";

    const message =
`Hello SSR ASSOCIATIONS,

Name: ${name}
Mobile: ${mobile}
Vehicle Number: ${vehicle}
Vehicle Type: ${vehicleType}`;

    const whatsappURL =
      "https://wa.me/919393931247?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
}

// =================== ADMIN MODAL ===================
function openAdminLogin() {
  const modal = document.getElementById("adminModal");
  if (!modal) return;
  modal.classList.add("active");
}

function closeAdminLogin() {
  const modal = document.getElementById("adminModal");
  const msg = document.getElementById("adminMsg");

  if (modal) modal.classList.remove("active");
  if (msg) msg.innerText = "";
}

// =================== ADMIN LOGIN ===================
function adminLogin() {
  const inputId = document.getElementById("adminId")?.value || "";
  const inputPassword =
    document.getElementById("adminPassword")?.value || "";

  const savedAdmin =
    JSON.parse(localStorage.getItem("adminCredentials")) ||
    { username: "admin", password: "admin123" };

  if (
    inputId === savedAdmin.username &&
    inputPassword === savedAdmin.password
  ) {
    // 🔐 SET LOGIN SESSION
    localStorage.setItem("adminLoggedIn", "true");

    window.location.href = "admin-dashboard.html";
  } else {
    const msg = document.getElementById("adminMsg");
    if (msg) msg.innerText = "Invalid Admin ID or Password";
  }
}