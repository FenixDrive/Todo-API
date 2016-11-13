var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1, 
	description: 'Meet dad for dinner',
	completed: false
}, {
	id: 2, 
	description: 'Go to the supermarket',
	completed: false
}, {
	id: 3, 
	description: 'Download Postman',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//GET -Used commonly /todos - The URL
app.get('/todos', function (req, res) {
	//Now converting to JSON
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10); //You'll always want 10 unless you're using binary or hexidecimal

	// Iterate over todo arrays. Find the match.
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todoId === todo.id) { //Must use three = signs /Originall used todos instead of todo
				matchedTodo = todo;
		}
	}); 

		if (matchedTodo) {
			res.json(matchedTodo);
		} else { 
			res.status(404).send();
		}
});
//Original mistakes were not having a / in front of todos and using paramas instead of paramas


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});