let rodada = 1;
let jogo = Array(3);

jogo["A"] = Array(3);
jogo["B"] = Array(3);
jogo["C"] = Array(3);

jogo["A"][1] = 0;
jogo["A"][2] = 0;
jogo["A"][3] = 0;

jogo["B"][1] = 0;
jogo["B"][2] = 0;
jogo["B"][3] = 0;

jogo["C"][1] = 0;
jogo["C"][2] = 0;
jogo["C"][3] = 0;
//val() -> funcao que recupera o valor do campo passado
$(document).ready(function () {
  $("#iniciar").click(function () {
    //validar os nomes dos jogadores
    if ($("#jogador1").val() == "") {
      alert("Digite o nome do jogador 1");
      return false;
    }
    if ($("#jogador2").val() == "") {
      alert("Digite o nome do jogador 2");
      return false;
    }

    //Colocando os nomes dos jogadores na tela de jogo
    $("#nomep1").html($("#jogador1").val());
    $("#nomep2").html($("#jogador2").val());

    //iniciando o game
    $("#paginaInicial").hide();
    $("#telaJogo").show();
  });

  //funcionamento do jogo
  $(".jogada").click(function () {
    let idClique = this.id;
    $("#" + idClique).off();
    jogada(idClique);
  });

  function jogada(id) {
    let icone = "";
    let ponto = 0;

    if (rodada % 2 == 1) {
      icone = 'url("./imagens/marcacao_1.png")';
      ponto = -1;
    } else {
      icone = 'url("imagens/marcacao_2.png")';
      ponto = 1;
    }
    rodada++;

    $("#" + id).css("background-image", icone);

    let linhaColuna = id.split("-");

    jogo[linhaColuna[0]][linhaColuna[1]] = ponto;
    verifica();
  }

  //verificação do jogo
  function verifica() {
    //Horizontal
    let pontos = 0;
    for (let i = 1; i <= 3; i++) {
      pontos = pontos + jogo["A"][i];
    }
    ganhador(pontos);

    pontos = 0;
    for (let i = 1; i <= 3; i++) {
      pontos = pontos + jogo["B"][i];
    }
    ganhador(pontos);

    pontos = 0;
    for (let i = 1; i <= 3; i++) {
      pontos = pontos + jogo["C"][i];
    }
    ganhador(pontos);

    //Vertical
    for (let l = 1; l <= 3; l++) {
      pontos = 0;
      pontos += jogo["A"][l];
      pontos += jogo["B"][l];
      pontos += jogo["C"][l];

      ganhador(pontos);
    }

    //diagonais
    pontos = 0;
    pontos = jogo["A"][1] + jogo["B"][2] + jogo["C"][3];
    ganhador(pontos);

    pontos = 0;
    pontos = jogo["A"][3] + jogo["B"][2] + jogo["C"][1];
    ganhador(pontos);
  }

  //ganhador
  function ganhador(pontos) {
    let j1 = $("#jogador1").val();
    let j2 = $("#jogador2").val();

    if (pontos == -3) {
      alert(j1 + " foi o vencedor");
      $(".jogada").off();
    } else if (pontos == 3) {
      alert(j2 + " foi o vencedor");
      $(".jogada").off();
    }
  }
});
