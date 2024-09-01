import React from 'react';
// Assuming images are hosted online and the URLs are correct, otherwise import local images
import sugarImage from './pei.jpg';
import ainsleyImage from './AINS.jpg';

const Founders = () => {
  return (
    <div className="many-button">
      <h1 className="founder">創辦人</h1>
      <div className="introductionsugar">
        <img className="sugar" src={sugarImage} alt="修哥" />
        <div className="text-sugar">
          <h1>修哥</h1>
          <h3>
            <p>前端網站設計發想人，本身是個浪漫的理想主義者，總是想要呼之欲出，將源源不絕的想像力與創造力分享出去。</p>
            <p>--- 雖然不是藝術家，但我是網頁設計師 ---</p>
            <a href="https://peihsiulu.github.io/HW1/">修哥的個人網站</a>
          </h3>
        </div>
      </div>
      <div className="introductionainsley">
        <img className="ainsley" src={ainsleyImage} alt="Ainsley" />
        <div className="text-ainsley">
          <h1>Ainsley</h1>
          <h3>
            <p>後端動態網站的創作人，腦海總是能源源不絕地湧出想法，即便與別人不一樣，也還是要做最不同凡響的那位。</p>
            <p>--- 生命有限，但是腦海的創意總是無限 ---</p>
            <a href="https://nrps9909.github.io/41171214h/">Ainsley的個人網站</a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Founders;
