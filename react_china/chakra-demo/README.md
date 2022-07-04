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

