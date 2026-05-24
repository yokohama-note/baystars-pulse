const games = [
  {
    date: "5/24 Sun",
    result: "DeNA 1 - 0 ヤクルト",
    status: "WIN",
    note: "石田裕太郎が6回無失点。戸柱の犠飛による1点をブルペンで守り切った試合。",
    tags: ["完封リレー", "横浜", "接戦勝ち"]
  },
  {
    date: "5/23 Sat",
    result: "DeNA 0 - 6 ヤクルト",
    status: "LOSS",
    note: "打線が沈黙。翌日の反発ポイントとして見たい敗戦。",
    tags: ["完封負け", "打線", "切り替え"]
  },
  {
    date: "5/21 Thu",
    result: "広島 3 - 1 DeNA",
    status: "LOSS",
    note: "マツダで終盤まで追う展開。打線のつながりが次の論点に。",
    tags: ["ビジター", "打線"]
  },
  {
    date: "5/20 Wed",
    result: "広島 3 - 4 DeNA",
    status: "WIN",
    note: "接戦を拾った勝利。中継ぎ運用と終盤の粘りを見たい試合。",
    tags: ["1点差", "終盤", "マツダ"]
  },
  {
    date: "5/19 Tue",
    result: "広島 3 - 1 DeNA",
    status: "LOSS",
    note: "カード初戦を落とした試合。先発・竹田の登板内容が確認ポイント。",
    tags: ["ビジター", "カード初戦"]
  }
];

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

const gameList = document.querySelector("#gameList");
const buzzList = document.querySelector("#buzzList");
const quickLinkList = document.querySelector("#quickLinks");

function renderGames() {
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

renderGames();
renderBuzz();
renderLinks();
setupTabs();
