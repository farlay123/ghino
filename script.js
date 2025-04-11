let data = [
  { name: "Nguyễn Văn A", date: "2025-04-01", content: "Mượn sách", amount: 500000, discount: 50000 },
  { name: "Trần Thị B", date: "2025-04-05", content: "Ăn chung", amount: 300000, discount: 0 }
];

const searchInput = document.getElementById("searchInput");
const resultBox = document.getElementById("result");
const adminForm = document.getElementById("adminForm");

function searchDebt() {
  const query = searchInput.value.trim();
  const found = data.find(d => d.name.toLowerCase() === query.toLowerCase());
  if (found) {
    document.getElementById("name").textContent = found.name;
    document.getElementById("date").textContent = found.date;
    document.getElementById("content").textContent = found.content;
    document.getElementById("amount").textContent = found.amount.toLocaleString() + " đ";
    document.getElementById("discount").textContent = found.discount.toLocaleString() + " đ";
    document.getElementById("final").textContent = (found.amount - found.discount).toLocaleString() + " đ";
    resultBox.classList.remove("hidden");
  } else {
    alert("Không tìm thấy tên người nợ.");
  }
}

function addDebt() {
  const name = document.getElementById("adminName").value.trim();
  const date = document.getElementById("adminDate").value;
  const content = document.getElementById("adminContent").value.trim();
  const amount = parseInt(document.getElementById("adminAmount").value);
  const discount = parseInt(document.getElementById("adminDiscount").value) || 0;
  if (name && date && content && amount) {
    data.push({ name, date, content, amount, discount });
    renderTable();
    renderChart();
    alert("Đã thêm khoản nợ mới!");
  } else {
    alert("Vui lòng điền đầy đủ thông tin.");
  }
}

function renderTable() {
  const tbody = document.querySelector("#debtTable tbody");
  tbody.innerHTML = "";
  data.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.name}</td>
        <td>${row.date}</td>
        <td>${row.content}</td>
        <td>${row.amount.toLocaleString()}</td>
        <td>${row.discount.toLocaleString()}</td>
        <td>${(row.amount - row.discount).toLocaleString()}</td>
      </tr>`;
  });
}

function renderChart() {
  const ctx = document.getElementById("debtChart").getContext("2d");
  const labels = data.map(d => d.date);
  const amounts = data.map(d => d.amount - d.discount);
  if (window.debtChart) window.debtChart.destroy();
  window.debtChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tiền cần thu',
        data: amounts,
        backgroundColor: '#007bff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

window.onload = () => {
  renderTable();
  renderChart();
  const isAdmin = window.location.search.includes("admin=true");
  if (isAdmin) adminForm.classList.remove("hidden");
};