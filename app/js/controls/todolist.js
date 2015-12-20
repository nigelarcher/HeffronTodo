
skate('todolist'), {
	created: function(element) {
		element.innerHTML = "<div class='todolist'><ul <li ng-repeat='todo in todos'><todoitem></todoitem></ul><div>";
	}
}