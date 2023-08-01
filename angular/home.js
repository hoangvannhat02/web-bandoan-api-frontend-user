
var app = angular.module('AppBanHang', []);
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.listSanPhamNew;
    $scope.listLoaiSanPham;
    $scope.listSanPham;
    $scope.listspbanchay;
    $scope.nameuser;
    $scope.sumquanticart=0;

    $scope.lcanh = current_img;
    
    var name = JSON.parse(localStorage.getItem('khachhang'));
    if(name == null){
        
    }
    else{
        $scope.nameuser = name[0].HoVaTen;
    }

    
  
    $scope.loadquantitycart = function(){
        var getcart = JSON.parse(localStorage.getItem('cart'));
        for(let x of getcart){
            $scope.sumquanticart += x.quantity;
        }
    }
    
    $scope.LoadSellingProduct = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/SanPham/selling-product?sl=8',
        }).then(function (response) {
            $scope.listspbanchay = response.data; 
            console.log($scope.listspbanchay)          			         
			makeScript('js/main.js')
        });
    }; 
    $scope.LoadSellingProduct()

    $scope.hientheoloai = function(id){
       
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-product-maloai?id=' + id,
        }).then(function(response) {
            $scope.listSanPhamNew = response.data;
            console.log($scope.listSanPhamNew)
            makeScript('js/main.js')
        });
    }
   

    $scope.LoadNewProduct = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/SanPham/New-Product/8',
        }).then(function (response) {
            $scope.listSanPhamNew = response.data;           			         
			makeScript('js/main.js')
        });
    }; 
    $scope.LoadNewProduct()
    
    $scope.addToCart = function (item) {
        var list = null;
        item.quantity = 1;       
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.maSanPham == item.maSanPham) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        $scope.sumquanticart = 0;
        $scope.loadquantitycart();
        alert("Đã thêm giỏ hàng thành công!");
    }
    
    $scope.LoaiSanPham = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/LoaiSanPham/get-all-category',
        }).then(function (response) {	   
            $scope.listLoaiSanPham = response.data;  
            console.log($scope.listLoaiSanPham)       
			makeScript('js/main.js')
        });       
    };    
   
    $scope.LoadSanPham = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/SanPham/Get-all-product',
        }).then(function (response) {	   
            $scope.listSanPham = response.data;
            console.log($scope.listSanPham);  
			makeScript('js/main.js')
        });       
    };  
    
    $scope.longout = function(){
        localStorage.removeItem('khachhang');
        window.location.href = 'login.html'
    }
    $scope.loadquantitycart();
   
});

