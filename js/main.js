(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    
})(jQuery);

function signupform() {
    document.getElementById('dk').style.display='block';
    document.getElementById('id01').style.display='none';
}

function loginform() {
    document.getElementById('id01').style.display='block';
    document.getElementById('dk').style.display='none';
}

let userArray = [];
let adminArray = [];
var modal = document.querySelector('.modal');
var modalCart = document.querySelector('.modal-cart');

function signup(e) {
    var usernamedk = document.getElementById("usernamedk").value;
    var passdk = document.getElementById("passdk").value;
    var emaildk = document.getElementById("emaildk").value;
    var phonedk = document.getElementById("phonedk").value;
    var address = document.getElementById("address").value;

    var user = {
        username: usernamedk,
        password:  passdk,
        email: emaildk,
        phone: phonedk,
        address: address,
        typeUser: "member"
    }

    localStorage.setItem(`user${userArray.length}`, JSON.stringify(user));
    userArray.push(user);
    alert("Đăng kí thành công");
    window.location.reload();
}

function login() {
    var username = document.getElementById("usernamedn").value;
    var password = document.getElementById("passdn").value;
    var result = document.getElementById("result").value;

    let userGetLocal = [];
    for(let i = 1; i < localStorage.length; i++) {
        let temp = localStorage.getItem(`user${i}`);
        if(temp) {
            userGetLocal.push(JSON.parse(temp));
        }
    }
    userGetLocal.push(JSON.parse(localStorage.getItem('admin0')));
    console.log('admin0');

    var check = 0;
    for (i = 0; i < userGetLocal.length; i++)
        if (userGetLocal[i].username == username && userGetLocal[i].password == password) {
            if (username == "admin") {
                window.location = "admin.html";
                console.log("Đăng nhập admin thành công");
                check = 1;
            } else {
                alert("Đăng nhập thành công");
                check = 1;
                localStorage.setItem('flag', 1);

                document.addEventListener("click", function() {
                        document.getElementById("loginpupup").style.display = "none";
                        document.querySelector(".modal").style.display = "none";
                        window.location = "index.html";
                    })
            }
        }
    if (check == 0) alert('Đăng nhập thất bại');
}

function logout() {

    document.getElementById("logoutbtn").addEventListener("click", function() {
        window.localStorage.removeItem('flag');//xoa muc luu tru duoc tri dinh
        // window.localStorage.removeItem('danhsachItemGioHang');

        window.location.reload();
    })
}

function CreateAdmin() {
    if (localStorage.getItem('admin') == null) {
        var user = {
            username: 'admin',
            password: 'admin',
            email: 'admin@gmail.com',
            phone: '0123456789',
            address: '273 An Dương Vương Phường 3 Quận 5',
            typeUser: 'admin'
            
        };
        localStorage.setItem(`admin${userArray.length}`, JSON.stringify(user));
        userArray.push(user);
    }
    if (localStorage.getItem('user') == null) {
        var user = {
            username: 'user',
            password: '123',
            email: 'user@gmail.com',
            phone: '0123456789',
            address: '217 Võ Thị Sáu Phường 7 Quận 3',
            typeUser: 'member'
        };
        localStorage.setItem(`user${userArray.length}`, JSON.stringify(user));
        userArray.push(user);
    }
}

function keepitreal() {

    if (localStorage.getItem('flag') != null) {
        document.getElementById("loginpupup").style.display = "none";
        document.getElementById("logoutbtn").style.display = "flex";
    }

}

var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
  })
}
// update cart 
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
      var cart_row = cart_rows[i]
      var price_item = cart_row.getElementsByClassName("cart-price")[0]
      var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
      var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
      var quantity = quantity_item.value // lấy giá trị trong thẻ input
      total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + 'VNĐ'
    // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
}

// thay đổi số lượng sản phẩm
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

// Thêm vào giỏ
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {

    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src
    var title = product.getElementsByClassName("content-product-h3")[0].innerText
    var price = product.getElementsByClassName("price")[0].innerText
    addItemToCart(title, price, img)
    // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    modal.style.display = "block";
    
    updatecart()
  })
}

function addItemToCart(title, price, img) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cart_title = cartItems.getElementsByClassName('cart-item-title')
    //Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
    for (var i = 0; i < cart_title.length; i++) {
      if (cart_title[i].innerText == title) {
        alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
        return
      }
    }
  
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${img}" width: "25%" height="25%">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Xóa</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
      var button_remove = event.target
      button_remove.parentElement.parentElement.remove()
      updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
      var input = event.target
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updatecart()
    })
  }

document.querySelector('.btn-modal-cart:first-of-type').addEventListener('click', function(){
    var x = document.getElementsByClassName('cart-row')
    if(x.length==0){
          alert('Bạn chưa mua hàng')
    }else if(y==''){
         alert('Vui lòng đăng nhập trước khi thanh toán !')
    }else {
         document.getElementsByClassName('modal-cart')[0].style.display = 'none' 
         modal.classList.remove('active');
    } 
})

document.getElementsByClassName('btn-modal-cart')[1].onclick = function(){
    modal.classList.remove('active');
    modalCart.style.display = 'none';   
}

var products = [
    {
        type: "kim cương",
        name: "Lắc/vòng DJB177",
        img: "product-1.jpg",
        price: "100,130,000đ"
    },
    {
        type: "kim cương",
        name: "Nhẫn DJR3259",
        img: "product-2.jpg",
        price: "58,970,000đ"
    },
    {
        type: "kim cương",
        name: "Hoa tai DJE1137",
        img: "product-3.jpg",
        price: "89,700,000đ"
    },
    {
        type: "kim cương",
        name: "Hoa tai DJE1136",
        img: "product-4.jpg",
        price: "71,180,000đ"
    },
    {
        type: "kim cương",
        name: "Mặt dây kim cương FDCP0300",
        img: "product-5.jpg",
        price: "42,830,000đ"
    },
    {
        type: "kim cương",
        name: "Mặt dây kim cương FDCP0205",
        img: "product-6.jpg",
        price: "44,360,000đ"
    },
    {
        type: "kim cương",
        name: "Nhẫn Kim cương FDR0018",
        img: "product-7.jpg",
        price: "31,500,000đ"
    },
    {
        type: "kim cương",
        name: "Hoa tai kim cương FDE0015",
        img: "product-8.jpg",
        price: "44,490,000đ"
    },
];


function Pagination() {
    var product_items = "";
    for(var i = 0; i < products.length; i++) {
        var product_item = `
    <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="product-item">
            <div class="position-relative bg-light overflow-hidden">
            <img
                class="img-fluid w-100"
                src="img/${products[i].img}"
                alt=""
            />
            <div
                class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"
            >
                New
            </div>
            </div>
            <div class="text-center p-4">
            <a class="d-block h5 mb-2" href="">${products[i].name}</a>
            <span class="text-primary me-1">${products[i].price}</span>
            </div>
            <div class="d-flex border-top">
            <small class="w-50 text-center border-end py-2">
                <a class="text-body" href=""
                ><i class="fa fa-eye text-primary me-2"></i>View
                detail</a
                >
            </small>
            <small class="w-50 text-center py-2">
                <a class="text-body" href="" onclick="addItemToCart()"
                ><i class="fa fa-shopping-bag text-primary me-2"></i>Add
                to cart</a
                >
            </small>
            </div>
        </div>
    </div>`;

        product_items += product_item;
    }

    document.getElementById("tab-1").innerHTML = `
    <div class="row g-4">
        ${product_items}
        <div class="col-12 text-center">
            <a class="btn btn-primary rounded-pill py-3 px-5" href="">Browse More Products</a>
        </div>
    </div>`;
}

window.onload = function() {
    Pagination();
    CreateAdmin();
    keepitreal();
}