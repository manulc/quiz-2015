var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);

router.get('/author',function(req,res){
  res.render('author',{ 
	nombre: 'Manuel L. Cora',
	imagenWidth: 75,
	imagenHeight: 75,
	imagenUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRVa6w4um92HhzFPWrZxGpht51tQwLeTI9bDWZswCaiUPwW-NUKRA'
  });
});

module.exports = router;
