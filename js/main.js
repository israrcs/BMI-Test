var BMIApp = angular.module('BMIApp', ['ui.bootstrap']);
BMIApp.controller('meter', function($scope, $modal) {

    $scope.selectedHeight = 0;
    $scope.selectedWeight = 0;

    $scope.heightUnit = 'cm';
    $scope.weightUnit = 'kg';

    $scope.BMI = 0;

    //initiating weight bars
    var heightBars = [];
    for (var i = 0; i < 3001; i++){
        if (i % 5 === 0 && i % 10 !== 0) heightBars[i] = 'md';
        else if (i % 10 === 0)  heightBars[i] = 'lg';
        else heightBars[i] = 'sm';
    }

    $scope.heightMeterBars = heightBars;

    var weightBars = [];
    for (i = 0; i < 301; i++) {
        if (i % 5 === 0 && i % 10 !== 0) weightBars[i] = 'md';
        else if (i % 10 === 0) weightBars[i] = 'lg';
        else weightBars [i] = 'sm';
    }

    $scope.weightMeterBars = weightBars;

    $scope.setHeight = function(){

        if($scope.heightUnit === 'cm'){
            $scope.heightUnit = 'Ft/in';
            $scope.selectedHeight = parseInt($scope.selectedHeight / 30.48);
        }
        else{
            $scope.heightUnit = 'cm';
            $scope.selectedHeight = parseInt($scope.selectedHeight * 30.48);
        }

    };

    $scope.setWeight = function(){
        if($scope.weightUnit === 'kg')
        {
            $scope.weightUnit = 'lbs';
            $scope.selectedWeight = parseInt($scope.selectedWeight * 2.20462);
        }
        else{
            $scope.weightUnit = 'kg';
            $scope.selectedWeight = parseInt($scope.selectedWeight / 2.20462);
        }

    };

    var updateBMI = function(){
        $scope.BMI = parseInt($scope.selectedHeight / $scope.selectedWeight) || 0;

        if ($scope.BMI === 0){
            $scope.BMIStatus = '';
        }
        else if ($scope.BMI <= 19){
            $scope.BMIStatus = 'Under weight';
            $scope.color='color: #fbcf40';
        }
        else if ($scope.BMI <= 24){
            $scope.BMIStatus = 'Good weight';
            $scope.color='color: #40e979'
        }
        else if($scope.BMI <= 29){
            $scope.BMIStatus = 'Over weight';
            $scope.color='color: #eaa72b'

        }
        else{
            $scope.BMIStatus = 'Obese';
            $scope.color='color: #e61515;left: 162px;'
        }
    };

    var popupCtrl = function ($scope, $modalInstance, options) {

        $scope.options  = options;

        $scope.changeSelection = function (item) {
            $scope.options.selectedValue = item;
        };

        $scope.ok = function () {
            $modalInstance.close($scope.options.selectedValue);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    };

    $scope.heightItems = [];
    for(i = 0 ; i < 301; i++){
        $scope.heightItems[i] = i;
    }
    $scope.openHeight = function () {
        var modalInstance = $modal.open({
            templateUrl: 'PopupContent.html',
            controller: popupCtrl,
            size: 'sm',
            resolve: {
                options: function () {
                    return {
                        title : 'Select Height',
                        unit  : $scope.heightUnit,
                        items : $scope.heightItems,
                        selectedValue : $scope.selectedHeight

                    }
                }
            }
        });

        modalInstance.result.then(function (selectedValue) {
            $scope.selectedHeight = selectedValue;
            updateBMI();
        }, function () {
            //dismiss callback
        });
    };

    $scope.weightItems = [];
    for(i = 0 ; i < 301; i++){
        $scope.weightItems[i] = i;
    }

    $scope.openWeight = function () {
        var modalInstance = $modal.open({
            templateUrl: 'PopupContent.html',
            controller: popupCtrl,
            size: 'sm',
            resolve: {
                options : function () {
                    return {
                        title : 'Select Weight',
                        unit  : $scope.weightUnit,
                        items : $scope.weightItems,
                        selectedValue : $scope.selectedWeight
                    }
                }
            }
        });

        modalInstance.result.then(function (selectedValue) {
            $scope.selectedWeight = selectedValue;
            updateBMI();
        }, function () {
            //dismiss callback
        });
    };

});
