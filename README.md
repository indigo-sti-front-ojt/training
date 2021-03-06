# training
電子カルテのフロントチームの研修用のリポジトリ

# ディレクトリ構成

```
training
- README.md
- testDir (有村が動作確認用に作ったディレクトリです)
- 講座_氏名/*　(例　html_css_trainig_arimura)
```

# 初期作業
* [sshキーの作成,githubへの登録](https://qiita.com/shiro01/items/e886aa1e4beb404f9038#%E8%A8%AD%E5%AE%9A%E6%89%8B%E9%A0%86)
* リポジトリのクローン (最初だけで大丈夫です)
```
git clone git@github.com:indigo-sti-front-ojt/training.git
```

# 作業手順
* jiraで課題の作成(ラベルはtrainingでお願いします)

* 作業ブランチの作成　
```
git checkout -b 'feature/ブランチ名'
```
* 作業が完了したらPRを作成（有村と岡田さんをレビュアーに入れてください）
* PRがマージされたら,`develop`ブランチでpull
```
git checkout develop
git pull origin develop
```
* 次のブランチを作成　
```
git checkout -b 'feature/ブランチ名'
```

# PRTemplate
```
## チケットへのリンク
* https://example.com
## やったこと
* このプルリクで何をしたのか？
## やらないこと
* このプルリクでやらないことは何か？（あれば。無いなら「無し」でOK）（やらない場合は、いつやるのかを明記する。）
## できるようになること（ユーザ目線）
* 何ができるようになるのか？（あれば。無いなら「無し」でOK）
## できなくなること（ユーザ目線）
* 何ができなくなるのか？（あれば。無いなら「無し」でOK）
## 動作確認
* どのような動作確認を行ったのか？　結果はどうか？
## その他
* レビュワーへの参考情報（実装上の懸念点や注意点などあれば記載）
## 影響する機能
* 入院指示
```
