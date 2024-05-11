import React from 'react';
import yitaiImage from './乙太幣.jpg';
import litecoinImage from './萊特幣.jpg';
import bitcoinCashImage from './比特幣現金.jpg';
import polkadotImage from './波卡幣.jpg';
import rayImage from './瑞波幣.jpg';
function MyComponent() {
    // 比特幣介紹的滾動功能
    const scrollToBitcoinIntro = () => {
        const element = document.querySelector('.title-bitcoin-introduction');
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='text-bitcoin-introduction'>

            <h1 className="title-bitcoin-introduction"><strong>比特幣介紹</strong></h1>
            <div className="bitcoin-introduction">
                <h2>比特幣是什麼？</h2>
                <p>比特幣是第一個加密貨幣，由化名創建者中本聰於 2009 年創建。在幣圈，有些人另外給它取了一個暱稱叫做「大餅」，因為市值龐大，在加密貨幣市場中長期占據優勢。2008 年 11 月，中本聰發表了一篇論文「比特幣: 點對點電子現金系統」，說明他對電子貨幣的最新構想，也讓比特幣一詞首次曝光；接著在 2009 年 1 月，中本聰挖出史上第一個區塊，也就是比特幣創世區塊（Genesis block），宣告比特幣區塊鏈網路正式上線。</p>
                <br></br>
                <h2>運作模式</h2>
                <p>比特幣的基礎技術被稱為區塊鏈，這是一種記錄使用加密貨幣進行的所有交易的分佈式帳本。每次比特幣交易完成並被節點確認時，它就會被添加到一個數據“塊”中。當一個塊被執行時，它就會被添加到先前塊的鏈中，創建一個永久的、公開的、不可毀壞的所有交易記錄的記錄。</p>
                <p>比特幣用戶必須使用類似電子信箱的「比特幣錢包」和類似電郵位址的「比特幣位址」。比特幣位址和私鑰形成一對，就像銀行卡號和密碼一樣。比特幣位址類似於銀行卡號，用於追蹤在特定位址上存儲的比特幣數量。使用者可以隨意生成比特幣位址，以便存放比特幣。每個生成的比特幣位址都對應著一個私鑰，這個私鑰證明了使用者對該位址上的比特幣擁有所有權。私鑰就像銀行卡的密碼，只有持有密碼的人才能使用該銀行卡上的資金。因此，在使用比特幣錢包時，妥善保存比特幣位址和對應的私鑰至關重要。</p>
                <br></br>
                <h2>與其他虛擬貨幣相比，比特幣佔據了什麼優勢？</h2>
                <p>在此之前，先來簡單介紹幾個常見的虛擬貨幣：</p>

                <div className="yitai-container">
                    <img className="yitai" src={yitaiImage} alt="乙太幣" />
                    <div className="text-container">
                        <h2>以太幣</h2>
                        <h3>作為開放源碼平台，以太坊允許用戶建立和執行智能合約和去中心化應用。它的區塊鏈不僅支持代幣交易，還可進行複雜的程式化操作。</h3>
                    </div>
                    
                    
                </div>
                <div className="liter-container">
                    <img className="liter" src={litecoinImage} alt="萊特幣" />
                    <div className="text-liter-container">
                        <h2>萊特幣</h2>
                        <h3> 與比特幣相似，萊特幣也是一種去中心化的數字貨幣。它的交易速度比比特幣快且費用較低，並採用不同的採礦算法。</h3>
                    </div>
                    
                    
                </div>
                <div class="ray-container">
                    <img className="ray" src={rayImage} alt="瑞波幣" />
                    <div class="text-ray-container">
                        <h2>瑞波幣</h2>
                        <h3>瑞波幣旨在加速跨境付款和資金轉移。它提供快速的交易速度和低成本的國際轉款，並為金融機構提供了解決方案。</h3>
                    </div>
                    
                    
                </div>
            
                <div class="cash-container">
                    <img className="cash" src={bitcoinCashImage} alt="比特幣現金" />
                    <div class="text-cash-container">
                        <h2>比特幣現金</h2>
                        <h3> 比特幣現金是比特幣的一個分支，旨在提高比特幣的交易速度和擴容性，以更好地應對日常交易需求。</h3>
                    </div>
                    
                    
                </div>
            
                <div class="poka-container">
                    <img className="poka" src={polkadotImage} alt="波卡幣" />
                    <div class="text-poka-container">
                        <h2>波卡幣</h2>
                        <h3>波卡是一個跨鏈平台，允許不同的區塊鏈之間實現互操作性和資產轉移。它的目標是打破區塊鏈之間的隔離，實現更大規模的應用。</h3>
                    </div>
                    
                    
                </div>
            <p>以上是一些常見的虛擬貨幣介紹，這些貨幣各在虛擬貨幣市場佔有不可忽視的地位。然而，比特幣卻擁有其他虛擬貨幣的特性：</p>
            <br />
            <ul>
              <p><li>知名度和市場佔有率： 比特幣是第一個成功實施區塊鏈技術的加密貨幣，因此在市場上享有廣泛知名度和信任。</li></p>
              <p><li>去中心化和安全性： 比特幣採用去中心化的區塊鏈技術，無需中央機構控制，從而提高了安全性和透明度。</li></p>
              <p><li>可編程性和開放性： 比特幣是開放源碼的，允許開發者基於其區塊鏈構建各種解決方案和應用。</li></p>
              <p><li>流動性和接受度： 比特幣在全球范圍內都被廣泛接受，許多交易平臺和商家接受比特幣作為支付方式。</li></p>
              <p><li>有限供應： 比特幣的供應是有限的，最大供應量為2100萬枚，這意味著不會無限制地增加，有助於維持其價值。</li></p>
            </ul>
            <br />
            <p><strong>這些優勢或許也是為什麼即便幣圈的幣種越來越多，比特幣始終能保持幣圈龍頭的地位！</strong></p>
            <br />
            </div>
        </div>
    );
}

export default MyComponent;
