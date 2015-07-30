var models = require('../models/models.js');

// Autoload - factoriza el codigo si la ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.find({
			where: { id: Number(quizId)},
			include: [{ model: models.Comment}]
	}).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}
		else{
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error){
		next(error);
	});
}

// GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build({ // crea objeto quiz
		pregunta: "Pregunta",
		respuesta: "Respuesta",
		categoria: "Otro"
	});
	res.render('quizes/new',{quiz: quiz, errors: []});
}

// POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);
	console.log(quiz.pregunta + " " + quiz.categoria);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{quiz: quiz, errors: err.errors});
		}
		else{
			// guarda en DB los campos pregunta y respuesta de quiz
			quiz.save({fields: ["pregunta","respuesta","categoria"]}).then(function(){
				res.redirect('/quizes');
			}); // Redireccion HTTP(URL relativo) a lista de preguntas
		}
	});
}

//GET /quizes/:id/edit
exports.edit = function(req,res){
	var quiz = req.quiz // autoload de la instancia de quiz
	res.render('quizes/edit',{quiz: quiz,errors: []});
}

// PUT /quizes/:id
exports.update = function(req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.categoria = req.body.quiz.categoria;

	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
		}
		else{ // save: guarda los campos pregunta y respuesta en DB
			req.quiz.save({fields: ["pregunta","respuesta","categoria"]}).then(function(){
				res.redirect('/quizes'); // Redireccion HTTP a la lista de preguntas(Url relativo)
			});
		}
	});
}

// DELETE /quizes/:id
exports.destroy = function(req,res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){
		next(error);
	});
}

// GET /quizes
exports.index = function(req,res){
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		});
}

// GET /quizes/:id
exports.show = function(req,res){
	res.render('quizes/show',{quiz: req.quiz, errors: []});
}

// GET /quizes/:id/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
}
