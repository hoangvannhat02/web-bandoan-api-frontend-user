 var app = angular.module('AppBanHang', []);
app.controller("ChitietCtrl", function ($scope, $http) {
    $scope.sanpham;  
    $scope.lcanh = current_img;
    $scope.LoadSanPhambyID = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/SanPham/get-by-id?id='+value,
        }).then(function (response) { 
            $scope.sanpham = response.data;
            console.log($scope.sanpham)
			makeScript('js/main.js')
        });
    };  
    $scope.LoadSanPhamGiong = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/SanPham/same-product?id='+value,
        }).then(function (response) { 
            $scope.sanphamtuongtu = response.data;
            console.log($scope.sanphamtuongtu)
			makeScript('js/main.js')
        });
    };  
    $scope.addToCart = function (item) {
     
        var list = null;
        var inputElement = document.querySelector('.product__details__quantity input');
        item.quantity = parseInt(inputElement.value);
              
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.maSanPham == item.maSanPham) {
                    x.quantity += item.quantity;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
      
        alert("Đã thêm giỏ hàng thành công!");
    }
    $scope.LoadSanPhamGiong()
});

