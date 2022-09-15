# React 環境

## Recoil 資料

install cmd
`yarn add recoil @types/recoil`

- [公式](https://recoiljs.org/)

---

## Error Boundary

### error boundary ライブラリなし

- [参考](https://zenn.dev/longbridge/articles/0c7c9ce5c60487)
- [参考 1](https://zenn.dev/azukiazusa/articles/60933e9cb1a4bc)
- [公式](https://ja.reactjs.org/docs/error-boundaries.html)

### error boundary ライブラリあり

- [参考](https://zenn.dev/longbridge/articles/b7e76b31f993d9)
- [公式](https://github.com/bvaughn/react-error-boundary)

### 知見

- onError でログを抽出保存を行う。これは、ErrorBoundry の componentDidCatch と同等のものだと推察
- onRest のコールバック関数は、State の初期化を行うことで再試行ができるのでは？具体的な用途は想像できない
- ライブラリなしの場合では、解決策が Reload もしくは元のページに戻るなどの選択肢しかない
- ライブラリありの場合では、再レンダリングなしでの再試行が可能になる
