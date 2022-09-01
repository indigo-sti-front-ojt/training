import React from "react";

import homePageImage from "../images/homePage.png";

import aboutContent1 from "../images/aboutContent1.png";
import aboutContent2 from "../images/aboutContent2.png";
import aboutContent3 from "../images/aboutContent3.png";
import aboutContent4 from "../images/aboutContent4.png";

import human1 from "../images/human1.png";
import human2 from "../images/human2.png";
import human3 from "../images/human3.png";
import human4 from "../images/human4.png";

import { TopCardCompoent } from "../designComponents/TopCardCompoent";

export const AboutPage = () => {
  return (
    <>
      <div className="w-full h-80 flex flex-row flex-wrap relative">
        <img src={aboutContent1} className="w-1/2 h-1/2 object-cover" alt="" />
        <img src={aboutContent2} className="w-1/2 h-1/2 object-cover" alt="" />
        <img src={aboutContent3} className="w-1/2 h-1/2 object-cover" alt="" />
        <img src={aboutContent4} className="w-1/2 h-1/2 object-cover" alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-600/80">
          <span className="py-2 px-20 text-white font-bold text-2xl">
            People
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full h-16 flex justify-center items-center">
          <span className="text-2xl border-b-2 border-black px-20">
            おいしいものを手軽に
          </span>
        </div>
        <TopCardCompoent
          url={homePageImage}
          title="目的や地域別に簡単に検索"
          content={
            <>
              お店はどうやって探しますか？ここでは、管理人たちが実際に訪れて好きだったお店を自由に掲載しています。
              <br />
              私たちが探したお店があなたの好みに合致しているとうれしいです。Instagramで紹介もしてます!!
            </>
          }
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-full h-16 flex justify-center items-center">
          <span className="text-2xl border-b-2 border-black px-20">MEMBER</span>
        </div>
        <div className="flex flex-col gap-4">
          <TopCardCompoent
            url={human1}
            title="さき"
            content={
              <>
                こんにちは！さきたそです！ お酒を飲むのが大好きです💗💗
                <br />
                皆さんのお酒の楽しみ方に革命をもたらします！
                覚悟しててください！！💜
              </>
            }
          />
          <TopCardCompoent
            url={human2}
            title="ちな"
            content={
              <>
                酒は飲んでも飲まれるな
                <br />
                <br />
                最近日に日に酔っぱらうのが得意になってきました
                おさけにはおいしいごはんがセットでほしいですよね
                <br />
                <br />
                お酒の飲みすぎ、よくないです 皆さん健康管理に気を付けて
              </>
            }
          />
          <TopCardCompoent
            url={human3}
            title="まー"
            content={
              <>
                お疲れ様です！まーちゃんです！
                <br />
                皆さんに感動するおいしいお店やわくわくするお店をたくさん紹介していきます！
                よろしくお願いします！！
              </>
            }
          />
          <TopCardCompoent
            url={human4}
            title="まみ"
            content={
              <>
                こんにちは！まみです！
                <br />
                友達とお酒を楽しく飲むのが好きです💖
                <br />
                <br />
                お魚がおいしいところで育ったので、
                おいしいお魚には目がありません🐟
              </>
            }
          />
        </div>
      </div>
    </>
  );
};
