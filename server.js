var express = require('express');
var bodyParser = require('body-parser');
var _  = require('underscore'); //Most people use the _ character for the variable requiring the underscore module

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


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
	var matchedTodo = _.findWhere(todos, {id: todoId}); 



	//The underscore library lets you use multiple functions. To see more checkout underscorejs.org


		//This was the old code
			// Iterate over todo arrays. Find the match.
			// var matchedTodo;

			// todos.forEach(function (todo) {
			// 	if (todoId === todo.id) { //Must use three = signs /Originall used todos instead of todo
			// 			matchedTodo = todo;
			// 	}
			// }); 



		if (matchedTodo) {
			res.json(matchedTodo);
		} else { 
			res.status(404).send();
		}
});
//Original mistakes were not having a / in front of todos and using paramas instead of paramas


//new http method to add data to todos
//POST /todos/:id

app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');  //Use _.pick to only pick description and completed

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){ 
		return res.status(400).send();
	}

	// set body.description to be trimmed value
	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);

	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});