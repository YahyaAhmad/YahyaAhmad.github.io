var app = angular.module("pageApp",["ngAnimate"]);


app.controller("test",function($scope){

$scope.htmlFile = 'templates/home.html';
$('.loader').addClass('opacity_hide');
$scope.changeInclude = function(file){
    $('.loader').removeClass('opacity_hide');
    $scope.htmlFile = `templates/${file}`;
    $('.loader').addClass('opacity_hide');
}
    
});