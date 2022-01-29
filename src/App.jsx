// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const RowItem = (props)=>{
  const { content, activedId } = props;
  return (
    <div className={activedId===content?'row__item row__item-active':'row__item'} id={`row__item${content}`}>
    {content}
    </div>
  )
}

// 用于清除定时器
let curid

function App() {
  const [list, setList] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  // 活跃的格子
  const [activedId,setActivedId] = useState('')
  // 中奖的格子
  const [prizeId,setPrizeId] = useState(null)
  // 获得prizeId之后计算出的动画次数
  const [times,setTimes] = useState(0)
  // 当前已经循环的次数
  const [actTimes,setActTimes] = useState(0)
  // 是否正在抽奖
  const [isRolling,setIsRolling] = useState(false)

  // 因为有定时器
  const savedCallback = useRef();
  function callback() {
    

    // 停下来的条件
    if(activedId===prizeId && actTimes>times){
      console.log('----计时器',curid)
      clearInterval(curid)
      setIsRolling(false)
      return 
    }
    // 动画
    let num;
    if(activedId===''){
      num=0
    }else{
      num = activedId
      // 如果循环到末尾，就再从0开始
      num = num===11 ? 0 : num+1
    }
    setActivedId(num)
    setActTimes(actTimes+1)
    console.log('----已循环次数',actTimes)
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  const handleBegin = ()=>{
    if(!isRolling){ 
      //点击抽奖之后，将于九宫格有关的状态都还原默认
      setActivedId('')
      setPrizeId(null)
      setTimes(0)
      setActTimes(0)
      setIsRolling(true)

      let prize = Math.floor(Math.random() * 12)
      console.log('----中奖号码',prize)
      // 随机算出一个动画执行的最小次数，可以变更权数
      let gettimes = list.length * Math.floor(Math.random() * 4 + 4)
      console.log('----循环次数',gettimes)
      setPrizeId(prize)
      setTimes(gettimes)
      // useState hook 调用后立刻console，值没有变化
      // 因为此时组件尚未更新，所以读state的操作应该在useEffect里

      function tick() {
        savedCallback.current();
      }

      curid = setInterval(tick, 40);
    }
  }

  return (
    <div className='App'>
      <div className="prize">
        <div className="prize__container">
          <div className="container__area">
            <div className="begin__btn" onClick={handleBegin}>
                点击开始
            </div>
            <div className="area__row">
              <RowItem content={list[0]} activedId={activedId}/>
              <RowItem content={list[1]} activedId={activedId}/>
              <RowItem content={list[2]} activedId={activedId}/>
              <RowItem content={list[3]} activedId={activedId}/>
            </div>
            <div className="area__row">
              <RowItem content={list[11]} activedId={activedId}/>
              <RowItem content={list[4]} activedId={activedId}/>
            </div>
            <div className="area__row">
              <RowItem content={list[10]} activedId={activedId}/>
              <RowItem content={list[5]} activedId={activedId}/>
            </div>
            <div className="area__row">
              <RowItem content={list[9]} activedId={activedId}/>
              <RowItem content={list[8]} activedId={activedId}/>
              <RowItem content={list[7]} activedId={activedId}/>
              <RowItem content={list[6]} activedId={activedId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;