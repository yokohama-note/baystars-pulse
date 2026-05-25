# BAYSTARS Pulse

横浜DeNAベイスターズの直近状況をスマホで確認するための静的Webサイトです。

このサイトは横浜DeNAベイスターズを応援する個人運営の非公式ファンサイトです。球団、NPB、関連企業とは関係ありません。掲載内容は公開情報をもとに作成しており、正確な公式情報は球団公式サイト・NPB公式記録をご確認ください。

## 更新データ

毎日更新しやすいように、試合概況、直近試合結果、放送予定は以下のJSONに分けています。

- `data/summary.json`
- `data/games.json`
- `data/broadcasts.json`

放送予定はトップページに表示されます。家でチャンネルを探しやすいように、`game`、`channel`、`channelNumber` だけを表示します。

## 公開

GitHub Pagesで `index.html` を公開できます。
