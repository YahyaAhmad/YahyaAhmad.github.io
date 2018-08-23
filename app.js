var app = angular.module("pageApp",["ngAnimate"]);


app.controller("test",function($scope,$interval){
$scope.stop = undefined;
$scope.htmlFile = 'templates/home.html';

$scope.setInclude = function(file){
    $scope.htmlFile = file;
}

$scope.changeInclude = function(file){
    if($scope.htmlFile == `templates/${file}`) return;
    $scope.errorF = '';
    $scope.classLoader = '';
    $scope.htmlFile = `templates/${file}`;
    
}

$scope.changeClass = function(path){

    if(`templates/${path}` == $scope.htmlFile) return "activeTab";

}

$scope.$on("$includeContentLoaded",function(event,templete){
    
    $scope.classLoader = 'opacity_hide';
    if(angular.isDefined($scope.stop)){
    console.log("The stop was defined, stop now is undefined.");
    $interval.cancel($scope.stop);
    $scope.stop = undefined;
    }


});

$scope.$on("$includeContentError",function(event,templete){

    if(angular.isDefined($scope.stop)) return;
    $scope.stop = $interval(function(){$scope.htmlFile = templete + '?update=' + new Date().getTime();},1000);
    $scope.errorF = 'error';
});


    
});