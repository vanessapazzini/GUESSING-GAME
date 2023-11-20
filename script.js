var user;
var numeroSecreto = parseInt(Math.random() * 701);
var chute;
var tentativas = 1;
var maxTentativas = 9;

// Ao iniciar a página
window.onload = () => {
  
  // Variável onde é armazenado uma função, ou seja, quando é chamada o que executa é a função
  enter = (event) => {
    // Verifica se a tecla pressionada é "Enter"
    if (event.key === "Enter") {
   // Se for chama a funçaõ getUserName
    getUserName()
  } 
 }
   
  // Adiciona a variável criada para chamar a função no método keyup do input
    // Então cada vez que o enter for precionado ele "ativa" a função getUserName()
    document.getElementById("input_response").addEventListener("keyup", enter)
}

function getUserName() {
  // Utilizando o metodo removeEventListener removemos a variável enter, que é a variavel que guarda a função que chama getUserName()
  // Pois precisamos adicionar a função application() para cada vez que apertar o enter vá para a proxima tentativa
  document.getElementById("input_response").removeEventListener("keyup", enter)
  console.log('deu certo!')

  // Pega o valor do usuário para colocar ao ganhar o jogo
  user = document.getElementById("input_response").value
  console.log(user)

  // Troca a função do botão ao ser clicado, o que antes chamava a funçao getUserName() agora irá chamar a função application(), para poder clicar e ir para as tentativas
  document.getElementById("ok_button").setAttribute("onclick", "application()")

  // Pega a a tag do label_text;
  let label = document.getElementById("label_text")
  // Altera o texto da tag label_text 
  label.innerHTML = "Digite um número entre 1 e 700"

  // Pega a tag do placeholder do input 
  var input_response = document.getElementById("input_response")
  // Altera o texto do placeholder
  input_response.placeholder = "Digite um número entre 1 e 700"
  // Muda o inputa para aceitar somente números
  input_response.setAttribute("type", "number")

  // Variável onde é armazenado uma função, ou seja, quando é chamada o que executa é a função
  setTimes = (event) => { 
    // Verifica se a tecla pressionada é "Enter"
    if (event.key === "Enter") {
       // Se for chama a função application()
       application()
    }
  }

  // Adiciona a variável criada para chamar a função no método keyup do input (igual feito para a parte de inserir o nome)
  // Então cada vez que o enter for precionado ele "ativa" a função application()
  document.getElementById("input_response").addEventListener("keyup", setTimes)
}

// Remove a função que chama ao apertar o enter, sendo ela a application()
function blockEnter() {
  document.getElementById("input_response").removeEventListener("keyup", setTimes)
}

function application() {

   // Pega a tag do label_text
  let label = document.getElementById("label_text")

  // Converte a string do input para um número
  chute = parseInt(document.getElementById("input_response").value)

   // Verifica se o chute está dentro do intervalo desejado
   if (chute > 700 || chute <=0) {
    // Altera o texto da tag label_text 
    label.innerHTML = "Número invalido! Não foi consumido o número de tentativas."
    return;  // Encerra a função para evitar processamento adicional
  }

  // Incrementa o número de tentativas
  tentativas++

  // Verifica se o chute é igual ao número secreto
  if (chute === numeroSecreto) {
    // Altera o texto da tag label_text
    label.innerHTML= "Ora ora " + user + ", não é que acertou mesmo? Você usou " + (tentativas -1) + "/" + maxTentativas + " de tentativas"

    // Função para que não seja possivel clicar o enter
    blockEnter() 
    // Faz com que o botão seja desativado, impossibilitando de clciar
    document.getElementById('ok_button').setAttribute("disabled", "disabled")
    // Espera 5 segundos para resetar o jogo
    setTimeout(function() {
      // Função que reseta o jogo
      resetGame(label)
    } ,4000)

  } else if (chute > numeroSecreto) {
    // Altera o texto da tag label_text 
    label.innerHTML = "Errou... o número é menor. Você usou " + (tentativas -1) + "/" + maxTentativas + " de tentativas."

  } else if (chute < numeroSecreto) {
    // Altera o texto da tag label_text 
    label.innerHTML = "Errou... o número é maior. Você usou " + (tentativas -1) + "/" + maxTentativas + " de tentativas."
  }

  
  // Verifica se atingiu o número máximo de tentativas
  if (tentativas === (maxTentativas + 1) && chute !== numeroSecreto) {


     // Faz com que o botão seja desativado, impossibilitando de clciar
     document.getElementById('ok_button').setAttribute("disabled", "disabled")
    // Altera o texto da tag label_text
    label.innerHTML = "Fim de jogo. O número correto era " + numeroSecreto + "."
    // Função para que não seja possivel clicar o enter
    blockEnter() 
   
    // Espera 5 segundos para resetar o jogo
    setTimeout(function() {
      // Função que reseta o jogo
      resetGame(label)
    } ,4000) 
    
    
  }
  // Reseta o número informado pelo usuário
  document.getElementById("input_response").value = ""
}
function resetGame(label) 
  // Recarrega a página
  {location.reload()
}
