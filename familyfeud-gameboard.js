
var familyFeudApp = angular.module('familyFeudApp',[])

familyFeudApp.controller('FamilyFeudGameboardController', ['$scope', '$http', function($scope, $http) {

    $scope.currentRound = 0;
    $scope.rounds = [];    
    $scope.surveyQuestion = "";
    $scope.surveyAnswers = [];
    $scope.answerSubmitted = "";
    
    $scope.loadGames = function() {
      $http.get('familyfeud-rounds.json').
        success(function(data, status, headers, config) {
            $scope.rounds = data;
            $scope.loadRound(0);
        });
    };
    
    $scope.loadRound = function(round) {
        $scope.currentRound = round;
        $scope.surveyQuestion = $scope.rounds[round].question;
        
        $scope.surveyAnswers = [];
        angular.forEach($scope.rounds[round].answers, function(answer, index){
            $scope.surveyAnswers.push(SurveyAnswer(answer, index + 1));      
        });        
    };
    
    $scope.loadNextRound = function() {
        if (($scope.currentRound + 1) >= $scope.rounds.length) $scope.currentRound = -1;
        $scope.loadRound(++$scope.currentRound);
    };
    
    $scope.checkAnswer = function() {
        var found = false;
        angular.forEach($scope.surveyAnswers, function(surveyAnswer, index){
           if (surveyAnswer.text.trim() === $scope.answerSubmitted.trim()){
               found = true;
               surveyAnswer.show = true;
           }
        });
        playAnswerSoundEffect(found);
    };
    
    $scope.getClass = function(surveyAnswer) {
        var classes = new Object();
        classes['survey-answer'] = true;
        classes['survey-answer-shown'] = surveyAnswer.show;
        return classes;
    };
    
    $scope.reveal = function(surveyAnswer) {
        surveyAnswer.show = true;
        playAnswerSoundEffect(true);
    };    

}]);

function SurveyAnswer(text, index) {
    var surveyAnswer = new Object();
    surveyAnswer.text = text;
    surveyAnswer.show = false;
    surveyAnswer.display = function(){ 
        if (surveyAnswer.show) {
            return surveyAnswer.text; 
        } else {
            return index;
        }
    };
    return surveyAnswer;
}

function playAnswerSoundEffect(correct) {
    if (correct) {
        new Audio("right.mp3").play();
    } else {
        new Audio("wrong.mp3").play();
    }
}
