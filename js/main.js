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

window.onload = function() {
    CreateAdmin();
    keepitreal();
}