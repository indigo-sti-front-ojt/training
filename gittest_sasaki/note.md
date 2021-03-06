# git udemy

## git の考え方

git はローカルが作業の 8 割

ローカルは 3 つのエリアに分かれている

- ワークツリー　ファイルを変更する作業場
- ステージ　　　コミットする変更を準備（これがあることで変更完了したファイルだけリポジトリに追加できる）
- リポジトリ　　スナップショットを記録

## git のデータ構造について

省略

## git を楽に使えるようにするためのエイリアス

- ci commit のエイリアス
- st status のエイリアス
- br branch のエイリアス
- co checkout のエイリアス

## バージョン管理しないファイルを無視

パスワードや自動生成されるファイル
.gitignore ファイルを設定する

### gitignore ファイルの書き方

index.html //指定したファイルを除外
/root.html //ルートディレクトリを指定
dir/ ディレクトリ以下を除外
/_/_.css // /以外の文字列にマッチ\*

## ファイルの変更を取り消す(対象はワークツリーの変更)

git checkout -- ファイル名
git checkout -- ディレクトリ名
git checkout -- . ← 全変更を取り消す

## ステージに追加した変更を元に戻したいとき

指定した変更をステージから取り消すだけなのでワークツリーのファイルには影響を与えない
（両方修正したい場合は git reset HEAD のあと git checkout --の操作が必要）
\*HEAD：今自分がいるブランチの最新のコミット
git reset HEAD ファイル名
git reset HEAD ディレクトリ名
git reset HEAD . ← 全変更を取り消す

## 上記 2 項目のファイル変更の取り消しとステージに追加した変更の取り消し new コマンド restore でもできそう

git restore ファイル名　ファイルの変更を取り消す
git restore --staged ファイル名　ステージに追加した変更を元に戻す

## 直前のコミットをやり直す

リモートリポジトリに Push したコミットはやり直したらダメ（競合が起きるから）
git commit --amend 　現在のステージの状態をもとに直前のコミットを上書き

## remote の状態を確認

git remote でローカルリポジトリに紐付いているすべてのリモートリポジトリを表示
-v をつけることで URL まで表示
git remote show origin でさらに詳しく

## fetch でリモートリポジトリからローカルリポジトリへデータを取得

git fetch リモートリポジトリ名
ワークツリーに反映させる時はマージする
ex. git merge origin/master

##pull でリモートのファイルをワークツリーに取得
git pull origin master
これは以下をまとめて実行する
git fetch origin master
git merge origin/master

## ブランチって何

同時に開発を行うためにある
ブランチを分岐させることでほかの人の変更の影響を受けない
複数人で複数の機能を並行して開発できる

## ブランチの仕組み

- コミットはスナップショットで親のコミットも記録時系列順でたどれるようになっている

- master git のデフォルトのブランチ名
- ブランチを増やしてコミットを指し示すブランチを増やせる

- ブランチはコミットファイルを指し示したポインタ
- コミットしたら最新のコミットファイルを指し示すように変わる
- HEAD は今自分が作業しているブランチを指し示したポインタ

## ブランチのコマンド

git branch ブランチ名　　新しいブランチを作成
git branch 　ブランチの確認
git branch -a 　リモートのものも含めてすべてのブランチを表示する

## git ブランチを切り替える

git chechout 既存ブランチ名　ブランチの切り替え
git checkout -b 新ブランチ名　ブランチを新規作成し切り替え

## マージ　ほかの人の変更を自分の作業中のブランチに取り込む

git merge ブランチ名
git merge リモート名/ブランチ名

- マージは 3 種類
  - fast foward 　早送りマージ ブランチのポインタを前に進めるだけ 枝分かれしなかった
  - auto merge 　基本的なマージ 2 つのブラントのコミットを統合してマージコミットを作る　マージコミットは 2 つの親コミットを持つ
  - コンフリクト　同じファイルの同じ行に対して複数人が異なる編集を行ったとき

## コンフリクトの解決

コンフリクトしたファイルは以下のよう
<h1&#62;Git チュートリアル</h1&#62;

<p>ようこそ</p>
<<<<<<<HEAD
<p>git addについて学ぼう</p>
==========
<p>git commitを知ろう</p>
&#62;&#62;&#62;&#62;&#62;&#62;&#62;feature
↑
<<HEAD~== : HEADの変更分
== ~ &#62;&#62;feature : featureの変更分

1. ファイルの内容を書き換え、解決済みのファイルを作成
2. add,commit してマージ

## コンフリクトの事故が起きないようにするには

- 複数人で同じファイルを変更しない
- pull や merge するときは commit や stash で変更中の状態をなくす
- pull するときは、pull するブランチに移動してから pull
- コンフリクトしても慌てない

## ブランチ名の変更と削除

git branch -m 新しいブランチ名　ブランチ名変更
git branch -d ブランチ名　ブランチの削除

-d のときはマスターにマージされていないブランチは削除しない（安全）
-D を使うと強制削除ができる

## ブランチを利用した開発の流れ

- master ブランチをリリース用ブランチに、開発はトピックブランチを作成して進めるのが基本

## リモートブランチとは

リモートのブランチの状態へのポインタ

## プルリクエストの流れ

プルリクエスト　自分の変更したコードをリポジトリに取り込んでもらえるようにレビューを申請する機能

1. master ブランチを最新に更新
1. ブランチを作成
1. ファイルを変更
1. 変更をコミット
1. Github へプッシュ
1. プルリクエストを送る
1. コードレビュー
1. プルリクエストをマージ
1. ブランチを削除

## github flow の流れ

- master ブランチは常にデプロイできる状態に保つ
- 新開発は master ブランチから新しいブランチを作成しスタート
- 作成した新しいブランチ上で作業しコミットする
- 定期的に push
- master にマージするためにプルリクエストを使う
- 必ずレビューを受ける
- マスターブランチにマージしたらすぐにデプロイする
- （テストとデプロイは自動化）
- デプロイが住んだらローカルのマスターブランチを git pull origin master で最新の状態にし、git branch -d ブランチ名で開発に使用したブランチを削除する

## rebase で履歴を整えた形で変更を統合する

git rebase ブランチ名
ブランチの基点となるコミットを別のコミットに移動する
コミットの履歴を 1 直線にする　親コミットが常に一つ

rebase で親コミットを変更できる
その後最新のコミットに親コミットを fast-foward マージ

## rebase でしてはいけないこと

github にプッシュしたコミットを rebase する
そうすると整合が取れないため push ができなくなる
git push -f 強制的に git push は絶対 NG 　データが壊れます

## マージかリベースかは考え方次第

- マージの特長
  - コンフリクトの解決が比較的簡単
  - 履歴が複雑化
  - 履歴を残したいとき使おう
- リベースの特長
  - 履歴をきれいにできる
  - コンフリクトの解決が若干面倒
  - 履歴をきれいにしたいとき使おう

## プルのリベース型

git pull --rebase origin master
場合によっては pull コマンドを常にリベース型で実行するように設定できる
そのためのコマンド
git config --grobal pull.rebase ture 　常に
git config branch.master.rebase ture 　マスターブランチにいるときだけ

## rebase でコミットをきれいに整えてから push

履歴を書き換えられる
↓1 つだけのとき
git commit --amend 　直前のコミットをやり直す
↓ 複数の時
git rebase -i コミット ID
ex) git rebase -i HEAD~3 　直前 3 つのコミットを指定
-i は intaractive の略　 intaractive に履歴を変更する
やり直したいコミットの pick を edit に変更
その後 git commit --amend を実行
その後 git rebase --continue で次のコミットへ進む（リベース完了）

- HEAD 最新のコミット
- HEAD~3 　 3 つ前の親コミットを指定(チルダで指定：merge した場合 1 番目の親コミットをたどる)
- HEAD^2 　 2 つ前の親コミットを指定(キャレットで指定：merge した場合 2 番目の親コミットをたどる)

## rebase でコミットを並び替える 削除する

コミットの並び順は git log と逆なことに気を付ける
ex) git rebase -i HEAD~3 のようにコマンド打って、並べ替えたり削除したりできる

## squash でコミットをまとめる

pick→squash にすることでそのコミットと直前のコミットを 1 つにできる。複数も可。

## コミットを分割

まず git rebase -i HEAD~3
分割したいコミットを pick→edit に
git reset HEAD^　で最新のコミットのステージングを解除
git status でステージングしてない状態を確認
最後に、コミットを分割してやり直す

## タグ付けしよう

コミットを参照しやすくするためにわかりやすい名前を付けたのがタグ
リリースポイントでタグ付けするのが一般的

- git tag 　タグの一覧を表示する
- git tag -l "指定する文字列"　指定する文字列を含むタグの一覧を表示

- 注釈付き(annotated)と軽量(lightweight)の 2 種類のタグがある
  -git tag -a "タグ名" -m "メッセージ"　注釈付きタグを作成　タグ名とメッセージを指定

  - git tag タグ名　軽量版タグを作成する(名前しか付けられない -a を付けない)
  - git tag タグ名 コミット名　過去のコミットに後からタグ付けする

- タグのデータを表示

  - git show タグ名　タグのデータと関連付けられたコミットとそのタグ情報を表示

- タグをリモートリポジトリに送信
  - git push リモート名 タグ名　または　 git push origin --tags でタグを一斉送信

## 作業を一時避難する

- git stash == git stash save 　作業を一時避難する
  状況) index.html の変更をワークツリーからステージに上げたが、commit する状態まではできていない。しかし別のブランチで作業する必要がある → 変更分を stash に一時避難する
  この処理でワークツリーとステージをきれいにすることができる

- git stash list 　避難した作業の一覧を表示
- git stash apply 最新の作業を復元
- git stash apply --index 　最新のステージの状態も復元する
- git stash apply スタッシュ名　特定の作業を復元する
- git stash drop 　最新の作業を削除
- git stash drop スタッシュ名　特定の作業を削除
- git stash clear 　全作業を削除する
