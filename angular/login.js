var app = angular.module('AppBanHang', []);
app.controller("LoginCtrl", function($scope, $http) {
    $scope.makhachhang;
    $scope.hovaten;
    $scope.username;
    $scope.password;
    $scope.diachi;
    $scope.sodienthoai;
    $scope.email;

    $scope.addcustomer = function(){
        let obj = {}
        obj.HoVaTen = $scope.hovaten
        obj.UserName = $scope.username
        obj.PassWord = $scope.password
        obj.DiaChi = $scope.diachi
        obj.SoDienThoai = $scope.sodienthoai
        obj.Email = $scope.email
        $http(
            {
                method:"POST",
                data:obj,
                url: current_url+"/api/KhachHang/create-customer"
            }
        ).then(function(response){
            alert("đã đăng ký thông tin thành công")
            window.location.href = 'login.html'           
        })
    }

    $scope.login = function(event){
        event.preventDefault();
        let obj = {} 
        obj.HoVaTen = ""
        obj.UserName = $scope.username
        obj.PassWord = $scope.password
        obj.DiaChi = ""
        obj.SoDienThoai = ""
        obj.Email = ""  
        $http(
            {
                method:"POST",
                data:obj,
                url: current_url+"/api/KhachHang/checklogin"
            }
        ).then(function(response){     
             
            var list = [
                {
                    MaKhachHang:response.data.maKhachHang,
                    HoVaTen:response.data.hoVaTen,
                    DiaChi:response.data.diaChi,
                    Email:response.data.email,
                    SoDienThoai:response.data.soDienThoai,
                    UserName:response.data.userName,
                    PassWord:response.data.passWord 
                }
            ]     
            console.log(list)
            if(response.data!=""){     
                localStorage.setItem('khachhang',JSON.stringify(list))        
                window.location.href = 'index.html'
            }
            else{
                alert("Tài khoản hoặc mật khẩu không chính xác vui lòng xem lại")
            }
            
        })
    }

    
})