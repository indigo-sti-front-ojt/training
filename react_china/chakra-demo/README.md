## Chakra UI アプリの実装手順とメモ

1. グローバルなスタイルの設定(Chakra UI)
1. ルーティングの作成(react-routor-dom,@types/react-router-dom)
    1. components/pages配下にログイン、ホーム、設定、ユーザー一覧ページを作成
    1. App.tsxのreturn内を全てBrowserRouterで囲む
    ex) function App() {
          return (
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          );
        }
    1. ルーターのためのコンポーネントを利用Routes, Routeでルーティングを設定
    ex) <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/register/`} element={<Register />} />
        </Routes>
    1.階層のあるコンポーネントの例
    - url(https://yumegori.com/react_router_v6_method)
1. ヘッダーの作成
1. ログイン機能の実装
    1. テキストボックスのユーザーの型指定 
        const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
          setUserId(e.target.value);
        };
1. ユーザー管理画面の作成
    - useEffectの第二引数は必ず書く。[]の場合はマウント時、アンマウント時に実行(初期表示時?)
    - レンダリングをしすぎないようにこれが更新されたときだけレンダリングするという定数を書く?
1. ログインしたユーザーの情報をコンテキストに保持
    - providersの中のLoginUserProvider.tsxに
    - useStateの型の例 setLoginUser:Dispatch<SetStateAction<User|null>>


- モーダル、ハンバーガーメニューは他のCSSフレームワークでも作れるようになる必要あり
- エラー　閉じタグの/忘れ　return()書き忘れ
- ドロワーの作成　Chakra UIで簡単にできる
- react router 参考サイト url(https://reffect.co.jp/react/react-router-6)
- hooks 参考 url(https://zenn.dev/web_tips/articles/0de2d1dd2bcde7)

