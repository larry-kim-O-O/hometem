# ホームテム - Amazon アフィリエイトサイト

SEO 最適化された Amazon アフィリエイトサイトのテンプレートです。Tailwind CSS を使用したモダンなデザインと、効率的なコンテンツ管理を実現しています。

## 🚀 特徴

- **SEO 最適化**: 構造化データ、メタタグ、サイトマップ自動生成
- **レスポンシブデザイン**: モバイル・タブレット・PC 対応
- **高速読み込み**: Tailwind CSS、最適化された画像
- **アフィリエイト対応**: Amazon アソシエイト規約準拠
- **テンプレートシステム**: 簡単な商品ページ作成

## 📁 ディレクトリ構造

```
homutemu_site/
├── assets/                 # CSS、JS、画像ファイル
│   ├── main.css           # カスタムCSS
│   ├── main.js            # JavaScript機能
│   └── logo.png           # サイトロゴ
├── partials/              # 共通コンポーネント
│   ├── header.html        # ヘッダー
│   └── footer.html        # フッター
├── templates/             # テンプレート
│   └── item-template.html # 商品ページテンプレート
├── products/              # 商品ページ
│   └── cool-summer-mat/   # サンプル商品ページ
├── posts/                 # 記事ページ
├── categories/            # カテゴリーページ
├── policy/                # ポリシーページ
├── scripts/               # ユーティリティスクリプト
│   └── update-sitemap.js  # サイトマップ自動生成
├── index.html             # ホームページ
├── robots.txt             # 検索エンジン設定
└── sitemap.xml            # サイトマップ
```

## 🛠️ セットアップ

### 1. 基本設定

1. `assets/main.css`の Google Fonts URL を確認
2. `scripts/update-sitemap.js`の BASE_URL を実際のドメインに変更
3. `robots.txt`の Sitemap URL を更新

### 2. 新しい商品ページの作成

#### 方法 1: テンプレートを使用

1. `templates/item-template.html`をコピー
2. 以下の変数を置換：
   - `<!-- PRODUCT_TITLE -->`: 商品タイトル
   - `<!-- PRODUCT_DESCRIPTION -->`: 商品説明
   - `<!-- PRODUCT_SLUG -->`: URL スラッグ
   - `<!-- PRODUCT_IMAGE_URL -->`: 商品画像 URL
   - `<!-- AMAZON_AFFILIATE_LINK -->`: Amazon アフィリエイトリンク
   - `<!-- PRODUCT_BRAND -->`: ブランド名
   - `<!-- PRODUCT_CATEGORY -->`: カテゴリースラッグ
   - `<!-- CATEGORY_NAME -->`: カテゴリー名

#### 方法 2: サンプルページを参考

`products/cool-summer-mat/index.html`を参考に、新しい商品ページを作成してください。

### 3. 画像の設定

- **メイン画像**: `https://via.placeholder.com/800x600` (800x600px 推奨)
- **サムネイル画像**: `https://via.placeholder.com/300x200` (300x200px 推奨)
- **実際の画像**: 準備できたら placeholder URL を実際の画像 URL に置換

## 📝 コンテンツ作成ガイド

### 商品ページの構成

1. **ヘッダー部分**

   - パンくずリスト
   - 商品タイトル（H1）
   - 商品説明

2. **商品情報**

   - メイン画像
   - 商品特徴リスト
   - Amazon リンク

3. **コンテンツ**
   - 選び方ポイント
   - ランキング・比較
   - 関連商品
   - FAQ
   - 免責事項

### SEO 対策

- **タイトル**: `商品名 おすすめランキング2025｜ホームテム`
- **メタ説明**: 120 文字以内で商品の特徴と価値を説明
- **見出し構造**: H1 → H2 → H3 の階層を守る
- **alt 属性**: すべての画像に適切な alt 属性を設定

### アフィリエイトリンク

```html
<a
  href="https://amazon.co.jp/dp/商品ID"
  rel="sponsored nofollow"
  class="btn-primary"
>
  Amazonで詳細を見る
</a>
```

## 🔧 メンテナンス

### サイトマップの更新

```bash
node scripts/update-sitemap.js
```

### 新しいカテゴリーの追加

1. `categories/`ディレクトリに新しい HTML ファイルを作成
2. `partials/header.html`のナビゲーションに追加
3. サイトマップを更新

### パフォーマンス最適化

- 画像の最適化（WebP 形式推奨）
- CSS・JS ファイルの圧縮
- CDN の活用

## 📊 アナリティクス設定

`assets/main.js`に Google Analytics 4 の設定を追加：

```javascript
// Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "GA_MEASUREMENT_ID");
```

## 🎨 カスタマイズ

### カラーテーマの変更

`assets/main.css`の CSS 変数を編集：

```css
:root {
  --primary-color: #0ea5e9; /* メインカラー */
  --primary-hover: #0284c7; /* ホバーカラー */
  --text-primary: #1e293b; /* テキストカラー */
  --bg-primary: #ffffff; /* 背景色 */
}
```

### フォントの変更

Google Fonts から別のフォントを選択し、`assets/main.css`の`@import`文を更新。

## 📱 レスポンシブ対応

- **モバイル**: 320px〜768px
- **タブレット**: 768px〜1024px
- **デスクトップ**: 1024px 以上

## 🔍 SEO チェックリスト

- [ ] タイトルタグ（50-60 文字）
- [ ] メタ説明（120 文字以内）
- [ ] 構造化データ（JSON-LD）
- [ ] Open Graph タグ
- [ ] Twitter Card
- [ ] canonical URL
- [ ] 画像の alt 属性
- [ ] 見出し構造（H1-H6）
- [ ] 内部リンク
- [ ] サイトマップ

## 📞 サポート

問題や質問がある場合は、以下のファイルを確認してください：

- `README.md` - このファイル
- `templates/item-template.html` - テンプレート例
- `products/cool-summer-mat/index.html` - 実装例

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

---

**注意**: このサイトは Amazon アソシエイトプログラムに参加しています。価格情報のスクリーンショットや手動入力は行わず、公式 API またはウィジェットのみを使用しています。
