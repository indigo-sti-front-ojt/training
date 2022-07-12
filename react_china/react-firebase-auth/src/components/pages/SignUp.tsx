import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import {auth} from "../../firebase"

export const SignUp = () => {
  const emailRef = useRef<any|null>(null);
  const emailPassword = useRef<any|null>(null);  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(emailRef.current?.value,emailPassword.current?.value);
    //firebaseへのユーザーの登録
    createUserWithEmailAndPassword(auth,emailRef.current?.value, emailPassword.current?.value);
  };
  return (
    <>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" ref={emailRef}/>
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" ref={emailPassword}/>
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </>
  );
};
