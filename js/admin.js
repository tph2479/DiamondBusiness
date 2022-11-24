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
    document.getElementById("sale").value = "";
    document.getElementById("addnfix").innerHTML = "Thêm sản phẩm";
    document.getElementById("addsp").style.display = "none";
    add = 0;
}

function random() {
    var rd = Math.floor(Math.random() * 10000);
    var msp = document.getElementById("masp").value;
}