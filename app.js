var app = angular.module("pageApp",["ngAnimate"]);


app.controller("test",function($scope){

$scope.htmlFile = 'templates/home.html';

$scope.changeInclude = function(file){
    $scope.classLoader = '';
    $scope.htmlFile = `templates/${file}`;
    
}

$scope.$on("$includeContentLoaded",function(event,templete){

    $scope.classLoader = 'opacity_hide';

});
    
});