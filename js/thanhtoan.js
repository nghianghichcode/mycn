//Tính tổng số tiền mà người mua cần thanh toán
function isTotalPrice() {
  const amountOfProduct =
    parseInt(
      document.getElementById('productPrice').innerText.replace(/[^\d]/g, '')
    ) || 0;
  const amountOfShippingFee =
    parseInt(
      document.getElementById('shippingFee').innerText.replace(/[^\d]/g, '')
    ) || 0;
  const amountOfDiscountCodePrice =
    parseInt(
      document
        .getElementById('discountCodePrice')
        .innerText.replace(/[^\d]/g, '')
    ) || 0;
  const totalAmount =
    amountOfProduct + amountOfShippingFee - amountOfDiscountCodePrice;
  // gán 1 biến mang giá trị kiểu : 100,000đ
  const formattedAmount =
    new Intl.NumberFormat('vi-VN').format(totalAmount) + 'đ';
  document.getElementById('totalAmount').innerText = formattedAmount;
}
isTotalPrice();

// Mảng mã giảm giá và số tiền được giảm nếu nhập vào!
const discountCodeArray = [
  { code: 'abcd', discount: '40000' },
  { code: 'NguyenTrongThanh', discount: '30000' },
  { code: 'NguyenVietNghia', discount: '30000' },
  { code: 'NguyenVanCuong', discount: '30000' },
  { code: 'LeDinhAnh', discount: '30000' },
];

// Xử lý mã giảm giá và giảm số tiền đúng với mã
document.getElementById('applyDiscountCode').addEventListener('click', () => {
  const code = document.getElementById('discountCode').value.trim(); // Lấy mã của người nhập mà không có khoảng trắng bằng trim()
  let check = false; //Dùng để thông báo Nhập thành công hay thất bại
  // chạy for để kiểm tra có đúng mã không
  for (let i = 0; i < discountCodeArray.length; i++) {
    if (code == discountCodeArray[i].code) {
      check = true;
      let discountAmount = Number(discountCodeArray[i].discount); // Lấy số tiền được giảm khi nhập mã
      const formattedAmount =
        new Intl.NumberFormat('vi-VN').format(discountAmount) + 'đ';
      alert(`Nhập mã thành công và được giảm ${formattedAmount}`);
      document.getElementById('discountCodePrice').innerText =
        '- ' + formattedAmount;
      isTotalPrice();
      break;
    }
  }
  if (!check) {
    alert('Mã giảm giá không chính xác');
  }
});

// Chọn phương thức vận chuyển với giá khác nhau
document.getElementById('shipping').addEventListener('change', () => {
  const price = document.getElementById('shipping');
  const shippingFeeProduct = document.getElementById('shippingFee');
  if (parseInt(price.value) == 25000) {
    shippingFeeProduct.innerText = '+25,000đ';
    shippingFeeProduct.value = '25000';
    isTotalPrice();
  } else {
    shippingFeeProduct.innerText = '+40,000đ';
    shippingFeeProduct.value = '40000';
    isTotalPrice();
  }
});
// chọn phương thức thanh toán
function payForOrder() {
  const cash = document.getElementById('cashPayment');
  const transfer = document.getElementById('paymentTransfer');
  const order = document.getElementById('placeAnOrder');
  cash.addEventListener('click', () => {
    document.querySelectorAll('.bankInformation').forEach((bank) => {
      bank.style.display = 'none';
    });
    order.innerText = 'Đặt hàng';
    order.value = '0';
  });
  transfer.addEventListener('click', () => {
    document.querySelectorAll('.bankInformation').forEach((bank) => {
      bank.style.display = 'flex';
    });
    order.innerText = 'Xác nhận đã chuyển khoản';
    order.value = '1';
  });
}
payForOrder();
