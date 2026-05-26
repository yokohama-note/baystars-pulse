const buzzItems = [
  {
    title: "石田裕太郎の好投",
    body: "5/24の6回無失点で、先発ローテの安定材料として注目。試合後コメントや現地写真も追いやすい話題です。",
    links: [
      ["X検索", "https://x.com/search?q=%E7%9F%B3%E7%94%B0%E8%A3%95%E5%A4%AA%E9%83%8E%20DeNA&src=typed_query&f=live"],
      ["ニュース", "https://news.google.com/search?q=%E7%9F%B3%E7%94%B0%E8%A3%95%E5%A4%AA%E9%83%8E%20DeNA"]
    ]
  },
  {
    title: "打線の波",
    body: "直近は完封勝ちと完封負けが近接。スタメン、得点圏、代打起用に関する投稿が増えやすい状態です。",
    links: [
      ["X検索", "https://x.com/search?q=%E3%83%99%E3%82%A4%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%BA%20%E6%89%93%E7%B7%9A&src=typed_query&f=live"],
      ["ニュース", "https://news.google.com/search?q=%E6%A8%AA%E6%B5%9CDeNA%E3%83%99%E3%82%A4%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%BA%20%E6%89%93%E7%B7%9A"]
    ]
  },
  {
    title: "ポケモンベースボールフェスタ",
    body: "5/23・24開催のイベント関連で、グッズ、来場演出、球場写真が投稿されやすいタイミングです。",
    links: [
      ["X検索", "https://x.com/search?q=%E3%83%9D%E3%82%B1%E3%83%A2%E3%83%B3%E3%83%99%E3%83%BC%E3%82%B9%E3%83%9C%E3%83%BC%E3%83%AB%E3%83%95%E3%82%A7%E3%82%B9%E3%82%BF%20DeNA&src=typed_query&f=live"],
      ["公式", "https://www.baystars.co.jp/"]
    ]
  },
  {
    title: "交流戦前の空気",
    body: "5/26からオリックス戦。先発予想、DH起用、交流戦への期待値が次のチェックポイントです。",
    links: [
      ["X検索", "https://x.com/search?q=%E3%83%99%E3%82%A4%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%BA%20%E4%BA%A4%E6%B5%81%E6%88%A6&src=typed_query&f=live"],
      ["日程", "https://npb.jp/bis/teams/calendar_db.html"]
    ]
  }
];

const quickLinks = [
  ["球団公式", "ニュース・試合速報・イベント", "https://www.baystars.co.jp/"],
  ["NPB結果", "公式記録と日程", "https://npb.jp/bis/teams/results_db_index.html"],
  ["スポナビ", "速報、順位、個人成績", "https://baseball.yahoo.co.jp/npb/teams/3/top"],
  ["X: 最新", "ベイスターズの最新投稿", "https://x.com/search?q=%E3%83%99%E3%82%A4%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%BA&src=typed_query&f=live"],
  ["X: 現地", "ハマスタ現地の投稿", "https://x.com/search?q=%E3%83%8F%E3%83%9E%E3%82%B9%E3%82%BF%20%E7%8F%BE%E5%9C%B0&src=typed_query&f=live"],
  ["Google News", "記事ベースで確認", "https://news.google.com/search?q=%E6%A8%AA%E6%B5%9CDeNA%E3%83%99%E3%82%A4%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%BA"]
];

const statusStrip = document.querySelector("#statusStrip");
const latestGameLabel = document.querySelector("#latestGameLabel");
const latestGameScore = document.querySelector("#latestGameScore");
const latestGameSummary = document.querySelector("#latestGameSummary");
const latestGameStatus = document.querySelector("#latestGameStatus");
const metricGrid = document.querySelector("#metricGrid");
const broadcastList = document.querySelector("#broadcastList");
const watchPoints = document.querySelector("#watchPoints");
const updateNote = document.querySelector("#updateNote");
const gameList = document.querySelector("#gameList");
const buzzList = document.querySelector("#buzzList");
const quickLinkList = document.querySelector("#quickLinks");

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${path} を読み込めませんでした (${response.status})`);
  }
  return response.json();
}

function requireFields(data, fields, label) {
  const missing = fields.filter((field) => data[field] === undefined || data[field] === null);
  if (missing.length) {
    throw new Error(`${label} の項目が不足しています: ${missing.join(", ")}`);
  }
}

function renderSummary(summary) {
  requireFields(summary, ["hero", "latestGame", "metrics", "watchPoints", "updateNote"], "summary.json");
  requireFields(summary.hero, ["status"], "summary.json hero");
  requireFields(summary.latestGame, ["label", "score", "status", "summary"], "summary.json latestGame");

  statusStrip.innerHTML = summary.hero.status.map((item) => `<span>${item}</span>`).join("");

  latestGameLabel.textContent = summary.latestGame.label;
  latestGameScore.textContent = summary.latestGame.score;
  latestGameSummary.textContent = summary.latestGame.summary;
  latestGameStatus.textContent = summary.latestGame.status;
  latestGameStatus.className = `badge ${summary.latestGame.status === "WIN" ? "win" : "loss"}`;

  metricGrid.innerHTML = summary.metrics.map((metric) => `
    <article>
      <span class="metric">${metric.label}</span>
      <strong>${metric.value}</strong>
      <p>${metric.description}</p>
    </article>
  `).join("");

  watchPoints.innerHTML = summary.watchPoints.map((point) => `<li>${point}</li>`).join("");
  updateNote.textContent = summary.updateNote;
}

function renderGames(games) {
  if (!Array.isArray(games)) {
    throw new Error("games.json は配列である必要があります");
  }

  gameList.innerHTML = games.map((game) => `
    <article class="game-card">
      <div class="game-card__top">
        <div>
          <span class="date">${game.date}</span>
          <h3>${game.result}</h3>
        </div>
        <span class="badge ${game.status === "WIN" ? "win" : "loss"}">${game.status}</span>
      </div>
      <p>${game.note}</p>
      <div class="chip-row">
        ${game.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderBroadcasts(broadcasts) {
  if (!Array.isArray(broadcasts)) {
    throw new Error("broadcasts.json は配列である必要があります");
  }

  if (!broadcasts.length) {
    broadcastList.innerHTML = `
      <article class="broadcast-card">
        <p>放送予定はまだ登録されていません。</p>
      </article>
    `;
    return;
  }

  broadcastList.innerHTML = broadcasts.map((broadcast) => `
    <article class="broadcast-card">
      <p class="section-kicker">TV</p>
      <h3>${broadcast.game}</h3>
      <strong>${broadcast.channel}</strong>
      <span>${broadcast.channelNumber}</span>
    </article>
  `).join("");
}

function renderBuzz() {
  buzzList.innerHTML = buzzItems.map((item) => `
    <article class="buzz-card">
      <div class="buzz-card__top">
        <h3>${item.title}</h3>
      </div>
      <p>${item.body}</p>
      <div class="chip-row">
        ${item.links.map(([label, href]) => `<a class="chip" href="${href}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderLinks() {
  quickLinkList.innerHTML = quickLinks.map(([label, detail, href]) => `
    <a class="quick-link" href="${href}" target="_blank" rel="noreferrer">
      <strong>${label}<small>${detail}</small></strong>
      <span>開く</span>
    </a>
  `).join("");
}

function setupTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.view;
      document.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === target));
    });
  });
}

function renderSummaryError(error) {
  statusStrip.innerHTML = "<span>データ読込エラー</span>";
  latestGameScore.textContent = "概況データを読み込めませんでした";
  latestGameSummary.textContent = error.message;
  latestGameStatus.textContent = "--";
  latestGameStatus.className = "badge loss";
  metricGrid.innerHTML = `
    <article>
      <span class="metric">確認</span>
      <strong>JSON</strong>
      <p>data/summary.json の場所と内容を確認してください。</p>
    </article>
  `;
  watchPoints.innerHTML = `<li>${error.message}</li>`;
  updateNote.textContent = "data/summary.json の読み込みに失敗しました。";
}

function renderGamesError(error) {
  gameList.innerHTML = `
    <article class="game-card">
      <h3>試合結果を読み込めませんでした</h3>
      <p>${error.message}</p>
    </article>
  `;
}

function renderBroadcastsError(error) {
  broadcastList.innerHTML = `
    <article class="broadcast-card">
      <p>放送予定を読み込めませんでした。data/broadcasts.json を確認してください。</p>
      <p>${error.message}</p>
    </article>
  `;
}

async function init() {
  setupTabs();
  renderBuzz();
  renderLinks();

  loadJson("./data/summary.json")
    .then(renderSummary)
    .catch((error) => {
      renderSummaryError(error);
      console.error(error);
    });

  loadJson("./data/games.json")
    .then(renderGames)
    .catch((error) => {
      renderGamesError(error);
      console.error(error);
    });

  loadJson("./data/broadcasts.json")
    .then(renderBroadcasts)
    .catch((error) => {
      renderBroadcastsError(error);
      console.error(error);
    });
}

init();
