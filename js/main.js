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

// Hiển thị lỗi
function showError(key, mess){
    document.getElementById(key + '_error').innerHTML = mess;
}

let userArray = [];
let adminArray = [];
var modal = document.querySelector('.modal');
var modalCart = document.querySelector('.modal-cart');

function signup(e) {
    var usernamedk = document.getElementById("fullname").value;
    var passdk = document.getElementById("password").value;
    var emaildk = document.getElementById("email").value;
    var phonedk = document.getElementById("phone").value;
    var password_confirmation = document.getElementById("password_confirmation").value;
    if (usernamedk == ''||passdk == ''||phonedk == ''||emaildk == ''||password_confirmation == ''){
        alert('Không được để trống thông tin');
    }
    else {
        var user = {
            username: usernamedk,
            password:  passdk,
            email: emaildk,
            phone: phonedk,
            repasswd: password_confirmation,
            typeUser: "member"
        }

        localStorage.setItem(`user${userArray.length}`, JSON.stringify(user));
        userArray.push(user);
        alert("Đăng kí thành công");
        window.location.reload();
    }
    
}

Validator.isRequired=function(selector,message){
    return {
        selector:selector,
        test:function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!!!';
        }
    };
}
Validator.isEmail=function(selector,message){
    return {
        selector:selector,
        test:function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng!!!';
        }
    };
}
Validator.isCheck=function(selector,getCofirmValue,message){
    return{
        selector:selector,
        test:function(value){
            return value === getCofirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}
Validator.isSDT=function(selector,getCofirmValue,message){
    return{
        selector:selector,
        test:function(value){
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return vnf_regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng';
        }
    }
}

function Validator(options) {
    //sử dụng để xác định các 
    function getParent(element,selector){
        while(element.parentElement){//Lặp để tìm qua theo từng element tìm thẻ input
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;//Tìm ra thẻ input sẽ gán element = element.parentElement
        }
    }

    //Hàm lưu rule
    var selectorRules={}
    //Hàm thực hiện
    function Validate(inputElement,rule){
        var errorMessage;
        var errorElelements = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
        //Lấy ra các rule của selector
        var rules=selectorRules[rule.selector];

        //Lặp qua từng rule và kiểm tra nếu có lỗi thì dừng
        for (var i=0; i<rules.length; ++i) {
            switch (inputElement.typeof){
                default:
                    errorMessage= rules[i](inputElement.value);
            }
            if(errorMessage)    break;
        }
        if(errorMessage){
            errorElelements.innerHTML = errorMessage;
            getParent(inputElement,options.formGroupSelector).classList.add('invalid');
        }else{
            errorElelements.innerHTML = '';
            getParent(inputElement,options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }
    //Lấy Element của form cần validate
    var formElement=document.querySelector(options.form);
    // console.log(options.rules);
    if(formElement){

        //Khi ấn xác nhận
        formElement.onsubmit=function(e){
            e.preventDefault();

            var isValid = true;
            console.log(isValid);
            //Thực hiện qua từng rule và validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var valid = Validate(inputElement,rule);
                if(!valid){
                    isValid=false;
                    console.log(isValid);
                }
            });            
            
            if(isValid){
                //Trường hợp submit với javascript
                if(typeof options.onSubmit==='function'){
                    var formEnableInput= formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues=Array.from(formEnableInput).reduce(function(values,input){
                        values[input.name]=input.value;
                        return values ;
                    },{});
                    options.onSubmit(formValues);
                }
                //Trường hợp submit mặc định
            }
            else{
            }
        }

        //Xử lý lặp qua mỗi rules
        options.rules.forEach(function(rule){
            //Lưu lại các rule
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector]=[rule.test];
            }

            var inputElement = formElement.querySelectorAll(rule.selector);
            Array.from(inputElement).forEach(function(inputElement){
                if(inputElement){
                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function(){
                    Validate(inputElement,rule);
                }
                //Xử lý trường hợp sau khi nhập sai
                inputElement.oninput=function(){
                    var errorElelements = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
                    errorElelements.innerHTML = '';
                    getParent(inputElement,options.formGroupSelector).classList.remove('invalid');
                }
            }
            });
        });
    }
}

function login() {
    var username = document.getElementById("usernamedn").value;
    var password = document.getElementById("passdn").value;
    var result = document.getElementById("result").value;
    
    if(username == '' && password == '') {
        alert("Please enter username and password");
    }
    else if(username == '') {
        alert("Please enter username");
    }
    else if(password == '') {
        alert("Please enter password");
    }
    else {
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
        if (check == 0) alert('Wrong information');
    }
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
            password:  '12345678',
            email: 'admin@gmail.com',
            phone: '0901324565',
            repasswd: '12345678',
            typeUser: 'admin'
            
        };
        localStorage.setItem(`admin${userArray.length}`, JSON.stringify(user));
        userArray.push(user);
    }
    if (localStorage.getItem('user') == null) {
        var user = {
            username: 'user1',
            password:  '12345678',
            email: 'user1@gmail.com',
            phone: '0901324123',
            repasswd: '12345678',
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
          window.location.reload();
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

function removeCart(e) {
    e.parentElement.parentElement.parentElement.parentElement.remove()
    var x = document.getElementsByClassName('cart-row')
    if(x.length== 0 ){
        document.getElementsByClassName('emty-cart')[0].classList.add('active')
        var a = document.querySelectorAll('.cart-table-list tr')
        for(var i=0;i<a.length;i++){
             var b = a[i]
             b.style.display = 'none'
        }
   }else {
       document.getElementsByClassName('emty-cart')[0].classList.remove('active')
   }
   updateCart()
}

function updateCart() {
    var cartItemList = document.getElementsByClassName('cart-table-list')
    for(let i = 0; i < cartItemList.length; i++){
        var textQuantity = document.querySelector(' .cart-shopping-top-right-item p span')
        console.log(textQuantity)
            var cartRows = cartItemList[i].getElementsByClassName('cart-row')
            var total = 0 ;
            for(let i = 0; i < cartRows.length; i++) {
                var cartRow = cartRows[i]
                var quantityElm = cartRow.getElementsByClassName('quantityCart')[0]
                    var priceElm = cartRow.querySelector('#price')
                    var pricetotal = cartRow.querySelector('#price-total')
                    var price = parseFloat(priceElm.innerText.replace('đ', ''))
                    var quantity = quantityElm.value
                    
                    total = (total + (price * quantity))
                    

                
                    pricetotal.innerHTML = `${((price *quantity)*1000000).toFixed(0)}đ`
                
            }
        total = (total*1000000)
        var x = Math.round(total)
    }
    document.querySelector(".sum-total h3").innerHTML = `${x}đ `
    document.getElementById("number-total").innerHTML = `${x}đ `
    document.getElementsByClassName('cart-info')[0].innerHTML = cartRows.length
    document.getElementById('length-num').innerHTML = cartRows.length
   
}


// search 
function btnSearch(){
    document.getElementById('search').style.display='block';
    document.getElementById('search-box').style.display='none';
}

//Enter search
const node = document.getElementsByClassName("navbar-search-input")[0];
node.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        timKiem();
    }
});

function timKiem() {
    let search_value = node.value;
    if (search_value.length > 0) {
        document.getElementById('container-introduce').style.display = 'none'
        document.getElementById('container-product').style.display = 'none'
        document.getElementById('container-visit').style.display = 'none'
        document.getElementById('container-review').style.display = 'none'
        document.getElementById('inputsearch').style.display = 'none'
        document.getElementById('search-box').style.display = 'none'
        document.getElementById('search').style.display = 'block'
        timKiemNangCao();
    }
    else {
        alert('Vui lòng nhập từ khoá để tìm kiếm!');
    }
}

function timKiemNangCao() {
    let searchValue = node.value;
    node.value = "";
    let product_sort = product_arr
    let typeProduct = document.getElementById('select-product').value;
    let minPrice = document.getElementById('min-price').value;
    let maxPrice = document.getElementById('max-price').value;
    let sort = document.getElementById('select-sort').value;
    if (minPrice == '') minPrice = 0;
    if (maxPrice == '') maxPrice = 9999999;
    dem = 0
   
    
   
    //  Sort Low To Height
    if (sort == "LowToHeight")
        for (i = 0; i < product_sort.length - 1; i++) {    
         console.log(parseFloat(product_sort[i].giamoi.replace('đ','')))
            for (j = i+1; j < product_sort.length; j++)
                if (parseFloat(product_sort[i].giamoi.replace('đ','')) > parseFloat(product_sort[j].giamoi.replace('đ',''))) {
                    let temp = product_sort[i];
                    product_sort[i] = product_sort[j];
                    product_sort[j] = temp
                    console.log(product_sort[j].giamoi)    
                    
                }
           
        }
    // Sort Height To Low
    else
        for (i = 0; i < product_sort.length - 1; i++) {
            for (j = i+1; j < product_sort.length; j++)
            if (parseFloat(product_sort[i].giamoi.replace('đ','')) < parseFloat(product_sort[j].giamoi.replace('đ','')))  {
                    let temp = product_sort[i];
                    product_sort[i] = product_sort[j];
                    product_sort[j] = temp
                }
        }

        var contentProduct = ''  
        let tmp = []
    for (i = 0; i < product_sort.length; i++) {
        let aLoai = product_sort[i].loai;
        let aGia = parseFloat(product_sort[i].giamoi.replace('đ',''))*1000000
        console.log(aGia)
        let aTen = product_sort[i].ten;

        if ((aLoai != typeProduct && typeProduct != 'all') || aGia < minPrice || aGia > maxPrice ||
            !aTen.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            continue;
         dem++
        tmp.push(product_sort[i])
        
        
             
         
    }
    if(dem==0){
         document.getElementsByClassName('search-top')[0].style.display = 'none';
         document.getElementsByClassName('search-content')[0].style.display = 'none';
         document.getElementsByClassName('search-pagination')[0].style.display = 'none';
         document.getElementsByClassName('no-search')[0].style.display = 'flex'

    }else {
         document.getElementsByClassName('search-top')[0].style.display = 'flex';
         document.getElementsByClassName('search-content')[0].style.display = 'flex';
         document.getElementsByClassName('search-pagination')[0].style.display = 'flex';
         document.getElementsByClassName('no-search')[0].style.display = 'none'
    }
    handlePageSearch(1 , tmp)
        document.querySelector('.num-result span').innerText = dem
        console.log(dem)
          
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
    // {
    //     type: "kim cương",
    //     name: "Hoa tai kim cương FDE0015",
    //     img: "product-8.jpg",
    //     price: "44,490,000đ"
    // },

    {
        type: "vàng",
        name: "Vòng charrm CB60035DD",
        img: "product-25.jpg",
        price: "3,900,000đ"
    },
    {
        type: "vàng",
        name: "Ghim cài áo Cúc họa mi LH60011",
        img: "product-26.jpg",
        price: "9,090,000đ"
    },
    {
        type: "vàng",
        name: "Dây vàng collier LN000256",
        img: "product-27.jpg",
        price: "5,630,000đ"
    },
    {
        type: "vàng",
        name: "Ghim cài áo Cúc họa mi LH60011",
        img: "product-28.jpg",
        price: "5,590,000đ"
    },

    {
        type: "đá màu",
        name: "Hoa tai Citrine GJE473",
        img: "product-33.jpg",
        price: "9,280,000đ"
    },
    {
        type: "đá màu",
        name: "Nhẫn Ruby GJR468",
        img: "product-34.jpg",
        price: "10,930,000đ"
    },
];

// phân trang bằng onclick tham số được tạo động ví dụ next("vàng", 8) lấy tám trang tiếp theo của vàng

function Pagination() {
    var product_items_0 = "";
    var product_items_1 = "";
    var product_items_2 = "";
    var product_items_3 = "";
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

        if(products[i].type.localeCompare("kim cương") === 0)
            product_items_1 += product_item;
        else if(products[i].type.localeCompare("vàng") === 0)
            product_items_2 += product_item;
        else
            product_items_3 += product_item;
        
    }

    document.getElementById("tab-1").innerHTML = `
    <div class="row g-4">
        ${product_items_1}
    </div>`;

    document.getElementById("tab-2").innerHTML = `
    <div class="row g-4">
        ${product_items_2}
    </div>`;

    document.getElementById("tab-3").innerHTML = `
    <div class="row g-4">
        ${product_items_3}
    </div>`;

    // document.getElementById("tab-1").innerHTML = `
    // <div class="row g-4">
    //     ${product_items_1}
    //     <div class="col-12 text-center">
    //         <a class="btn btn-primary rounded-pill py-3 px-5" href="">Browse More Products</a>
    //     </div>
    // </div>`;
}

let inforUser = [];
function getinforUser(e) {
    var email_infor = document.getElementById("email-infor").value;
    var name_infor = document.getElementById("name-infor").value;
    if (email_infor == ''||name_infor == ''){
        alert('Không có thông tin');
    }
    else {
        var userinfor = {
            name: name_infor,
            email: email_infor+'@gmail.com',
        }

        localStorage.setItem(`userinfor${inforUser.length}`, JSON.stringify(userinfor));
        inforUser.push(userinfor);
        alert("Đã lưu thông tin");
        window.location.reload();
    }
}

window.onload = function() {
    Pagination();
    CreateAdmin();
    keepitreal();
}