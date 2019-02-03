var app = angular.module("pageApp",["ngAnimate","ngTouch","ngTouchOJ"]);


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
$scope.imageShown = '';


$scope.projects = [
    {Name:"Palestiner",folder:"templates/photos/palestiner/",images:["0.png"],url:"https://palestiner.com",count:1},
    {Name:"Gym System",folder:"templates/photos/gym/",images:["0.png","1.png","2.png","3.png","4.png"], url:"https://github.com/YahyaAhmad/QRCode-Gym-System",count:5},
    {Name:"Amnkom",folder:"templates/photos/amnkom/",images:["0.jpeg","1.jpeg","2.jpeg","3.jpeg"],url:"",count:4},
    {Name:"Yahya Ahmad CV",folder:"templates/photos/website/",images:["0.png"],url:"https://github.com/YahyaAhmad/YahyaAhmad.github.io",count:1}
];

$scope.skills = [
    {name: "HTML/CSS", class: 'excellent', tooltip: "I excell in HTML and CSS"},
    {name: "Javascript/JQuery", class: 'excellent', tooltip: "I excell in JS and JQuery"},
    {name: "ReactJS", class: 'very-good', tooltip: "I'm very good at ReactJS"},
    {name: "C#", class: 'very-good', tooltip: "I'm very good at C#"},
    {name: "PHP", class: 'very-good', tooltip: "I'm very good at PHP"},
    {name: "Drupal", class: 'very-good', tooltip: "I'm very good at Drupal"},
    {name: "Node.js", class: 'good', tooltip: "I'm good at Node.js"},
    {name: "AngularJS", class: 'good', tooltip: "I'm good at AngularJS"},

    {name: "ASP.net forms", class: 'familiar', tooltip:"I have worked with ASP.net"},
    {name: "Sound Design", class: 'familiar', tooltip:'I have worked at sound designing'},
    {name: "Poster Design", class: 'familiar', tooltip:'I have worked at poster designing'},
    {name: "Photoshop", class: 'familiar', tooltip:"I'm familiar with Photoshop" },

]


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
            
            $scope.hideEverything();
            
        });

        
    }
});

$scope.hideEverything = function(){
    
    $scope.showPopup = false;
    $scope.showImagePopup = false;
    $scope.exitClickable = false;
     
}

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
    $timeout.cancel($scope.timer);
    $scope.finished = false;
    $scope.errorF = '';
    $scope.classLoader = '';
    $scope.htmlFile = `templates/${file}`;
    $scope.timer = $timeout(function(){$scope.finished = true;},800);
    
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
    $scope.imageShown = "shown";

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

app.controller('sliderController',function($scope,$timeout,$document,$window){
    $scope.counter = 0;
    $scope.maxCount;
    $scope.right = true;
    $scope.showSliderPopup = false;
    $scope.exitClickable = true;
    $scope.folder = [];
    $scope.ready = false;

    $document.bind('keydown', function(event){
        if(event.which===27){
            $scope.$apply(function(){
                
                $scope.changeSliderShow('');
                
            });
            
            
        }

        if(event.which===39){
        
                $timeout(function(){$scope.nextImage();});
           
        }

        if(event.which===37){
         
                $timeout(function(){$scope.prevImage();});
        
        }
    });

    $scope.navigate = function(url){
        if(url==="") return;
        $window.open(url, '_blank');
    }

    var timerSlider;

    $scope.changeSliderShow = function(project){
        if($scope.$parent.finished==false) return;
        if(project==''){
            $timeout.cancel(timerSlider);
            $scope.ready=false;
            $scope.showSliderPopup = false;
            $timeout(function(){$scope.counter=0;},400);
            return;
        }
        $scope.exitClickable = true;
        $scope.activeProject = project;
        $scope.showSliderPopup = true;
        timerSlider = $timeout(function(){$scope.ready=true;},550);

    }

    $scope.setImage = function(index){
        if(index>$scope.counter)
            $scope.right = true;
        else
            $scope.right = false;

        $timeout(function(){$scope.counter=index;},10);
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

    $scope.openImageUrl = function(imageUrl){
        window.open(imageUrl);
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
