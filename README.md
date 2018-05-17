# hamakita-crowds-2018

**今年もやってきた！炎上する開発！動かないシステム！その名も「はまきたクラウズ」だ！！**

## ビルド関係

``` bash
# 依存関係のダウンロード
yarn install

# ローカルサーバーの起動(宗教上の理由で8080ポートでおっ立つよ！)
yarn dev

# 本番環境のビルド
npm run build

# テスト駆動開発にするほどのことでも無かったので、以下のコマンドは動きません
npm run unit
npm run e2e
npm test
```

## 勘の良いガキは気づくだろうが

内部で `firebase.key.js` というモジュールを読み込んでいます。これは名前の通り、firebaseの認証キーが書いてあるもの。見せられないよ！

```javascript
export default {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXX.firebaseapp.com",
  databaseURL: "https://XXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXX"
}
```
こんな感じで同名ファイルを作って上げると動くには動くはずです。

ユーザー登録をfirebaseコンソールでよしなにやって、よしなにログインしてよしなに情報を登録するとよしなに動くはずです。

え？動かない？それは開発が追いついていないだけだよ！
