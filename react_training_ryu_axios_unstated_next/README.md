# React Axios 共通化処理

[参考サイト](https://zenn.dev/longbridge/articles/761d980297a62c)

- yarn add axios
- [API Test 用](https://jsonplaceholder.typicode.com/)
- もし API の処理が失敗したら画面を遷移させたいなどの処理を挟みたいときは、カスタムフックとして登録する
- useEffect で axiosClient.interceptors.request.use や axiosClient.interceptors.response.use を設定すると設定しただけ走るため、注意が必要
- useEffect を使用して設定する場合は、axiosClient.interceptors.request.eject()で設定を破棄する仕組みが必要

```typescript:sample.tsx

React.useEffect(() => {

// リクエスト インターセプター
const requestInterceptors = axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
if (config.headers !== undefined) {
// const accessToken = getAccessToken()
// if (accessToken) {
// config.headers.Authorization = `Bearer ${accessToken}`
// }
}
return config
})

// レスポンス インターセプター
const responseInterceptor = axiosClient.interceptors.response.use(
(response) => {
return response
},
(error) => {
switch (error.response?.status) {
case 401:
// なにかする
break
default:
break
}
return Promise.reject(error)
}
)

// クリーンアップ
return () => {
axiosClient.interceptors.request.eject(requestInterceptors)
axiosClient.interceptors.response.eject(responseInterceptor)
}

}, [])

```

# unstated-next

[参考リンク](https://qiita.com/iewori/items/5a2068d9c3eb35f95b52)

- yarn add unstated-next
- ステートに関する処理をコンテナとしてまとめて、読み込む方法が useContainer を使用して明示的に呼び出す
- useContext との違いは処理を呼び出す手法が異なるだけ
- createContaier provider useContainer の三つのコマンドを覚える
