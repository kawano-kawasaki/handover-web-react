# HandoverWeb

## 概要
このプロジェクトは、研究室での引き継ぎを目的としたWebアプリケーションです。

---

## 動作環境
- Node.js:v22.19.0

---

## セットアップ


### 1. リポジトリをクローン
```
git clone https://github.com/kawano-kawasaki/handover-web-react.git
cd handover-web-react
```

### 2. 依存関係をインストール
```
npm install
```

### 3. 環境変数の設定
ルートディレクトリに```.env```ファイルを作成してください。
サンプルは```.env.example```を参考にしてください。
```
REACT_APP_DATA_GET_URL=your_get_api_endpoint
REACT_APP_DATA_POST_URL=your_post_api_endpoint
```

---

## 起動
```
npm start
```
