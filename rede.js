/* =====================================================================
   Portal Tchê TV — dados da rede
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para mudar preços,
   telas, pontos ou combos. Todo o resto do site lê daqui.
   ===================================================================== */

const CONTATO = {
  whatsapp: "5554991887479",          // só números, com 55 na frente
  whatsappExibicao: "54 9 9188-7479",
  site: "www.portaltche.com.br",
  endereco: "Ed. Vicenso · Av. Severiano de Almeida, 470, SL 303 · Centro · Getúlio Vargas/RS",
  cidade: "Getúlio Vargas · RS"
};

/* Tipos de tela e preços --------------------------------------------
   mensal    = valor de tabela, sem contrato
   semestral = plano de 6 meses
   anual     = plano de 12 meses
------------------------------------------------------------------- */
const TIPOS = {
  i32: { nome: 'Tela interna 32"',  curto: 'interna 32"',  desc: "Ambiente interno do estabelecimento", mensal: 70,  semestral: 63,  anual: 55  },
  v50: { nome: 'Tela vitrine 50" e 55"', curto: 'vitrine 50"', desc: "Voltada para a rua, visível da calçada", mensal: 120, semestral: 108, anual: 95  },
  v65: { nome: 'Tela vitrine 65"',  curto: 'vitrine 65"',  desc: "Maior formato, máxima visibilidade",     mensal: 219, semestral: 197, anual: 169 }
};

const PLANOS = [
  { id: "mensal",    nome: "Mensal",    sub: "Sem contrato · renovação livre" },
  { id: "semestral", nome: "Semestral", sub: "6 meses · preço travado" },
  { id: "anual",     nome: "Anual",     sub: "12 meses · melhor valor da tabela", destaque: true }
];

/* Pontos da rede ----------------------------------------------------
   telas: lista de ids de tela (únicos), cada uma com o tipo
------------------------------------------------------------------- */
const PONTOS = [
  {
    id: "loterica",
    nome: "Lotérica Pé Quente",
    categoria: "Casa lotérica",
    destaque: "Única casa lotérica da cidade",
    publico: "Público parado na fila, com tempo esperando sua hora na fila. O ponto de maior constância da rede.",
    entrega: "constância",
    telas: [ { id: "loterica-i32", tipo: "i32" }, { id: "loterica-v65", tipo: "v65" } ]
  },
  {
    id: "labodega",
    nome: "La Bodega",
    categoria: "Restaurante",
    destaque: "Maior tempo de permanência da rede",
    publico: "Público sentado por 60 a 90 minutos. É onde a mensagem é lida, não só vista.",
    entrega: "atenção",
    telas: [ { id: "labodega-i32", tipo: "i32" } ]
  },
  {
    id: "menplace",
    nome: "Men Place Barbearia",
    categoria: "Vitrine para a rua",
    destaque: "Dois picos de movimento por dia",
    publico: "Vitrine voltada para a rua, no trecho de maior circulação do centro. Volume de passagem.",
    entrega: "volume",
    telas: [ { id: "menplace-v50", tipo: "v50" } ]
  },
  {
    id: "mobilis",
    nome: "Móbilis Academia",
    categoria: "Academia",
    destaque: "A mesma pessoa, 3 a 5 vezes por semana",
    publico: "Frequência altíssima. Ideal para marcas que precisam ser lembradas, não descobertas.",
    entrega: "frequência",
    telas: [ { id: "mobilis-i32", tipo: "i32" } ]
  },
  {
    id: "imperatriz",
    nome: "Imperatriz Frutas",
    categoria: "Hortifrúti",
    destaque: "Compra recorrente, na avenida principal",
    publico: "Fluxo diário de compra rápida na Av. Severiano de Almeida.",
    entrega: "recorrência",
    telas: [ { id: "imperatriz-i32", tipo: "i32" } ]
  },
  {
    id: "scarquitetura",
    nome: "SC Arquitetura",
    categoria: "Vitrine para a rua",
    destaque: "Público de decisão de obra e reforma",
    publico: "Vitrine na R. Sen. Salgado Filho. Público de classe A/B em momento de projeto.",
    entrega: "volume",
    telas: [ { id: "scarquitetura-v50", tipo: "v50", rotulo: 'vitrine 55"' } ]
  }
];

/* Combos por segmento ----------------------------------------------- */
const COMBOS = [
  {
    id: "saude", nome: "Saúde e bem-estar",
    para: "Clínicas, farmácias, laboratórios, dentistas, óticas, nutrição, fisioterapia",
    telas: ["loterica-i32", "loterica-v65", "mobilis-i32", "imperatriz-i32"]
  },
  {
    id: "alimentacao", nome: "Alimentação",
    para: "Mercados, açougues, padarias, hortifrúti, distribuidoras, delivery, bebidas",
    telas: ["loterica-i32", "loterica-v65", "imperatriz-i32"]
  },
  {
    id: "varejo", nome: "Varejo e moda",
    para: "Lojas de roupa, calçados, acessórios, presentes, papelaria, celulares, eletro",
    telas: ["menplace-v50", "scarquitetura-v50", "loterica-v65"]
  },
  {
    id: "servicos", nome: "Serviços e finanças",
    para: "Contabilidade, advocacia, seguros, consórcio, crédito, despachante, cartório, TI",
    telas: ["loterica-i32", "loterica-v65", "labodega-i32", "scarquitetura-v50"]
  },
  {
    id: "casa", nome: "Casa e construção",
    para: "Material de construção, móveis, marcenaria, tintas, vidraçaria, elétrica, imobiliárias",
    telas: ["scarquitetura-v50", "menplace-v50", "loterica-v65", "loterica-i32"]
  },
  {
    id: "lazer", nome: "Lazer e educação",
    para: "Eventos, cursos, escolas, autoescola, turismo, esporte, igrejas, entretenimento",
    telas: ["labodega-i32", "mobilis-i32", "imperatriz-i32", "menplace-v50", "loterica-v65"]
  }
];

/* Índice de Visibilidade --------------------------------------------
   Valores de 0 a 100, relativos ao pico de cada ponto.
   null = fechado / sem exibição naquela hora
------------------------------------------------------------------- */
const IVP = {
  rede: {
    horas: [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    series: [
      { nome: "Vitrine Men Place", cor: "#16181c", tracejado: false,
        dados: [null,null,24,38,48,60,57,42,50,65,84,100,94,66,null,null,null,null] },
      { nome: "Móbilis Academia", cor: "#1f7a4d", tracejado: [6,4],
        dados: [38,50,55,52,44,null,null,null,40,52,64,82,100,82,54,null,null,null] },
      { nome: "La Bodega", cor: "#be1c26", tracejado: [2,3],
        dados: [null,null,null,null,null,68,82,64,null,null,null,null,45,78,100,94,69,41] }
    ]
  },
  loterica: {
    horas: [8,9,10,11,12,13,14,15,16,17,18,19],
    series: [
      { nome: "Dia útil", cor: "#be1c26", tracejado: false,
        dados: [30,45,63,63,46,50,62,75,75,75,52,28] },
      { nome: "Fim de semana", cor: "#8d9298", tracejado: [6,4],
        dados: [26,38,48,52,42,52,64,70,68,60,38,null] }
    ]
  }
};

/* ------------------------------------------------------------------
   Funções de cálculo — não precisa mexer
------------------------------------------------------------------- */
const TODAS_TELAS = PONTOS.flatMap(p =>
  p.telas.map(t => ({ ...t, pontoId: p.id, pontoNome: p.nome, ...TIPOS[t.tipo],
                      curto: t.rotulo || TIPOS[t.tipo].curto }))
);

function telaPorId(id) { return TODAS_TELAS.find(t => t.id === id); }

function calcular(idsTelas) {
  const telas = idsTelas.map(telaPorId).filter(Boolean);
  const soma = plano => telas.reduce((acc, t) => acc + t[plano], 0);
  const mensal = soma("mensal");
  const semestral = soma("semestral");
  const anual = soma("anual");
  return {
    telas, qtd: telas.length,
    mensal, semestral, anual,
    economiaMes: mensal - anual,
    economiaAno: (mensal - anual) * 12,
    porTela: telas.length ? Math.round(anual / telas.length) : 0,
    porDia: anual / 30,
    descontoPct: mensal ? Math.round((1 - anual / mensal) * 100) : 0
  };
}

const brl = v => "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
