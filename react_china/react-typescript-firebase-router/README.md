- 作成したページ
    - “/Login” ログインページ（Googleログイン・ログインしていないユーザーはここにリダイレクトされる）
    - “/” Homeページ（ログインしたユーザ全員が見られる）
        - “normal” Normal Home配下の普通のページ（ログインした人全員見られる）
        - “/mypage” MyPage ここで自分の情報が表示される（ログインした人全員が見られる）
        - “/authpage” AuthPage 特定のユーザーだけがアクセスできるページ（特定の関連があるユーザーだけに編集権限を表示）
    - “*” NotFound 404ページ
    - "logout" Logout ログアウト後に表示されるページ


やったこと
---

- googleログインを作成
- providerの作成
- マイページに情報表示
- 切り替えをプロバイダーに変更
  - setStateAuthの挙動に問題 ログインしていてもnullになってしまう
  - 同期処理を追加することで解決
  - [参考url](https://zenn.dev/rinka/articles/6ed09e0c87838b)


次回以降実装すること
---

- 初回ログインの判定とタグ選択ページへの遷移
- ヘッダー コンポーネント化
- 権限をもとにページ内容の切り替えを行う(編集ボタン等)
  - そのためにはユーザーデータ保持したjsonが必要?
  - 他のユーザーの情報の参照方法は?
- 登録をsiosドメインのユーザに制限する