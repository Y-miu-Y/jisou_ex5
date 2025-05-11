# ベースイメージとしてNode.jsを使用
FROM node:18-slim

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# 環境変数を設定
ENV HOST=0.0.0.0
ENV PORT=5173

# 開発用サーバの起動
CMD ["npm", "run", "dev"]