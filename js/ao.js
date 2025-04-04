// Gắn sự kiện click lên phần tử cha bao quanh danh sách sản phẩm
document
  .querySelector('.main__productsList-all')
  .addEventListener('click', function (event) {
    // Xác định nút bấm được click
    const button = event.target.closest('button');
    if (button) {
      const productItem = button.closest('.main__productsList-item');
      //   Lấy tên sản phẩm
      const productName = productItem.querySelector('a').innerText;
      //   Lấy giá sản phẩm thông qua data-price đã định nghĩa trong html
      const productPrice = parseInt(productItem.dataset.price);

      // Lấy thông tin sản phẩm từ localStorage
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProduct = cartItems.find(
        (item) => item.name === productName
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        cartItems.push({ name: productName, price: productPrice, quantity: 1 });
      }

      // Cập nhật lại giỏ hàng vào localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Cập nhật số lượng sản phẩm trong giỏ hàng
      const cartBadge = document.getElementById('cart-badge');
      //reduce để tính tổng sóo lượng sản phẩm trong localStorge
      const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      //   Hiển thị tổng số sản phẩm trong giỏ trên icon cart-badge
      cartBadge.innerText = totalQuantity;

      // Hiển thị thông báo thêm sản phẩm thành công
      alert(`${productName} đã được thêm vào giỏ hàng!`);
    }
  });

document
  .querySelector('.cart-icon-container')
  .addEventListener('click', function () {
    window.location.href = '..'; // Chuyển hướng đến trang giỏ hàng
  });
