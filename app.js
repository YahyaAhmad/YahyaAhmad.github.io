var app = angular.module("pageApp",["ngAnimate"]);

app.directive('dirMessage',function(){

    return{

        templateUrl:'templates/modal.html'

    }

});

app.service('modalService',function(){

    this.makeMessage = function(type){

        var messageObject = {};

        if (type=='contact'){
            
            messageObject = {
            header: "CONTACT ME",
            body: "<strong>yahyaahmad@gmail.com</strong>"
           };
        }

        if (type=='cv'){
            
            messageObject = {
            header: "MY CV",
            body: "<a href='yahya_ahmad_cv.docx'>DOWNLOAD</a>"
           };
        }

        return messageObject;

    }

});



app.controller("test",function($scope,$interval,$timeout,modalService,$sce){
$scope.stop = undefined;
$scope.shown = true;
$scope.exitClickable = true;
$scope.showPopup = false;
$scope.trust = $sce.trustAsHtml;
$scope.toggleBar = function(){

    $scope.shown = !$scope.shown;
    

}

$timeout(function(){ $scope.htmlFile = 'templates/home.html'; },500);

$scope.changeShow = function(type){ 

    if(type==''){
        if(!$scope.exitClickable) return;
        $scope.exitClickable = false;
        $scope.showPopup = false;
        return;
    }
    $scope.exitClickable = true;
    var messageObject = modalService.makeMessage(type);
    $scope.header = messageObject.header;
    $scope.body = messageObject.body;
    $scope.showPopup = !$scope.showPopup;
 }

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