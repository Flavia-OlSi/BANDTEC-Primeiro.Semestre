-- Criando o banco de dados
CREATE DATABASE projetoIndiviadual;

-- Usando o banco de dados
USE projetoIndividual;

-- Criando tabela Tipo de usuario
CREATE TABLE TipoDeUsuario (
	idTipo			INT PRIMARY KEY AUTO_INCREMENT,
    identificacao	VARCHAR(20)
);

-- Criando tabela Usuario
CREATE TABLE Usuario (
	idUsuario			INT PRIMARY KEY AUTO_INCREMENT,
    nome				VARCHAR(100),
    sobrenome			VARCHAR(100),
    username			VARCHAR(20),
    dataNascimento		VARCHAR(100),
    senha				VARCHAR(15),
	fkTipo				INT,
    FOREIGN KEY (fkTipo) REFERENCES TipoDeUsuario (idTipo)
);

-- Criando tabela Comunidade
CREATE TABLE Comunidade (
	idComunidade	INT PRIMARY KEY AUTO_INCREMENT,
    nome			VARCHAR(45)
);

-- Criando tabela Comunidade usuario
CREATE TABLE ComunidadeUsuario (
	fkComunidade	INT,
    FOREIGN KEY (fkComunidade) REFERENCES Comunidade (fkComunidade),
    fkUsuario		INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario),
    PRIMARY KEY (fkComunidade, fkUsuario)
);

-- Criando tabela Subcomunidade
CREATE TABLE Subcomunidade (
	idSubcomunidade		INT PRIMARY KEY AUTO_INCREMENT,
    nome				VARCHAR(50),
    descricao			VARCHAR(500),
    fkComunidade		INT,
    FOREIGN KEY (fkComunidade) REFERENCES Comunidade (idComunidade)
);

-- Criando tabela Post
CREATE TABLE Post (
	idPost	INT PRIMARY KEY AUTO_INCREMENT,
    fkSubcomunidade INT,
    FOREIGN KEY (idSubcomunidade) REFERENCES Subcomunidade (idSubcomunidade)
);

-- Criando tabela Comentario
CREATE TABLE Comentario (
	idComentario			INT PRIMARY KEY AUTO_INCREMENT,
    comentario				VARCHAR(1000),
    idComentarioResposta	INT,
    fkPost					INT,
    FOREIGN KEY (fkPost) REFERENCES Post (idPost)
);


    
    
    