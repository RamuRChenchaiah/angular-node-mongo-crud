var MyTasks = angular.module('MyTasks', []);

function taskController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all tasks and show them
	$http.get('/api/tasks')
		.success(function(data) {
			$scope.tasks = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/tasks', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.tasks = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/tasks/' + id)
			.success(function(data) {
				$scope.tasks = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
