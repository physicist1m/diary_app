var diaryApp = angular.module("diaryApp", ['ngStorage'])
  .controller("diaryController", function diaryController($scope, $localStorage) {

    $scope.$storage = $localStorage;

    $scope.$storage.items = $localStorage.items || [];
    $scope.$storage.comments = $localStorage.comments || [];


    $scope.boxCounter = 0;

    $scope.addItem = function () {
      if($scope.task == undefined || $scope.task == "") {
        return;
      }
      $scope.$storage.items.push($scope.task);
      console.log($scope.$storage.items);
      $scope.$storage.comments.push([]);
      $('#itemName').val("");
      console.log($scope.$storage.comments);
    }

    var activeId;

    $scope.activate = function (event) {
      activeId = event.target.id;
      for (var i = 0; i < $scope.$storage.items.length; i++) {
        if ($("#item" + i).hasClass('active')) {
          $("#item" + i).removeClass('active');
          $("#" + activeId).addClass('active');
        } else {
          $("#" + activeId).addClass('active');
        }
      }
      $scope.activeId = activeId.substr(4) - 1 + 2;
      console.log($scope.activeId);
    }

    var shift = false;

    $scope.addComment = function (event) {
      if (event.keyCode == 16) {
        shift = true;
      }
      if (shift) {
        if (event.keyCode == 13) {
          //console.log($scope.activeId - 1);
          $scope.$storage.comments[$scope.activeId - 1].push($scope.myComment);
          console.log($scope.$storage.comments);
          shift = false;
          $('#commInp').val("");
          for (var index = 0; index <= $scope.$storage.comments[$scope.activeId - 1].length; index++) {
            if (index % 2 == 0 || index == 0) {
              $('#box' + index).addClass('box1');
              $('#box' + index).removeClass('box2');
            } else {
              $('#box' + index).addClass('box2');
              $('#box' + index).removeClass('box1');
            }
          }
        }
      }
    }

    $scope.remove = function (event) {
      var remIndex = event.target.id.substr(6);
      $('#item'+remIndex).remove();
    }
  });
