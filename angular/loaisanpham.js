var app = angular.module('AppBanHang', []);
app.controller("LoaiSanPhamCtrl", function($scope, $http) {
    $scope.listlspbyid;
    $scope.listsp;
    $scope.LoadCategoryById = function() {
        var key = 'id';
        var value = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-product-maloai?id=' + value,
        }).then(function(response) {
            $scope.listlspbyid = response.data;
            console.log($scope.listlspbyid)
            makeScript('js/main.js')
        });
    };

    $scope.lcanh = current_img;
    $scope.LoadDanhMuc = function() {
        $http({
            method: 'GET',
            url: current_url + '/api/LoaiSanPham/get-all-category',
        }).then(function(response) {
            $scope.listsp = response.data;
            makeScript('js/main.js')
        });
    };


});