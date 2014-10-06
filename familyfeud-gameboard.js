
var familyFeudApp = angular.module('familyFeudApp',[])

familyFeudApp.controller('FamilyFeudGameboardController', ['$scope', function($scope) {

    $scope.surveyAnswers = [];
    
    $scope.addSurveyAnswer = function() {
      $scope.surveyAnswers.push({val:'test'});  
    };

}]);
