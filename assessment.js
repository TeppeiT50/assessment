'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet -area');
const answers = [

    '{userName}の良い所は声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}の良い所は眼差しです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}の良い所は情熱です。{userName}の情熱に周りの人は感化されます。。',
    '{userName}の良い所は厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}の良い所は知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}の良い所はユニークです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}の良い所は用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}の良い所は見た目です。内側から溢れ出る{userName}の良さが皆が気をひかれま。',
    '{userName}の良い所は決断力です。{userName}のする決断にいつも助けられる人がいます。',
    '{userName}の良い所は思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。'
];
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        // TODOボタン
        assessmentButton.onclick();
    }
}
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @pram{string} userName ユーザーの名前
 * @return{string} 診断結果                                      
 */
function assessment(userName) {
    //全文字のコードを取得してそれを足し合わせる
    let sumOfCharCode = 0
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName}/g, userName);
    // let result = answers

    return result;
}
/**
 * 指定した要素の子要素をすべて削除する
 * @param{HTMLElement} element HTMLぼの要素
 */
function removeALLChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時処理を終了する
        return;
    }
    //  診断結果表示エリアの作成
    removeALLChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragtaph = document.createElement('p');
    const result = assessment(userName);
    paragtaph.innerText = result;
    resultDivided.appendChild(paragtaph);
    // TODO ツイートエリアの作成
    removeALLChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?buttom_hashtag' + encodeURIComponent('あなたの良い所') + 'ref_src = ywsrc%5Etfw';
    anchor.setAttribute('href')
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたの良い所';
    tweetDivided.appendChild(anchor)

    // widgets.js　の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくない'
);







console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));
