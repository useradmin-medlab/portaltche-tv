# Portal Tchê TV — site da rede

Site de duas páginas para apresentar a rede de mídia indoor de Getúlio Vargas/RS
e montar orçamento na hora.

- **`index.html`** — a rede: os 6 pontos, o mapa e os gráficos do Índice de Visibilidade
- **`planos.html`** — tabela por tela, simulador de orçamento e combos por segmento

Feito para celular. O cliente abre pelo WhatsApp, marca as telas que quer, vê o valor
e devolve o resumo pronto na conversa.

---

## Publicar no GitHub Pages

### 1. Criar o repositório

No GitHub, clique em **New repository**. Nome sugerido: `portaltche-tv`.
Deixe **Public** e não marque nenhuma opção de inicialização.

### 2. Subir os arquivos

A forma mais simples, sem instalar nada: na página do repositório vazio, clique em
**uploading an existing file** e arraste **o conteúdo desta pasta** — não a pasta em si.
Devem ir para a raiz do repositório:

```
index.html
planos.html
README.md
.nojekyll

data/
```

Clique em **Commit changes**.

### 3. Ligar o Pages

No repositório: **Settings → Pages**.
Em *Source*, escolha **Deploy from a branch**; em *Branch*, escolha **main** e a pasta **/ (root)**.
Salve.

Em um ou dois minutos o site fica no ar em:

```
https://SEU-USUARIO.github.io/portaltche-tv/
```

Esse é o link para mandar no WhatsApp.

### 4. Domínio próprio (opcional)

Se quiser usar algo como `tv.portaltche.com.br`:
crie um arquivo chamado `CNAME` na raiz do repositório com essa linha dentro,
e no painel do seu domínio aponte um registro `CNAME` para `SEU-USUARIO.github.io`.

---

## Mudar preços, telas ou combos

**Você só precisa mexer em um arquivo: `rede.js`.**

Todo o site — tabela, simulador, combos, barra do rodapé — lê os números daí.
Não existe valor escrito à mão em nenhuma página.

### Trocar um preço

Procure o bloco `TIPOS` e mude o número:

```js
const TIPOS = {
  i32: { ... mensal: 70,  semestral: 63,  anual: 55  },
  v50: { ... mensal: 120, semestral: 108, anual: 95  },
  v65: { ... mensal: 219, semestral: 197, anual: 169 }
};
```

Salve e o site inteiro se atualiza sozinho, inclusive os totais dos combos.

### Adicionar um ponto novo

No bloco `PONTOS`, copie um ponto existente e ajuste. Cada tela precisa de um `id` único:

```js
{
  id: "zat",
  nome: "Zat Supermercados",
  categoria: "Supermercado",
  destaque: "Fila de caixa",
  publico: "Descrição curta de quem passa por ali.",
  entrega: "volume",
  telas: [ { id: "zat-i32", tipo: "i32" } ]
}
```

Se uma tela tem tamanho diferente mas o mesmo preço da faixa, use `rotulo` na tela
para sobrescrever só o texto exibido — o preço continua o da faixa.
Ex.: a SC Arquitetura é 55" e usa a faixa `v50`:

```js
telas: [ { id: "scarquitetura-v50", tipo: "v50", rotulo: 'vitrine 55"' } ]
```

### Criar ou mudar um combo

No bloco `COMBOS`, liste os `id` das telas:

```js
{
  id: "pet", nome: "Pet e veterinária",
  para: "Pet shops, clínicas veterinárias, banho e tosa, rações",
  telas: ["loterica-i32", "loterica-v65", "imperatriz-i32"]
}
```

Os valores são calculados sozinhos.

### Ajustar as curvas do índice

No bloco `IVP`. Cada série é uma lista de valores de 0 a 100, um para cada hora.
Use `null` nas horas em que o ponto está fechado.

---

## O que ainda precisa da sua confirmação

Estes pontos foram preenchidos com suposição e valem uma conferida antes de divulgar o link:

- **WhatsApp** — está `5554991887479` em `rede.js`. Confira o número.
- **Curvas do índice** — a da lotérica é estimativa própria; as outras partem de dados
  públicos de movimento com ajuste manual. A nota de rodapé do site já explica isso.
- **Foto dos pontos** — hoje o site mostra só o mapa. Se você tiver foto de cada tela
  instalada, elas melhoram muito a conversão. Basta colocar em `` e me avisar.

---

## Rodar no seu computador antes de publicar

Não precisa de servidor: abra `index.html` com duplo clique.
Se quiser servir localmente com Python:

```bash
python3 -m http.server 8000
```

E acesse `http://localhost:8000`.

---

## Dependências

Só uma, carregada por CDN: [Chart.js](https://www.chartjs.org/) para os gráficos.
Fontes Lora e Lato vêm do Google Fonts. Nenhum build, nenhum framework, nenhum `npm install`.
