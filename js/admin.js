function trangchu() {
    window.location = "index.html";
}

function swappic() {
    let img = document.getElementById("addimg").value;
    img = 'img/' + img.slice(12);
    document.getElementById("pic").innerHTML = '<img src="' + img + '"style="width:25%">';
}

function thugon() {
    document.getElementById("masp").value = "";
    document.getElementById("tensp").value = "";
    document.getElementById("addimg").value = "";
    document.getElementById("pic").innerHTML = "";
    document.getElementById("giasp").value = "";
    document.getElementById("addnfix").innerHTML = "Thêm sản phẩm";
    document.getElementById("addsp").style.display = "none";
    window.location.reload();
    add = 0;
}

function random() {
    var rd = Math.floor(Math.random() * 10000);
    var msp = document.getElementById("masp").value;
}

// let products = [];
var products = [
    {
        id: 01,
        type: "kim cương",
        name: "Lắc/vòng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 02,
        type: "kim cương",
        name: "Nhẫn DJR3259",
        img: "product-2.jpg",
        price: 58970000
    },
    {
        id: 03,
        type: "kim cương",
        name: "Hoa tai DJE1137",
        img: "product-3.jpg",
        price: 89700000
    },
    {
        id: 04,
        type: "kim cương",
        name: "Hoa tai DJE1136",
        img: "product-4.jpg",
        price: 71180000
    },
    {
        id: 05,
        type: "kim cương",
        name: "Mặt dây kim cương FDCP0300",
        img: "product-5.jpg",
        price: 42830000
    },
    {
        id: 06,
        type: "kim cương",
        name: "Mặt dây kim cương FDCP0205",
        img: "product-6.jpg",
        price: 44360000
    },
    {
        id: 07,
        type: "kim cương",
        name: "Nhẫn Kim cương FDR0018",
        img: "product-7.jpg",
        price: 31500000
    },
    {
        id: 08,
        type: "kim cương",
        name: "Hoa tai kim cương FDE0015",
        img: "product-8.jpg",
        price: 44490000
    },
    {
        id: 09,
        type: "kim cương",
        name: "Lắc/vòng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 10,
        type: "kim cương",
        name: "Lắc/vòng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 11,
        type: "kim cương",
        name: "Lắc/vòng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 12,
        type: "kim cương",
        name: "Lắc/vòng DJB177",
        img: "product-1.jpg",
        price: 100130000
    },
    {
        id: 13,
        type: "vàng",
        name: "Vòng charrm CB60035DD",
        img: "product-25.jpg",
        price: 3900000
    },
    {
        id: 14,
        type: "vàng",
        name: "Ghim cài áo Cúc họa mi LH60011",
        img: "product-26.jpg",
        price: 9090000
    },
    {
        id: 15,
        type: "vàng",
        name: "Dây vàng collier LN000256",
        img: "product-27.jpg",
        price: 5630000
    },
    {
        id: 16,
        type: "vàng",
        name: "Ghim cài áo Cúc họa mi LH60011",
        img: "product-28.jpg",
        price: 5590000
    },
    {
        id: 17,
        type: "vàng",
        name: "Dây chữ Vạn FP60695",
        img: "product-29.jpg",
        price: 4100000
    },
    {
        id: 18,
        type: "vàng",
        name: "Dây chữ Vạn MP6023",
        img: "product-31.jpg",
        price: 4200000
    },
    {
        id: 19,
        type: "vàng",
        name: "Lắc tay LB90120",
        img: "product-31.jpg",
        price: 18900000
    },
    {
        id: 20,
        type: "vàng",
        name: "Lắc tay LB90122",
        img: "product-32.jpg",
        price: 9280000
    },
    {
        id: 21,
        type: "đá màu",
        name: "Hoa tai Citrine GJE473",
        img: "product-33.jpg",
        price: 9280000
    },
    {
        id: 22,
        type: "đá màu",
        name: "Nhẫn Ruby GJR468",
        img: "product-34.jpg",
        price: 10930000
    },
    {
        id: 23,
        type: "đá màu",
        name: "Dây chuyền Emerald GJCP697",
        img: "product-35.jpg",
        price: 31270000
    },
    {
        id: 24,
        type: "đá màu",
        name: "Lắc/vòng đá FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 25,
        type: "đá màu",
        name: "Lắc/vòng đá FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 26,
        type: "đá màu",
        name: "Lắc/vòng đá FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 27,
        type: "đá màu",
        name: "Lắc/vòng đá FGB14484",
        img: "product-36.jpg",
        price: 223770000
    },
    {
        id: 28,
        type: "đá màu",
        name: "Bông tai Peridot NA722-WG",
        img: "product-37.jpg",
        price: 9930000
    },
    {
        id: 29,
        type: "đá màu",
        name: "Nhẫn Topaz NA722-WG",
        img: "product-38.jpg",
        price: 7000000
    },
    {
        id: 30,
        type: "đá màu",
        name: "Hoa tai Ruby GJE706",
        img: "product-39.jpg",
        price: 16920000
    },
    {
        id: 31,
        type: "đá màu",
        name: "Hoa tai Ruby GJE706",
        img: "product-39.jpg",
        price: 16920000
    },
    {
        id: 32,
        type: "đá màu",
        name: "Hoa tai Ruby GJE706",
        img: "product-39.jpg",
        price: 16920000
    },
    {
        id: 33,
        type: "đá màu",
        name: "Nhẫn Topaz GJR349",
        img: "product-40.jpg",
        price: 7010000
    }
];

function createProduct() {
    if(localStorage.getItem('products')===null) {
        localStorage.setItem('products',JSON.stringify(products));
    }
  }
// let product_item = {id, type, name, price, img}; //Tạo obj sản phẩm
function them(){
    let id = document.getElementById("masp").value;
    let type = document.getElementById("theloai").value;
    let name = document.getElementById("tensp").value;
    // let get_child_pic = document.getElementById("addimg").firstElementChild;
    // let img = '';
    // if(get_child_pic){
    //     img = get_child_pic.src;
    // }
    let img = document.getElementById("addimg").value;
    console.log(img);
    img = 'img/' + img.slice(12);
    let price = parseInt(document.getElementById("giasp").value);
    
    let product_item = {id, type, name, price, img}; //Tạo obj sản phẩm

    let get_item_lc = localStorage.getItem("products");
    if(!get_item_lc){         //Nếu trong local chưa có sp nào (lần đầu thêm sp)
        products.push(product_item);        //thì add sp mới vào lần đầu tiên
    }else{                  //local đã có sản phẩm
        products = JSON.parse(get_item_lc);             //móc sp từ local ra
        products.push(product_item);                    //add thêm sp mới vào mảng
    }
    alert("Đã thêm sản phẩm")
    window.location.reload(); 
    localStorage.setItem("products", JSON.stringify(products));   //lưu lại vào local
    
}

let get_item_lc = localStorage.getItem('products');
if(get_item_lc){
    productArray = JSON.parse(get_item_lc);
}
// console.log(products);
function showproduct() {
    if (localStorage.getItem('products') === null) {
        return false;
    }
    var s = "";
    let a = "";
    console.log(s);
    for (let i = 0; i < products.length; i++) {
        a = 
            `<tr>`+
                `<td></td>`+
                `<td>`+ products[i].id +`</td>`+
                `<td>`+ products[i].type +`</td>`+
                `<td>`+ products[i].name +`</td>`+
                `<td>`+ products[i].price +`</td>`+
                `<td> <img src="`+ products[i].img +`<"style="witdh:100px;height:100px"> /td>`+
                '<td> <input  type="button" id="btsua" value="Sửa" onclick="sua(' + products[i].id + ')"><input type="button" id="btxoa" value="Xóa" onclick="xoa(' + products[i].id + ')"></td>' +
            +`</tr>`;
        s += a;

    }
    document.getElementById("tbodySanPham").innerHTML = s;
}
