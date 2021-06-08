let login_usuario;
let nome_usuario;
let id_usuario;
let username_usuario;

let tiposDeEntretrenimento = ["Filmes", "Séries", "Doramas", "Animes"];
let animes = ["Kaichou wa maid-sama", "Kimi ni todoke", "Sakura card captors", "Spacial A", "Inuyasha", "Angels beats"];
let doramas = ["1% de alguma coisa", "Playfull kiss", "Vicenzo"];
let series = ["Breaking bad", "Lost", "How I met your mother", "Friends", "Modern family", "Stranger things"];
let filmes = ["A natureza selvagem", "De repente 30", "Orgulho e preconceito"];


function redirecionar_login() {
    window.location.href = 'index.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;
    id_usuario = sessionStorage.id_usuario_meuapp;
    username_usuario = sessionStorage.username_usuario_meuapp;
    console.log(id_usuario,nome_usuario);
    
    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
        troca_nome.innerHTML = nome_usuario;
        validar_sessao();
    }
    
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {cache:'no-store'}); 
}