var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Chamado = require('../models').Chamado;
var Titulo = require('../models').Titulo;


let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from usuario where login='${login}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({
		nome : req.body.nome,
		dataNascimento : req.body.dataNascimento,
		username: req.body.username,
		login : req.body.login,
		senha: req.body.senha
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/cadastrar_chamado/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idUsuario = req.params.idUsuario;

    Chamado.create({
        titulo: req.body.titulo,
		descricao: req.body.descricao,
        fkUsuario: idUsuario
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})


/* RECUPERA OS CHAMADOS DO USUÁRIO LOGADO */
/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/listar_chamado/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.idUsuario;

    let instrucaoSql = ` SELECT titulo, descricao, dataChamado, situacao FROM Chamado WHERE fkUsuario = ${idUsuario}`;

	sequelize.query(instrucaoSql, {
		model: Chamado,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* ROTA QUE RECUPERA OS ANIMES */
router.get('/listar_animes', function(req, res, next) {
	console.log('Recuperando todas as publicações');

    let instrucaoSql = ` SELECT * FROM titulo WHERE fkTipoDeEntretenimento = (SELECT idTipoDeEntretenimento FROM TipoDeEntretenimento WHERE nome = 'Animes');`;

	sequelize.query(instrucaoSql, {
		model: Titulo,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* ROTA QUE RECUPERA OS doramas */
router.get('/listar_doramas', function(req, res, next) {
	console.log('Recuperando todas as publicações');

    let instrucaoSql = ` SELECT * FROM titulo WHERE fkTipoDeEntretenimento = (SELECT idTipoDeEntretenimento FROM TipoDeEntretenimento WHERE nome = 'Doramas');`;

	sequelize.query(instrucaoSql, {
		model: Titulo,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* ROTA QUE RECUPERA OS filmes */
router.get('/listar_filmes', function(req, res, next) {
	console.log('Recuperando todas as publicações');

    let instrucaoSql = ` SELECT * FROM titulo WHERE fkTipoDeEntretenimento = (SELECT idTipoDeEntretenimento FROM TipoDeEntretenimento WHERE nome = 'Filmes');`;

	sequelize.query(instrucaoSql, {
		model: Titulo,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* ROTA QUE RECUPERA OS series */
router.get('/listar_series', function(req, res, next) {
	console.log('Recuperando todas as publicações');

    let instrucaoSql = ` SELECT * FROM titulo WHERE fkTipoDeEntretenimento = (SELECT idTipoDeEntretenimento FROM TipoDeEntretenimento WHERE nome = 'Séries');`;

	sequelize.query(instrucaoSql, {
		model: Titulo,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* Verificação de usuário */
router.get('/sessao/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
