'use strict';

// I am planning to move this into the controller file, but just to get this going I am going to use a simple method of defining the controller.
// I will come back to this once I get the skate working as I expect


function TodoController($scope) {
  
  $scope.todos = [
		{text: 'Build Node Server', done:true},   
		{text: 'Build Angular Framework', done:true},         
		{text: 'Wire up SASS Compiler', done:true},    
		{text: 'Integratoin Skate Controller', done:true},
		{text: 'Search the net for examples on Skate usage.', done:true},
		{text: 'watch 1 hour pod cast on skate hoping for some usage examples.', done:true},
		{text: 'Connect Skate input to Angular module', done:true},
		{text: 'Connect Skate output/events to Angular model', done:false},
		{text: 'Implement filter', done:false},
		{text: 'Connect to Node backend', done:false},
		{text: 'Cleanup styles', done:false},
		{text: 'Write unit tests', done:false}
	];
  
	$scope.getTotalTodos = function () {
		var done = 0;
		for(var i =0;i<$scope.todos.length;i++)
		{
			if(!$scope.todos[i].done)
			{
				done++;
			}
		
		}
		return done;
	};
  
  
	$scope.addTodo = function () {
		$scope.todos.push({text:$scope.formTodoText, done:false});
		$scope.formTodoText = '';
	};
}

// This is more than likely not the correct use of skate, but after 8 hours of searching I have not found a single example
// of how to use the library online, and therefore I am making a best guess based on the one page usage guide, and hints in the
// podcast featuring skate

// For example, no where is the the skate properties that I am providing the values to be displayed linked back through obervables (that I can tell) to let Angular know the value
// has changed, nor have I passed the scope, or the model to the skate component, so direct multipluation of the model is not easily possible either.

// long and short, I know I have missed something here, but the low level of documentation, and the lack of a user base, leads to having to make guesses about the intended use of the framework
// just ONE example online would have been likely enough to give me the hints I needed, but hours of searching did not turn up a single use example.

skate('todolist', {
	render: function(element) {
		element.innerHTML = "<div class='todolist'><ul><li ng-repeat='todo in todos | filter:searchText | filter:displayMode'><todoitem complete={{todo.done}} text={{todo.text}}></todoitem></ul><div>";
	}
});

skate('todoitem', {
	render: function(element) {
		var html = '<div class="completedIndicator ';
		if((typeof element.complete === 'string' && element.complete == 'true') ||  (typeof element.complete === 'boolean' && element.complete))
			html += 'completed"><i class="fa fa-check"></i>';
		else
			html += 'notcompleted"><i class="fa fa-clock-o"></i>';
		html += '</div><span class="done-'+element.complete+'"> '+element.text+'</span>';
		element.innerHTML = html;
	},
	properties: {
		complete: {
			attribute: true,
			set: function (element, change) {
				skate.render(element);
			}
		},
		text: {
			attribute: true,
			set: function (element, change) {
				skate.render(element);
			},	
		}
	},
	events:
	{
		'click': function(e){
				this.complete = !this.complete;
				skate.render(this);
				skate.emit(this, 'completed', {completed: this.complete} );
		}
	}
	
});