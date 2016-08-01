'use strict';

angular.module('meanCatalogApp')
  .controller('PartModalCtrl', ['$scope', '$http', 'id', 'FileUploader',
    function ($scope, $http, id, FileUploader) {
      $scope.model = {};

      $scope.imageUploader = new FileUploader({
        url: 'upload_image'
      });

      $scope.imageUploader.filters.push({
        name: 'fileTypeFilter',
        fn: function (item) {
          if (/(image\/).+$/.test(item.type) === true) {
            return true;
          } else {
            alert(item.name + ' неверный тип файла, только изображения')
            return false;
          }
        }
      });

      $scope.pdfUploader = new FileUploader({
        url: 'upload_pdf'
      });

      $scope.pdfUploader.filters.push({
        name: 'fileTypeFilter',
        fn: function (item) {
          if (/(application\/pdf)$/.test(item.type) === true) {
            return true;
          } else {
            alert(item.name + ' неверный тип файла, только документы pdf')
            return false;
          }
        }
      });

      if (id !== 'add') {
        $http.get('/api/part/' + id).then(function (res) {
          $scope.model = res.data;
        });
      }

      function savingDone() {
        $scope.saving = false;
        $scope.$close(true);
      }

      $scope.validate = function (form) {
        for (var error_type in form.$error) {
          for (var error in form.$error[error_type]) {
            if (form.$error[error_type][error].$pristine && form.$error[error_type][error].$setViewValue !== undefined) {
              form.$error[error_type][error].$setViewValue(form.$error[error_type][error].$modelValue);
            }
          }
        }

        return form.$valid; //TODO Работает только в ECMAScript >= 5 Переписать на underscore
      };

      $scope.cancel = function () {
        $scope.$dismiss();
      };

      $scope.imageUploader.onCompleteAll = function () {
        if (!hasErrors($scope.imageUploader.queue))
          $scope.pdfUploader.uploadAll();
      };

      $scope.imageUploader.onErrorItem = function (fileItem) {
        handleItemError(fileItem, 'изображения');
      };

      $scope.pdfUploader.onErrorItem = function (fileItem) {
        handleItemError(fileItem, 'чертежа');
      };

      $scope.pdfUploader.onCompleteAll = function () {
        if (!hasErrors($scope.pdfUploader.queue))
          saveData();
      };

      function handleItemError(fileItem, fileTypeName) {
        $scope.saving = false;
        alert('Ошбка загрузки ' + fileTypeName + ' ' + fileItem.file.name + ' удалите его из очереди загрузки и повторите попытку.');
      }

      function hasErrors(queue) {
        for (var key in queue) {
          if (queue[key].isError)
            return true;
        }

        return false;
      }

      function saveData() {
        if ($scope.model._id) {
          $http.put('/api/part/' + $scope.model._id, $scope.model).then(savingDone());
        } else {
          $http.post('/api/part', $scope.model).then(savingDone());
        }
      }

      $scope.save = function (form) {
        if ($scope.validate(form)) {
          $scope.saving = true;
          if ($scope.imageUploader.queue.length)
            $scope.imageUploader.uploadAll();
          else if ($scope.pdfUploader.queue.length)
            $scope.pdfUploader.uploadAll();
          else
            saveData();
        }
      };
    }]
  );
