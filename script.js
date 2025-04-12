
const data = [
  { name: "Nguyễn Văn A", date: "2025-04-01", content: "Mượn tiền cà phê", amount: 50000, discount: 0 },
  { name: "Nguyễn Văn A", date: "2025-04-05", content: "Ứng tiền đi ăn", amount: 200000, discount: 10000 },
  { name: "Trần Thị B", date: "2025-04-03", content: "Mua đồ hộ", amount: 150000, discount: 0 },
];

function searchDebt() {
  const name = document.getElementById("searchInput").value.trim();
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const filtered = data.filter(item => {
    const matchName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchDate = (!start || item.date >= start) && (!end || item.date <= end);
    return matchName && matchDate;
  });

  const resultBox = document.getElementById("result");
  if (filtered.length === 0) {
    resultBox.classList.add("hidden");
    return;
  }

  const latest = filtered[filtered.length - 1];
  document.getElementById("name").textContent = latest.name;
  document.getElementById("date").textContent = latest.date;
  document.getElementById("content").textContent = latest.content;
  document.getElementById("amount").textContent = latest.amount.toLocaleString();
  document.getElementById("discount").textContent = latest.discount.toLocaleString();
  document.getElementById("final").textContent = (latest.amount - latest.discount).toLocaleString();
  resultBox.classList.remove("hidden");

  const tbody = document.querySelector("#debtTable tbody");
  tbody.innerHTML = "";
  filtered.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.date}</td><td>${item.content}</td><td>${(item.amount - item.discount).toLocaleString()}</td>`;
    tbody.appendChild(row);
  });

  const ctx = document.getElementById("debtChart").getContext("2d");
  if (window.debtChart) window.debtChart.destroy();
  window.debtChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: filtered.map(i => i.date),
      datasets: [{
        label: 'Dòng tiền',
        data: filtered.map(i => i.amount - i.discount),
        borderColor: 'blue',
        backgroundColor: 'rgba(0,119,255,0.1)',
        tension: 0.4
      }]
    }
  });
}
