/* =========================================================
   ADMIN AUTH (LOGIN STATE CHECK)
========================================================= */
// NOTE: Login itself is handled in script.js (homepage)

function isAdminLoggedIn() {
  return localStorage.getItem("adminLoggedIn") === "true";
}

/* =========================================================
   VEHICLE INSURANCE RATES
========================================================= */

function getRates() {
  return JSON.parse(localStorage.getItem("vehicleRates")) || [];
}

function saveRates(rates) {
  localStorage.setItem("vehicleRates", JSON.stringify(rates));
}

/* ---------- SAVE RATE ---------- */
function saveRate() {
  const typeEl = document.getElementById("vehicleType");
  const rateEl = document.getElementById("monthlyRate");
  const dateEl = document.getElementById("effectiveDate");

  if (!typeEl || !rateEl || !dateEl) return;

  const type = typeEl.value.trim();
  const rate = rateEl.value.trim();
  const date = dateEl.value.trim(); // YYYY-MM

  if (!type || !rate || !date) {
    alert("Please fill all fields");
    return;
  }

  const rates = getRates();

  // ❌ Prevent duplicate (same vehicle + same month)
  const duplicate = rates.find(
    r => r.type === type && r.date === date
  );

  if (duplicate) {
    alert("Rate already exists for this vehicle and month");
    return;
  }

  rates.push({ type, rate, date });
  saveRates(rates);

  // Reset fields
  typeEl.value = "";
  rateEl.value = "";
  dateEl.value = "";

  loadRates();
}

/* ---------- LOAD RATES ---------- */
function loadRates() {
  const tbody = document.getElementById("ratesTable");
  if (!tbody) return;

  tbody.innerHTML = "";

  const rates = getRates();

  if (rates.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;color:#777;">
          No rates added yet
        </td>
      </tr>
    `;
    return;
  }

  rates.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.type}</td>
      <td>₹ ${item.rate}</td>
      <td>${item.date}</td>
      <td>
        <button class="delete-btn" onclick="deleteRate(${index})">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

/* ---------- DELETE RATE ---------- */
function deleteRate(index) {
  const confirmDelete = confirm("Delete this rate?");
  if (!confirmDelete) return;

  const rates = getRates();
  rates.splice(index, 1);
  saveRates(rates);

  loadRates();
}

/* =========================================================
   CUSTOMERS (SAFE LOAD – USED IN SAVED CUSTOMERS PAGE)
========================================================= */

function loadCustomers() {
  const tbody = document.getElementById("customerTable");
  if (!tbody) return;

  tbody.innerHTML = "";

  const customers =
    JSON.parse(localStorage.getItem("customers")) || [];

  customers.forEach((c, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.mobile}</td>
      <td>${c.vehicleNo}</td>
      <td>${c.model}</td>
      <td>${c.age}</td>
      <td>₹${c.idv}</td>
      <td>${c.startDate}</td>
      <td>${c.endDate}</td>
      <td>
        <button class="delete-btn" onclick="deleteCustomer(${index})">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function deleteCustomer(index) {
  if (!confirm("Delete this customer?")) return;

  const customers =
    JSON.parse(localStorage.getItem("customers")) || [];

  customers.splice(index, 1);
  localStorage.setItem("customers", JSON.stringify(customers));

  loadCustomers();
}

function searchCustomers() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#customerTable tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

/* =========================================================
   AUTO LOAD (SAFE FOR ALL ADMIN PAGES)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("ratesTable")) {
    loadRates();
  }

  if (document.getElementById("customerTable")) {
    loadCustomers();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customerForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      saveCustomer();
    });
  }
});