import React from 'react';


function DCAIntroduction() {
  // 滾動到 DCA 平均成本法介紹
  const scrollToDCAIntroduction = () => {
    const element = document.querySelector('.title-DCA');
    element.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className='text-DCA-introduction'>
      <h1 className="title-DCA"><strong>DCA平均成本法介紹</strong></h1>
      <div className="DCA-average">
        <br />
        <h3>什麼是DCA平均成本法？</h3>
        <div className="What-is-DCA-average">
        <p>平均成本法的英文是 Dollar Cost Averaging，簡稱 DCA，也就是俗稱的「定投」，是一種定期定量的長期投資策略。採取規律機械式的方式，以固定的周期和金額投入資金，買入特定的資產。其中，定期是指特定的周期，例如每兩周一次、每月一次等等。定量是指特定的金額，例如每次$100、$500、$2000等。這種投資策略的目的主要是為了避免資產波動對投資人最終收益造成的負面影響。</p>
            <p>例如說，原先要投資的金額總數有 $120,000，若是採用DCA平均成本法，平均分 12 期投注，每次的投資金額就是$10,000。由於每月股票價格總會有波動，大部分的投資小白的投資情緒容易受到股票市場價格變動影響。所以，相較一次性的投資，分期的DCA平均成本法大大降低了投資的風險。</p>
            <br></br>
        </div>
        <h3>使用DCA平均成本法有什麼優點？</h3> 
        <ul>
        <p><li>降低市場投資風險：DCA允許投資者定期投資，不論市價如何變動，投資者都會在市場投入相同的價格，有助於降低市場波動對投資結果的影響。</li></p>
        <p><li>操作簡單：只要定期投入資金，無需太多複雜技術、知識。</li></p>
        <p><li>適合多數族群：定投與其他投資策略相比，所需的投資技術較低，不需要特別預測市場的高點或低點，大大降低錯誤決策的可能性。</li></p>
        <p><li>幫助建立長期投資策略：DCA鼓勵投資者建立規律的投資習慣，無須過度思考市場的市價變化。即便中途有虧損，虧損量也會比一次投入來得少。另外，因為不需要持續盯盤，讓人更容易繼續持有、按照策略執行。</li></p>
        <p><li>受歡迎的退休儲蓄方式：各種退休儲蓄計劃經常使用DCA，因為它是一種有效的長期投資策略。</li></p>
        </ul>
        <br></br>
        <h3>DCA的計算公式</h3>
        <p>或許使用DCA投資策略的優點也可以從DCA的計算公式一探究竟：</p>
        <p>每期購買單位 = 投入金額 ÷ 投資總期數(頻率) ÷ 當期資產金額</p>
        <p>累積購買單位 = 當期購買單位 ＋ 之前每期購買單位總和</p>
        <p>累計資產值 = 累積購買單位 × 當期資產價格</p>
        <br></br>
        <p>從這上述列的三個公式，大家應該可以明白為什麼DCA的獲利會比其他投資策略高了吧！如果是一次性的投資，就只能受到市場價格的擺布。</p>
        <p>相反的，DCA就只需要顧及累計購買的數量，再在一個可以獲利的時間點賣出就行了，而且獲利的金額甚至也比一次性投入來得更高許多。</p>
        <br></br>
        <h3>DCA平均成本法適用於哪些族群</h3> 
                <p><li>學生：一般學生普遍沒有什麼收入，收入主要來自於打工或是家庭，長期少量的定期定額投資恰恰適合學生族群。</li></p>
                <p><li>一般上班族：上班族平時都必須應付上司交代的業務，幾乎沒有時間研究投資。所以，對於大多數上班族來說，DCA定期定額是個好的投資選擇。</li></p>
                <p><li>長期投資者：DCA主打長期投資，適合偏好長期投資，不喜歡高風險、短期買賣的投資客。</li></p>
                <br></br>
                <br></br>
                <br></br>
                <div className='DCA-img'>
                  <div className='student-container'>
                    <img className="student" src="https://raw.githubusercontent.com/PeiHsiuLu/PeiHsiuLu/main/%E5%AD%B8%E7%94%9F.jpg" alt="student" />
                    <p class="text-student">學生</p>                
                  </div>
                  
                  <div className='worker-container'>
                    <img className="worker" src="https://raw.githubusercontent.com/PeiHsiuLu/PeiHsiuLu/main/%E4%B8%8A%E7%8F%AD%E6%97%8F.jpg" alt="worker" />
                    <p class="text-worker">上班族</p>
                  </div>
                 
                  <div className='investor-container'>
                    <img className="invenstor" src="https://raw.githubusercontent.com/PeiHsiuLu/PeiHsiuLu/main/pexels-rdne-stock-project-7413915.jpg" alt="invenstor" />
                    <p class="text-invenstor">長期投資者</p>
                  </div>
                  
                </div>
                
      </div>
    </div>
  );
}

export default DCAIntroduction;
