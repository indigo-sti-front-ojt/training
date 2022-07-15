# Firebase (mail&google)

認証のためのFirebaseの学習について学んだことを記録します。

## 何をしたかったか

---

firebaseを使えるようになる。

メールアドレスとパスワードによるユーザー登録・ログインとgoogleにログインを行いたい。

## 最終的に何をしたか

---

### メールアドレス認証

[](https://www.azukipan.com/Firebase/)

上記の記事&それに続く記事を参考にページの枠組みとメールアドレスによるユーザー登録、ログインを実装

- 作成したページ
    - Loginページ（メールアドレスログインとGoogleログイン）
    - Signupページ（ユーザーの登録を行う）
    - Homeページ（ログインしているユーザーが表示できる）
    - NotFoundページ

### Google認証

さらに以下の記事のgoogleログインの関数を参考にgoogleによるログイン機能を追加

[【React/TypeScript】Firebaseでメール認証とGoogle認証を実装する](https://btj0.com/blog/react/firebase-auth/)

↓ gitこちら

[https://github.com/ganeo/react-firebase-auth-sample/tree/master/src](https://github.com/ganeo/react-firebase-auth-sample/tree/master/src)

- firebase公式 Google認証 [https://firebase.google.com/docs/auth/web/google-signin?hl=ja](https://firebase.google.com/docs/auth/web/google-signin?hl=ja)

## 疑問・これから考えること

---

- ログインしていないユーザーに対してはLogin画面にリダイレクトする方法を用いたが、これはアクセス制限の方法としては適切なんだろうか。
- エラー “You should call navigate() in a React.useEffect(), not when your component is first rendered.”
    - 参考サイト [https://stackoverflow.com/questions/70165718/you-should-call-navigate-in-a-react-useeffect-not-when-your-component-is-fi](https://stackoverflow.com/questions/70165718/you-should-call-navigate-in-a-react-useeffect-not-when-your-component-is-fi)
    - useEffectについての注意? useEffectへの理解が甘く何が問題かわからない。
- アカウント情報もとに権限を切り替える機能の実装どうする?
    - ページにログインしているユーザーを出力してみる?
    - 特定のユーザーしかログインできないページを作成?
- MUI使っていたけど書き方きちんと理解できていたわけではないので使用した方法まとめる?
    

## はじめに参考にしたけど挫折した参考ページたち

---

### 学習用サイト

- ログイン認証

[【第5回】 Firebase Authentication を使ってアプリケーションに認証機能を追加しよう【はじめてみよう Firebase】 | 株式会社トップゲート](https://www.topgate.co.jp/firebase05-firebase-authentication)

- 場合分け認証
    - この方法はグーグルのストレージ for firebaseを使っていないとアクセス制限に使えない?

[【第7回】 Cloud Storage for Firebase セキュリティとルール【はじめてみよう Firebase】 | 株式会社トップゲート](https://www.topgate.co.jp/firebase07-security-rule)

- 認証のルーティングについて

[React:React Router v6 で 認証されていないユーザーや権限がないユーザーをリダイレクトする](https://zenn.dev/longbridge/articles/61b05d8bdb014d)

- Reactでの認証とルーティングについて

[【完全版】ReactのFirebase Authentication(認証)を基礎からマスター | アールエフェクト](https://reffect.co.jp/react/react-firebase-auth)