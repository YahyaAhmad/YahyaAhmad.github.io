var app = angular.module("pageApp",["ngAnimate"]);


app.controller("test",function($scope){

$scope.htmlFile = 'templates/home.html';

$scope.changeInclude = function(file){

    $scope.htmlFile = `templates/${file}`;

}
    
});