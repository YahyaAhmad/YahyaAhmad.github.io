var app = angular.module("pageApp",["ngAnimate","ngTouch"]);

app.directive('dirMessage',function(){

    return{

        templateUrl:'templates/modal.html'

    }

});

app.directive('dirImage',function(){


    return{
        templateUrl:'templates/image.html'
    };

});

// app.directive('projectsDir',function(){

//     return{

//         template:"<div class='heading-1'>{{projects.Name}} {{projects.dis}}</div>"

//     };

// });

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
            body: "<a href='yahyaahmad_cv.pdf'>DOWNLOAD</a>"
           };
        }

        return messageObject;

    }

});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 65) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller("test",function($scope,$interval,$timeout,modalService,$sce,$document){
$scope.stop = undefined;
$scope.started = false;
$scope.showImagePopup = false;
$scope.shown = false;
$scope.exitClickable = true;
$scope.showPopup = false;
$scope.trust = $sce.trustAsHtml;
$scope.imageUrl = 'image.jpeg';

$scope.projects = [
    {Name:"Gym System",img:"templates/photos/gym.png"},
    {Name:"Amnkom",img:"templates/photos/amnkom.jpeg"}
   
];

$scope.showProjectDetails = function(project){

    var splitString = project.img.split('.');

    alert(`Name: ${project.Name} - URL: ${splitString[0]}`);

}

$scope.toggleBar = function(){

    $scope.shown = !$scope.shown;
    

}

$scope.hideBar = function(){
    $scope.shown = false;
}

// $timeout(function(){ $scope.htmlFile = 'templates/home.html'; },500);

$scope.changeImageShow = function(type){
    
    if(type==''){
        if(!$scope.exitClickable) return;
        $scope.exitClickable = false;
        $scope.showImagePopup = false;
        
        console.log("ChangeImage");
        return;
    }
    if(type!='image.jpeg') $scope.notCircle = true;
    else $scope.notCircle = false;
    $scope.imageUrl = type;
    $scope.exitClickable = true;
    $scope.showImagePopup = !$scope.showImagePopup;

}

$document.bind('keydown', function(event){
    if(event.which===27){
        $scope.$apply(function(){
            $scope.showImagePopup = false;
            $scope.changeImageShow('');
        });
        
    }
});

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
    if(!$scope.started) return;
    if($scope.htmlFile == `templates/${file}`) return;
    $scope.errorF = '';
    $scope.classLoader = '';
    $scope.htmlFile = `templates/${file}`;
    
}

$scope.changeClass = function(path){
    if($scope.started)
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

app.controller('pictureController',function($scope,$timeout){

    $scope.showPicture = true;
    angular.element(document).ready(function(){

        $timeout(function(){ $scope.showPicture = false;
            $scope.$parent.htmlFile = 'templates/home.html';
            $scope.$parent.started = true;
        },1500);

    });

  


});