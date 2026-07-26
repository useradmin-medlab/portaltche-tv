/* Portal Tchê TV — lógica compartilhada das duas páginas */

/* ---------- utilidades ---------- */
function linkWhats(texto) {
  return "https://wa.me/" + CONTATO.whatsapp + "?text=" + encodeURIComponent(texto);
}

function montarRodape() {
  const el = document.getElementById("rodape");
  if (!el) return;
  el.innerHTML =
    '<b><a href="https://' + CONTATO.site + '" style="text-decoration:none">' + CONTATO.site + '</a></b>'
    + ' &nbsp;·&nbsp; <b><a href="' + linkWhats("Olá! Quero falar sobre o Portal Tchê TV.") + '" style="text-decoration:none">'
    + CONTATO.whatsappExibicao + '</a></b><br>' + CONTATO.endereco;
}

/* ---------- pontos ---------- */
function montarPontos() {
  const alvo = document.getElementById("pontos");
  if (!alvo) return;
  alvo.innerHTML = PONTOS.map((p, i) => {
    const telas = p.telas.map(t => '<span class="tag on">' + TIPOS[t.tipo].curto + '</span>').join("");
    return `
      <article class="ponto">
        <div class="top">
          <div class="num">${i + 1}</div>
          <div>
            <div class="nm">${p.nome}</div>
            <div class="cat">${p.categoria}</div>
          </div>
        </div>
        <p class="txt">${p.publico}</p>
        <div class="tags">
          ${telas}
          <span class="tag ent">entrega ${p.entrega}</span>
        </div>
      </article>`;
  }).join("");
}

/* ---------- gráficos ---------- */
function montarGrafico(canvasId, legendaId, bloco, teto) {
  const cv = document.getElementById(canvasId);
  if (!cv || typeof Chart === "undefined") return;

  const leg = document.getElementById(legendaId);
  if (leg) {
    leg.innerHTML = bloco.series.map(s =>
      '<span><i style="background:' + s.cor + '"></i>' + s.nome + '</span>'
    ).join("");
  }

  new Chart(cv, {
    type: "line",
    data: {
      labels: bloco.horas.map(h => h + "h"),
      datasets: bloco.series.map(s => ({
        label: s.nome,
        data: s.dados,
        borderColor: s.cor,
        backgroundColor: s.cor,
        borderWidth: 2.2,
        borderDash: s.tracejado || [],
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        spanGaps: false
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: c => c.dataset.label + ": " + Math.round(c.parsed.y) + "%"
          }
        }
      },
      scales: {
        y: {
          min: 0, max: teto,
          ticks: { color: "#8d9298", font: { size: 11 }, stepSize: 20, callback: v => v + "%" },
          grid: { color: "#f0f1f3" },
          border: { display: false }
        },
        x: {
          ticks: { color: "#8d9298", font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 10 },
          grid: { display: false },
          border: { color: "#e3e5e8" }
        }
      }
    }
  });
}

/* ---------- combos ---------- */
function montarCombos() {
  const alvo = document.getElementById("combos");
  if (!alvo) return;
  alvo.innerHTML = COMBOS.map(c => {
    const r = calcular(c.telas);
    const itens = c.telas.map(id => {
      const t = telaPorId(id);
      return '<li><b>&bull;</b><span>' + t.pontoNome + ' · ' + t.curto + '</span></li>';
    }).join("");
    return `
      <article class="combo">
        <div class="nm">${c.nome}</div>
        <div class="para">${c.para}</div>
        <ul>${itens}</ul>
        <div class="pr">
          <div>
            <div class="anc">Tabela <s>${brl(r.mensal)}</s></div>
            <div class="now">${brl(r.anual)} <u>/mês</u></div>
          </div>
          <div class="eco">
            ${brl(r.economiaAno)}<span>de economia/ano</span>
          </div>
        </div>
        <button class="btn ghost" data-combo="${c.id}">Usar este combo no simulador</button>
      </article>`;
  }).join("");

  alvo.querySelectorAll("[data-combo]").forEach(b => {
    b.addEventListener("click", () => {
      const c = COMBOS.find(x => x.id === b.dataset.combo);
      selecionadas = new Set(c.telas);
      renderSimulador();
      const alvoSim = document.getElementById("simulador");
      if (alvoSim && alvoSim.scrollIntoView) {
        alvoSim.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ---------- simulador ---------- */
let selecionadas = new Set();
let planoAtivo = "anual";

function montarSimulador() {
  const lista = document.getElementById("telalist");
  if (!lista) return;

  lista.innerHTML = PONTOS.map(p => p.telas.map(t => {
    const tipo = TIPOS[t.tipo];
    return `
      <li class="telaitem" data-tela="${t.id}">
        <span class="check">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="#fff" stroke-width="2.4"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="info">
          <span class="a">${p.nome}</span>
          <span class="b">${tipo.curto}</span>
        </span>
        <span class="val" data-val="${t.id}"></span>
      </li>`;
  }).join("")).join("");

  lista.querySelectorAll(".telaitem").forEach(li => {
    li.addEventListener("click", () => {
      const id = li.dataset.tela;
      selecionadas.has(id) ? selecionadas.delete(id) : selecionadas.add(id);
      renderSimulador();
    });
  });

  document.querySelectorAll("[data-plano]").forEach(ch => {
    ch.addEventListener("click", () => {
      planoAtivo = ch.dataset.plano;
      renderSimulador();
    });
  });

  const btnTudo = document.getElementById("btn-tudo");
  if (btnTudo) btnTudo.addEventListener("click", () => {
    const todas = TODAS_TELAS.map(t => t.id);
    selecionadas = selecionadas.size === todas.length ? new Set() : new Set(todas);
    renderSimulador();
  });

  renderSimulador();
}

function renderSimulador() {
  const ids = [...selecionadas];
  const r = calcular(ids);

  document.querySelectorAll(".telaitem").forEach(li => {
    li.classList.toggle("on", selecionadas.has(li.dataset.tela));
  });
  document.querySelectorAll("[data-val]").forEach(el => {
    el.textContent = brl(telaPorId(el.dataset.val)[planoAtivo]);
  });
  document.querySelectorAll("[data-plano]").forEach(ch => {
    ch.classList.toggle("on", ch.dataset.plano === planoAtivo);
  });

  const box = document.getElementById("resumo");
  const barVal = document.getElementById("bar-val");
  const barWa = document.getElementById("bar-wa");

  if (!r.qtd) {
    box.innerHTML = '<div class="vazio">Escolha as telas acima para ver o valor.</div>';
    if (barVal) barVal.innerHTML = "—";
    if (barWa) barWa.href = linkWhats("Olá! Quero montar um plano no Portal Tchê TV.");
    return;
  }

  const plural = r.qtd > 1 ? "telas selecionadas" : "tela selecionada";
  box.innerHTML = `
    <div class="qtd">${r.qtd} ${plural}</div>
    <div style="margin-top:10px">
      <div class="linha"><span class="k">Mensal, sem contrato</span><span class="v">${brl(r.mensal)}</span></div>
      <div class="linha"><span class="k">Semestral, 6 meses</span><span class="v">${brl(r.semestral)}</span></div>
      <div class="linha hi"><span class="k">Anual, 12 meses</span><span class="v">${brl(r.anual)}</span></div>
    </div>
    <div class="eco">${brl(r.economiaAno)} de economia no ano com o plano anual</div>
    <div class="dia">Equivale a ${brl(Math.round(r.porDia))} por dia · ${brl(r.porTela)} por tela</div>
  `;

  const valor = r[planoAtivo];
  if (barVal) barVal.innerHTML = brl(valor) + ' <u>/mês</u>';

  if (barWa) {
    const linhas = ids.map(id => {
      const t = telaPorId(id);
      return "• " + t.pontoNome + " — " + t.curto + " — " + brl(t[planoAtivo]);
    }).join("\n");
    const nomePlano = PLANOS.find(p => p.id === planoAtivo).nome;
    barWa.href = linkWhats(
      "Olá! Montei um plano no site do Portal Tchê TV:\n\n" + linhas +
      "\n\nPlano " + nomePlano + ": " + brl(valor) + "/mês (" + r.qtd + " telas)" +
      "\n\nPodemos conversar?"
    );
  }
}
