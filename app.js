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
            body: "<strong>mugewara1@gmail.com</strong>"
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

    this.getFolder = function(url){

        alert(url);

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

$scope.nextImage = function(){
    
    if($scope.counter>=$scope.imagesFolder.length) return;
    $scope.counter+=1;
    
    $scope.imageUrl =  $scope.imagesFolder[$scope.counter];
    
}

$scope.changeImageShow = function(type){
    var tempImage;
    if(type==''){
        if(!$scope.exitClickable) return;
        $scope.exitClickable = false;
        $scope.showImagePopup = false;
        
        console.log("ChangeImage");
        return;
    }
    if(type!='image.jpeg') {$scope.notCircle = true; tempImage = type.img; $scope.imagesFolder = type.folder; }
    else {$scope.notCircle = false; tempImage = type; }
    $scope.imageUrl = tempImage;
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

app.directive('dirSlider',function(){

    return {
        templateUrl:"templates/slider.html"
    };

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

app.controller('sliderController',function($scope,$timeout){
    $scope.counter = 0;
    $scope.maxCount;
    $scope.right = true;
    $scope.showSliderPopup = false;
    $scope.exitClickable = true;
    $scope.folder = [];
    $scope.projects = [
        {Name:"Gym System",folder:"templates/photos/gym/",images:["0.png","1.png","2.png","3.png","4.png"],count:5},
        {Name:"Amnkom",folder:"templates/photos/amnkom/",images:["0.jpeg","1.jpeg","2.jpeg","3.jpeg"],count:4}
       
    ];

    $scope.changeSliderShow = function(project){
        if(project==''){
            $scope.showSliderPopup = false;
            $timeout(function(){$scope.counter=0;},400);
            return;
        }
        $scope.exitClickable = true;
        $scope.activeProject = project;
        $scope.showSliderPopup = true;

    }

    $scope.nextImage = function(){
        if(!$scope.showSliderPopup) return;
        $scope.right = true;
        if($scope.counter+1==$scope.activeProject.count){
            $timeout(function(){$scope.counter = 0;},10);
            return;
        }
        $timeout(function(){$scope.counter += 1;},10);

    }

    $scope.prevImage = function(){
        if(!$scope.showSliderPopup) return;
        $scope.right = false;
        if($scope.counter==0){
            $timeout(function(){$scope.counter = $scope.activeProject.count - 1;},10);
            return;
        }
        $timeout(function(){$scope.counter -= 1;},10);
        

    }

});