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

// Hi???n th??? l???i
function showError(key, mess){
    document.getElementById(key + '_error').innerHTML = mess;
}

let userArray = [];
let adminArray = [];
var modal = document.querySelector('.modal');
var modalCart = document.querySelector('.modal-cart');

function signup(e) {
    var usernamedk = document.getElementById("fullname").value.toLowerCase();
    var passdk = document.getElementById("password").value;
    var emaildk = document.getElementById("email").value;
    var phonedk = document.getElementById("phone").value;
    var password_confirmation = document.getElementById("password_confirmation").value;
    var today = new Date()
    var day =  String(today.getDate())+"/"+String(today.getMonth() + 1)+"/"+String(today.getFullYear())
    if (usernamedk == ''||passdk == ''||phonedk == ''||emaildk == ''||password_confirmation == ''){
        alert('Kh??ng ???????c ????? tr???ng th??ng tin');
    }
    else {
        var user = {
            username: usernamedk,
            password:  passdk,
            email: emaildk,
            phone: phonedk,
            repasswd: password_confirmation,
            typeUser: "member",
            datesignup: day
        }

        localStorage.setItem(`user${userArray.length}`, JSON.stringify(user));
        userArray.push(user);
        alert("????ng k?? th??nh c??ng");
        window.location.reload();
    }
    
}

Validator.isRequired=function(selector,message){
    return {
        selector:selector,
        test:function(value){
            return value.trim() ? undefined : message || 'Vui l??ng nh???p tr?????ng n??y!!!';
        }
    };
}
Validator.isEmail=function(selector,message){
    return {
        selector:selector,
        test:function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui l??ng nh???p ????ng ?????nh d???ng!!!';
        }
    };
}
Validator.isCheck=function(selector,getCofirmValue,message){
    return{
        selector:selector,
        test:function(value){
            return value === getCofirmValue() ? undefined : message || 'Gi?? tr??? nh???p v??o kh??ng ch??nh x??c';
        }
    }
}
Validator.isSDT=function(selector,getCofirmValue,message){
    return{
        selector:selector,
        test:function(value){
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return vnf_regex.test(value) ? undefined : message || 'Vui l??ng nh???p ????ng ?????nh d???ng';
        }
    }
}

function Validator(options) {
    //s??? d???ng ????? x??c ?????nh c??c 
    function getParent(element,selector){
        while(element.parentElement){//L???p ????? t??m qua theo t???ng element t??m th??? input
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;//T??m ra th??? input s??? g??n element = element.parentElement
        }
    }

    //H??m l??u rule
    var selectorRules={}
    //H??m th???c hi???n
    function Validate(inputElement,rule){
        var errorMessage;
        var errorElelements = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
        //L???y ra c??c rule c???a selector
        var rules=selectorRules[rule.selector];

        //L???p qua t???ng rule v?? ki???m tra n???u c?? l???i th?? d???ng
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
    //L???y Element c???a form c???n validate
    var formElement=document.querySelector(options.form);
    // console.log(options.rules);
    if(formElement){

        //Khi ???n x??c nh???n
        formElement.onsubmit=function(e){
            e.preventDefault();

            var isValid = true;
            console.log(isValid);
            //Th???c hi???n qua t???ng rule v?? validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var valid = Validate(inputElement,rule);
                if(!valid){
                    isValid=false;
                    console.log(isValid);
                }
            });            
            
            if(isValid){
                //Tr?????ng h???p submit v???i javascript
                if(typeof options.onSubmit==='function'){
                    var formEnableInput= formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues=Array.from(formEnableInput).reduce(function(values,input){
                        values[input.name]=input.value;
                        return values ;
                    },{});
                    options.onSubmit(formValues);
                }
                //Tr?????ng h???p submit m???c ?????nh
            }
            else{
            }
        }

        //X??? l?? l???p qua m???i rules
        options.rules.forEach(function(rule){
            //L??u l???i c??c rule
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector]=[rule.test];
            }

            var inputElement = formElement.querySelectorAll(rule.selector);
            Array.from(inputElement).forEach(function(inputElement){
                if(inputElement){
                //X??? l?? tr?????ng h???p blur kh???i input
                inputElement.onblur = function(){
                    Validate(inputElement,rule);
                }
                //X??? l?? tr?????ng h???p sau khi nh???p sai
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

document.getElementById('show-pass').onclick = function() {
    let password = document.getElementById('passdn');
    password.type = password.type == 'password' ? 'text' : 'password';
    if (password.type == 'text') {
        document.getElementById('show-pass').innerHTML = `Hide password`;
    }
    else {
        document.getElementById('show-pass').innerHTML = `Show password`;
    }
}

function login() {
    var username = document.getElementById("usernamedn").value.toLowerCase();
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
                    console.log("????ng nh???p admin th??nh c??ng");
                    check = 1;
                } else {
                    alert("????ng nh???p th??nh c??ng");
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
            typeUser: 'admin',
            datesignup: '20/4/2021'
            
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
            typeUser: 'member',
            datesignup: '20/5/2021'
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
          alert('B???n ch??a mua h??ng')
          window.location.reload();
    }else if(y==''){
         alert('Vui l??ng ????ng nh???p tr?????c khi thanh to??n !')
    }else {
         document.getElementsByClassName('modal-cart')[0].style.display = 'none' 
         modal.classList.remove('active');
    } 
})

document.getElementsByClassName('btn-modal-cart')[1].onclick = function(){
    modal.classList.remove('active');
    modalCart.style.display = 'none';   
}




// search 
function btnSearch(){
    document.getElementById('search').style.display='block';
}

//Enter search
const node = document.getElementsByClassName("search-click")[0];
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
        document.getElementById('search').style.display = 'block'
        timKiemNangCao();
    }
    else {
        alert('Vui l??ng nh???p t??? kho?? ????? t??m ki???m!');
    }
}

function timKiemNangCao() {
    let searchValue = node.value;
    node.value = "";
    let product_sort = products
    let typeProduct = document.getElementById('select-product').value;
    let minPrice = document.getElementById('min-price').value;
    let maxPrice = document.getElementById('max-price').value;
    let sort = document.getElementById('select-sort').value;
    if (minPrice == '') minPrice = 0;
    if (maxPrice == '') maxPrice = 9999999;
    dem = 0

    console.log(product_sort)
   
    
   
    //  Sort Low To Height
    if (sort == "LowToHeight")
        for (i = 0; i < product_sort.length - 1; i++) {    
         console.log(parseInt(product_sort[i].price.replace('??','')))
            for (j = i+1; j < product_sort.length; j++)
                if (parseInt(product_sort[i].price.replace('??','')) > parseInt(product_sort[j].price.replace('??',''))) {
                    let temp = product_sort[i];
                    product_sort[i] = product_sort[j];
                    product_sort[j] = temp
                    console.log(product_sort[j].price)    
                }
        }
    // Sort Height To Low
    else
        for (i = 0; i < product_sort.length - 1; i++) {
            for (j = i+1; j < product_sort.length; j++)
            if (parseInt(product_sort[i].price.replace('??','')) < parseInt(product_sort[j].price.replace('??','')))  {
                    let temp = product_sort[i];
                    product_sort[i] = product_sort[j];
                    product_sort[j] = temp
                }
        }

        var contentProduct = ''  
        let tmp = []
    for (i = 0; i < product_sort.length; i++) {
        let aLoai = product_sort[i].type;
        let aGia = parseInt(product_sort[i].price.replace('??',''))*1000000
        console.log(aGia)
        let aTen = product_sort[i].name;

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

let products = [
    {
        id: 01,
        type: "kim c????ng",
        name: "L???c/v??ng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 02,
        type: "kim c????ng",
        name: "Nh???n DJR3259",
        img: "product-2.jpg",
        price: 58970000
    },
    {
        id: 03,
        type: "kim c????ng",
        name: "Hoa tai DJE1137",
        img: "product-3.jpg",
        price: 89700000
    },
    {
        id: 04,
        type: "kim c????ng",
        name: "Hoa tai DJE1136",
        img: "product-4.jpg",
        price: 71180000
    },
    {
        id: 05,
        type: "kim c????ng",
        name: "M???t d??y kim c????ng FDCP0300",
        img: "product-5.jpg",
        price: 42830000
    },
    {
        id: 06,
        type: "kim c????ng",
        name: "M???t d??y kim c????ng FDCP0205",
        img: "product-6.jpg",
        price: 44360000
    },
    {
        id: 07,
        type: "kim c????ng",
        name: "Nh???n Kim c????ng FDR0018",
        img: "product-7.jpg",
        price: 31500000
    },
    {
        id: 08,
        type: "kim c????ng",
        name: "Hoa tai kim c????ng FDE0015",
        img: "product-8.jpg",
        price: 44490000
    },
    {
        id: 09,
        type: "kim c????ng",
        name: "L???c/v??ng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 10,
        type: "kim c????ng",
        name: "L???c/v??ng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 11,
        type: "kim c????ng",
        name: "L???c/v??ng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 12,
        type: "kim c????ng",
        name: "L???c/v??ng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 13,
        type: "v??ng",
        name: "V??ng charrm CB60035DD",
        img: "product-25.jpg",
        price: 3900000
    },
    {
        id: 14,
        type: "v??ng",
        name: "Ghim c??i ??o C??c h???a mi LH60011",
        img: "product-26.jpg",
        price: 9090000
    },
    {
        id: 15,
        type: "v??ng",
        name: "D??y v??ng collier LN000256",
        img: "product-27.jpg",
        price: 5630000
    },
    {
        id: 16,
        type: "v??ng",
        name: "Ghim c??i ??o C??c h???a mi LH60011",
        img: "product-28.jpg",
        price: 5590000
    },
    {
        id: 17,
        type: "v??ng",
        name: "D??y ch??? V???n FP60695",
        img: "product-29.jpg",
        price: 4100000
    },
    {
        id: 18,
        type: "v??ng",
        name: "D??y ch??? V???n MP6023",
        img: "product-31.jpg",
        price: 4200000
    },
    {
        id: 19,
        type: "v??ng",
        name: "L???c tay LB90120",
        img: "product-31.jpg",
        price: 18900000
    },
    {
        id: 20,
        type: "v??ng",
        name: "L???c tay LB90122",
        img: "product-32.jpg",
        price: 9280000
    },
    {
        id: 21,
        type: "???? m??u",
        name: "Hoa tai Citrine GJE473",
        img: "product-33.jpg",
        price: 9280000
    },
    {
        id: 22,
        type: "???? m??u",
        name: "Nh???n Ruby GJR468",
        img: "product-34.jpg",
        price: 10930000
    },
    {
        id: 23,
        type: "???? m??u",
        name: "D??y chuy???n Emerald GJCP697",
        img: "product-35.jpg",
        price: 31270000
    },
    {
        id: 24,
        type: "???? m??u",
        name: "L???c/v??ng ???? FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 25,
        type: "???? m??u",
        name: "L???c/v??ng ???? FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 26,
        type: "???? m??u",
        name: "L???c/v??ng ???? FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 27,
        type: "???? m??u",
        name: "L???c/v??ng ???? FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 28,
        type: "???? m??u",
        name: "B??ng tai Peridot NA722-WG",
        img: "product-37.jpg",
        price: 9930000
    },
    {
        id: 29,
        type: "???? m??u",
        name: "Nh???n Topaz NA722-WG",
        img: "product-38.jpg",
        price: 7000000
    },
    {
        id: 30,
        type: "???? m??u",
        name: "Hoa tai Ruby GJE706",
        img: "product-39.jpg",
        price: 16920000
    },
    {
        id: 31,
        type: "???? m??u",
        name: "Hoa tai Ruby GJE706",
        img: "product-39.jpg",
        price: 16920000
    },
    {
        id: 32,
        type: "???? m??u",
        name: "Hoa tai Ruby GJE706",
        img: "product-39.jpg",
        price: 16920000
    },
    {
        id: 33,
        type: "???? m??u",
        name: "Nh???n Topaz GJR349",
        img: "product-40.jpg",
        price: 7010000
    }
];

// let products = [
//     {
//         type: "kim c????ng",
//         name: "L???c/v??ng DJB177",
//         img: "product-1.jpg",
//         price: 100130000
//     },
//     {
//         type: "kim c????ng",
//         name: "Nh???n DJR3259",
//         img: "product-2.jpg",
//         price: 58970000
//     },
//     {
//         type: "kim c????ng",
//         name: "Hoa tai DJE1137",
//         img: "product-3.jpg",
//         price: 89700000
//     },
//     {
//         type: "kim c????ng",
//         name: "Hoa tai DJE1136",
//         img: "product-4.jpg",
//         price: 71180000
//     },
//     {
//         type: "kim c????ng",
//         name: "M???t d??y kim c????ng FDCP0300",
//         img: "product-5.jpg",
//         price: 42830000
//     },
//     {
//         type: "kim c????ng",
//         name: "M???t d??y kim c????ng FDCP0205",
//         img: "product-6.jpg",
//         price: 44360000
//     },
//     {
//         type: "kim c????ng",
//         name: "Nh???n Kim c????ng FDR0018",
//         img: "product-7.jpg",
//         price: 31500000
//     },
//     {
//         type: "kim c????ng",
//         name: "Hoa tai kim c????ng FDE0015",
//         img: "product-8.jpg",
//         price: 44490000
//     },
//     {
//         type: "kim c????ng",
//         name: "L???c/v??ng DJB177",
//         img: "product-1.jpg",
//         price: 100130000
//     },
//     {
//         type: "kim c????ng",
//         name: "L???c/v??ng DJB177",
//         img: "product-1.jpg",
//         price: 100130000
//     },
//     {
//         type: "kim c????ng",
//         name: "L???c/v??ng DJB177",
//         img: "product-1.jpg",
//         price: 100130000
//     },
//     {
//         type: "kim c????ng",
//         name: "L???c/v??ng DJB177",
//         img: "product-1.jpg",
//         price: 100130000
//     },
//     {
//         type: "v??ng",
//         name: "V??ng charrm CB60035DD",
//         img: "product-25.jpg",
//         price: 3900000
//     },
//     {
//         type: "v??ng",
//         name: "Ghim c??i ??o C??c h???a mi LH60011",
//         img: "product-26.jpg",
//         price: 9090000
//     },
//     {
//         type: "v??ng",
//         name: "D??y v??ng collier LN000256",
//         img: "product-27.jpg",
//         price: 5630000
//     },
//     {
//         type: "v??ng",
//         name: "Ghim c??i ??o C??c h???a mi LH60011",
//         img: "product-28.jpg",
//         price: 5590000
//     },
//     {
//         type: "v??ng",
//         name: "D??y ch??? V???n FP60695",
//         img: "product-29.jpg",
//         price: 4100000
//     },
//     {
//         type: "v??ng",
//         name: "D??y ch??? V???n MP6023",
//         img: "product-31.jpg",
//         price: 4200000
//     },
//     {
//         type: "v??ng",
//         name: "L???c tay LB90120",
//         img: "product-31.jpg",
//         price: 18900000
//     },
//     {
//         type: "v??ng",
//         name: "L???c tay LB90122",
//         img: "product-32.jpg",
//         price: 9280000
//     },
//     {
//         type: "???? m??u",
//         name: "Hoa tai Citrine GJE473",
//         img: "product-33.jpg",
//         price: 9280000
//     },
//     {
//         type: "???? m??u",
//         name: "Nh???n Ruby GJR468",
//         img: "product-34.jpg",
//         price: 10930000
//     },
//     {
//         type: "???? m??u",
//         name: "D??y chuy???n Emerald GJCP697",
//         img: "product-35.jpg",
//         price: 31270000
//     },
//     {
//         type: "???? m??u",
//         name: "L???c/v??ng ???? FGB14484",
//         img: "product-36.jpg",
//         price: 223770000
//     },
//     {
//         type: "???? m??u",
//         name: "L???c/v??ng ???? FGB14484",
//         img: "product-36.jpg",
//         price: 223770000
//     },
//     {
//         type: "???? m??u",
//         name: "L???c/v??ng ???? FGB14484",
//         img: "product-36.jpg",
//         price: 223770000
//     },
//     {
//         type: "???? m??u",
//         name: "L???c/v??ng ???? FGB14484",
//         img: "product-36.jpg",
//         price: 223770000
//     },
//     {
//         type: "???? m??u",
//         name: "B??ng tai Peridot NA722-WG",
//         img: "product-37.jpg",
//         price: 9930000
//     },
//     {
//         type: "???? m??u",
//         name: "Nh???n Topaz NA722-WG",
//         img: "product-38.jpg",
//         price: 7000000
//     },
//     {
//         type: "???? m??u",
//         name: "Hoa tai Ruby GJE706",
//         img: "product-39.jpg",
//         price: 16920000
//     },
//     {
//         type: "???? m??u",
//         name: "Hoa tai Ruby GJE706",
//         img: "product-39.jpg",
//         price: 16920000
//     },
//     {
//         type: "???? m??u",
//         name: "Hoa tai Ruby GJE706",
//         img: "product-39.jpg",
//         price: 16920000
//     },
//     {
//         type: "???? m??u",
//         name: "Nh???n Topaz GJR349",
//         img: "product-40.jpg",
//         price: 7010000
//     }
// ];


function Pagination() {
    next("kim c????ng", 1);
    next("v??ng", 1);
    next("???? m??u", 1);
    //next("sale",1);
}

function next(type, current) {
    let products = nextPage(type, current);

    let htmlcontent = `
    <div class="row g-4">
        ${products.content}  
    `;

    if(nextPage(type, products.index).content !== "")
        htmlcontent += `
            <button onclick="next('kim c????ng', ${products.index})">Next</button>
        `;

    htmlcontent += "</div>";
    

    if(type.localeCompare("kim c????ng") === 0) {
        document.getElementById("tab-1").innerHTML = htmlcontent;
    } else if(type.localeCompare("v??ng") === 0) {
        document.getElementById("tab-2").innerHTML = htmlcontent;
    } else if(type.localeCompare("???? m??u") === 0) {
        document.getElementById("tab-3").innerHTML = htmlcontent;
    }

}

function nextPage(type, current) {
    let productsreturn = "";
    let k = 0;

    // before current
    // after current

    if(current < products.length)

    for(let i = 0, j = 0; i < products.length; i++) {
        if(products[i].type.localeCompare(type) !== 0)
            continue;

        k++;
        // before current
        if(k < current) {
            continue;
        }

        let product_item = `
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
                        <a class="text-body" href="" onclick="addItemToCart(${products[i].id})"
                        ><i class="fa fa-shopping-bag text-primary me-2"></i>Add
                        to cart</a
                        >
                    </small>
                    </div>
                </div>
            </div>`;

        productsreturn += product_item;

        // after current
        j++;
        if(j >= 8)
            break;
    }

    return {content: productsreturn, index: current + k};
}

var cart = [];

function addItemToCart(id) {
    // let get_item_lc = localStorage.getItem('cart');
    // if(get_item_lc){
    //     cart = JSON.parse(get_item_lc);
    // }
    cart.push(id);
    alert(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}

let userFeedback = [];
function getinforUser(e) {
    var User_Feedback = document.getElementById("User-Feedback").value;
    var Username = document.getElementById("User-name").value;
    if (User_Feedback == ''){
        alert('M???i nh???p Feedback'); 
    }
    else {
        var userfeedback = {
            username: Username,
            feedback: User_Feedback
        }

        localStorage.setItem(`userfeedback${userFeedback.length}`, JSON.stringify(userfeedback));
        userFeedback.push(userfeedback);
        alert("???? l??u feedback");
        window.location = 'index.html';
    }
}

function get_product_item(id) {
    console.log(products);
    console.log(id);
    for(let i = 0; i < products.length;i++) {
        if(products[i].id == id)
            return i;
    }

    return null;
}

function giohang() {
    let get_item_lc = localStorage.getItem('cart');
    if(get_item_lc){
        cart = JSON.parse(get_item_lc);
    }

    let htmlcontent = `
    <tr> 
        <th width="480px" height="40px" >S???n ph???m</th>
        <th  width= "170px">????n gi??</th>
        <th width= "170px">S??? l?????ng</th>
        <th width= "170px">Th??nh ti???n</th>
    </tr>`;
    
    for(let i = 0; i < cart.length; i++) {
        
        let productitemindex = get_product_item(cart[i]);
        if(productitemindex === null) {
            alert("null")
            continue;
        }

        alert(productitemindex);

        let item = `
        <tr>
            <td width = "480px" height = "150px">
                <div class="img-wrapper">
                    <div class="cart-img">
                        <img src="./img/${products[productitemindex].img}" alt="">
                    </div>
                    <div class="cart-content">
                        <p class = 'namesp' >${products[productitemindex].name}</p>
                        <a onclick = "removeCart()" href="#">B??? s???n ph???m</a>
                    </div>
                </div>
            </td>
            

                <td width= "170px">
                    <h3 id="price" class="price-new">
                        ${products[productitemindex].price}
                    </h3>
                </td>
            
                <td width ="170px">
                        <input onchange = "updateCart()" class="quantityCart" type="number" min="1" value="1">
                </td>
            
                <td width ="170px">
                        <h3 id="price-total" class="price-new text-center price-modal">
                        400000
                        </h3>
                </td>
            </tr>`;
            
            htmlcontent += item;
    }

    document.getElementById("products-cart").innerHTML = htmlcontent;
    document.getElementById('modal-cart').style.display='block';
}

window.onload = function() {
    let get_item_lc = localStorage.getItem('products');
    if(get_item_lc){
        products = JSON.parse(get_item_lc);
    } else {
        localStorage.setItem("products", JSON.stringify(products));
    }
    cart = [];
    Pagination();
    CreateAdmin();
    keepitreal();
}