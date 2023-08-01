let list = JSON.parse(localStorage.getItem("cart"));
var app = angular.module("AppBanHang", []);
app.controller("CartCtrl", function ($scope, $http) {
  $scope.listcart = [];
  $scope.HoVaTen;
  $scope.DiaChi;
  $scope.diachinhan;
  $scope.SoDienThoai;
  $scope.Email;
  
  $scope.lcanh = current_img;

  $scope.tongtien;

  var listuser = JSON.parse(localStorage.getItem("khachhang")) || [];
  if(listuser.length>0){
    $scope.MaKhachHang = listuser[0].MaKhachHang;
    $scope.HoVaTen = listuser[0].HoVaTen;
    $scope.DiaChi = listuser[0].DiaChi;
    $scope.SoDienThoai = listuser[0].SoDienThoai;
    $scope.Email = listuser[0].Email;
  }
  

  
  $scope.LoadCart = function () {
    $scope.listcart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log($scope.listcart)
    makeScript("js/main.js");
  };
  $scope.save = function () {
    // let list = JSON.parse(localStorage.getItem("cart"));
    let obj = {};
    obj.MaKhachHang = $scope.MaKhachHang;
    obj.MoTa = "";
    obj.DiaChiNhan = $scope.diachinhan;
    obj.listdh = [];
    for (var i = 0; i < list.length; i++) {
      obj.listdh.push({
        MaSanPham: list[i].maSanPham,
        SoLuong: list[i].quantity,
      });
    }
    $http({
      method: "POST",
      data: obj,
      url: current_url + "/api/DonHang/AddToCart",
    }).then(function (response) {
      localStorage.setItem("cart", JSON.stringify([]));
      alert("Thêm đơn hàng thành công");
      window.location.reload();
    });
  };

  $scope.delete = function (id) {
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // Tìm vị trí của sản phẩm cần xóa trong mảng
    let index = list.findIndex((item) => item.maSanPham === id);
    if (index !== -1) {
      list.splice(index, 1);
    }
    // Cập nhật lại giỏ hàng trong localstorage
    localStorage.setItem("cart", JSON.stringify(list));
    $scope.LoadCart();
  };

  $scope.upcart = function(item){
    // let cart = JSON.parse(localStorage.getItem("cart"));
   
    let index = list.findIndex((x) => x.maSanPham === item.maSanPham);
    if (index !== -1) {
        list[index].quantity +=1 
    }
    localStorage.setItem("cart", JSON.stringify(list));
    $scope.LoadCart();
    $scope.GetSum();
  }

  $scope.downcart = function(item){
    // let cart = JSON.parse(localStorage.getItem("cart"));
   
    let index = list.findIndex((x) => x.maSanPham === item.maSanPham);
    if (index !== -1) {
        list[index].quantity -= 1 
    }
    localStorage.setItem("cart", JSON.stringify(list));
    $scope.LoadCart();
    $scope.GetSum();
  }

  $scope.thanhtoan = function () {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user == null) {
      window.location.href = "login.html";
    } else {
      window.location.href = "checkout.html";
    }
  };

  
  $scope.GetSum = function () {
    var sum = 0;
    console.log(list);
    for (var i = 0; i < list.length; i++) {
      sum += list[i].giaBan * list[i].quantity;
    }
    $scope.tongtien = sum;
  };
  

  $scope.LoadCart();
  $scope.GetSum();
});
