// script.js
async function searchDebt() {
  const nameInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultBox = document.getElementById('result');

  try {
    const response = await fetch('data.json');
    const data = await response.json();

    const debt = data.find(entry => entry.name.toLowerCase() === nameInput);

    if (debt) {
      document.getElementById('name').innerText = debt.name;
      document.getElementById('date').innerText = debt.date;
      document.getElementById('content').innerText = debt.reason;
      document.getElementById('amount').innerText = formatCurrency(debt.amount);
      document.getElementById('discount').innerText = debt.discount > 0 ? `-${debt.discount}%` : '0%';
      const finalAmount = debt.amount * (1 - debt.discount / 100);
      document.getElementById('final').innerText = formatCurrency(finalAmount);
      resultBox.classList.remove('hidden');
    } else {
      resultBox.classList.add('hidden');
      alert('Không tìm thấy thông tin. Vui lòng kiểm tra lại tên.');
    }
  } catch (error) {
    alert('Lỗi khi tải dữ liệu: ' + error);
  }
}

function formatCurrency(num) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(num);
}
