const filmes = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Review de filmes</h1>
        <p>
          Este é um site é para você salvar e avaliar seus filmes favoritos!
        </p>

        <p>
          Filmes Cadastrar ficam temporariamente guardados em Reviews.
        </p>

        <div class="contador">
          Filmes Cadastrados nesta sessão: <strong>${filmes.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar FIlmes</button>
          <button class="botao secundario" id="btnVerReviews">Ver Reviews</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerReviews")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Filmes</h1>

        <form id="formAluno">
          <div class="campo">
            <label for="nome">Filme</label>
            <input id="nome" type="text" placeholder="Digite o nome do filme" required />
          </div>

          <div class="campo">
            <label for="curso">Avaliação</label>
            <input id="curso" type="text" placeholder="Digite sua avaliação sobre este filme" required />
          </div>

          <div class="campo">
            <label for="matricula">Nota final</label>
            <input id="matricula" type="text" placeholder="Uma nota de 0 a 10" required />
          </div>

          <button class="botao" type="submit">Salvar Filme</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formAluno").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const curso = document.querySelector("#curso").value.trim();
        const matricula = document.querySelector("#matricula").value.trim();

        filmes.push({
          nome,
          curso,
          matricula
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Filme cadastrado com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de filmes</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de filmes.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (filmes.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum Filme cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      filmes.forEach((aluno, indice) => {
        linhas += `
          <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.matricula}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Filme</th>
              <th>Avaliação</th>
              <th>Nota Final</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          filmes.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Somos um site destinado a registrar suas Reviews dos seus filmes favoritos.
        </p>
        <p>
          Site feito de fãs pra fãs.
        </p>
        <p>
          O projeto foi feito sem fins lucrativos, apenas para a diversão do usuário. Espero que tenha gostado <:
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();