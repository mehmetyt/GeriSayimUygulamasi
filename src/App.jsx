
import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faCirclePlay,faPause, faPenSquare, faPlay, faRectangleXmark, faRotateLeft, faSquareCheck, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'



function App() {

  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);

  const [copyH, setCopyH] = useState(0);
  const [copyM, setCopyM] = useState(0);
  const [copyS, setCopyS] = useState(0);

  const [nameBtn, setNameBtn] = useState(<FontAwesomeIcon icon={faPlay} />);

  const [targetTime, setTargetTime] = useState(new Date());
  const [isCounting, setIsCounting] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isCounting)
      intervalId = setInterval(() => count(targetTime), 1000);
    else
      clearInterval(intervalId);

    return () => clearInterval(intervalId);
  }, [isCounting]);

  const start = () => {
    if (h >= 1 || m >= 1 || s >= 1) {
      setNameBtn(<FontAwesomeIcon icon={faPause} />);

      setIsReset(false);

      let time = new Date();
      time.setHours(time.getHours() + h);
      time.setMinutes(time.getMinutes() + m);
      time.setSeconds(time.getSeconds() + s);
      time.setMilliseconds(time.getMilliseconds() + 50);
      setTargetTime(time);
      setIsCounting(true);
    }
  }

  const count = (targetTime) => {
    let timeSpan = targetTime - new Date();
    setH(Math.floor(timeSpan / (1000 * 60 * 60)));
    setM(Math.floor((timeSpan % (1000 * 60 * 60)) / (1000 * 60)));
    setS(Math.floor(((timeSpan % (1000 * 60)) / 1000)));
    if (timeSpan < 100){
      setIsCounting(false);
      setEnd(true);
      let audio=new Audio('alarm.mp3');
      audio.play();
    }
  }


  const reset = () => {
    setH(0);
    setM(0);
    setS(0);
    setIsReset(true);
    setIsCounting(false);
    setEnd(false);
    setNameBtn(<FontAwesomeIcon icon={faPlay} />)
  }

  const setHIncrease = () => {
    if (h < 24)
      setH(h + 1);
  }
  const setHDecrease = () => {
    if (h >= 1)
      setH(h - 1);
  }
  const setMIncrease = () => {
    if (m < 59)
      setM(m + 1);
  }
  const setMDecrease = () => {
    if (m >= 1)
      setM(m - 1);
  }
  const setSIncrease = () => {
    if (s < 59)
      setS(s + 1);
  }
  const setSDecrease = () => {
    if (s >= 1)
      setS(s - 1);
  }

  const cancel = () => {
    setH(copyH);
    setM(copyM);
    setS(copyS);
    setShowBtns(false)
  }

  const show = () => {
    setCopyH(h);
    setCopyM(m);
    setCopyS(s);
    setShowBtns(true);
  }

  const zero = (x) => {
    return x < 10 ? "0" + x : x;
  }


  const startStopResume = () => {
    if (isCounting) {
      setNameBtn(isReset ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faCirclePlay} />)
      setIsCounting(false);
    }
    else {
      start();
    }
  }




  return (
    <>
      <header>
        <h2>Final Countdown</h2>
      </header>

      <div className='main'>

        <div className='countdown'>

          <div className='countdown1'>

            <div className='inDec'>
              {showBtns && <button onClick={setHIncrease}><FontAwesomeIcon icon={faSquarePlus} /></button>}
              <div>{zero(h)}</div>
              {showBtns && <button onClick={setHDecrease}><FontAwesomeIcon icon={faSquareMinus} /></button>}
            </div>

            <div>:</div>

            <div className='inDec'>
              {showBtns && <button onClick={setMIncrease}><FontAwesomeIcon icon={faSquarePlus} /></button>}
              <div>{zero(m)}</div>
              {showBtns && <button onClick={setMDecrease}><FontAwesomeIcon icon={faSquareMinus} /></button>}
            </div>

            <div>:</div>

            <div className='inDec'>
              {showBtns && <button onClick={setSIncrease} ><FontAwesomeIcon icon={faSquarePlus} /></button>}
              <div>{zero(s)}</div>
              {showBtns && <button onClick={setSDecrease} ><FontAwesomeIcon icon={faSquareMinus} /></button>}
            </div>

          </div>

          <div className='btnCountdown'>
            <div>
              { end&&<div><button><FontAwesomeIcon icon={faBell} className='LgIcon'/></button></div> }
              {!showBtns && !isCounting &&!end &&<button onClick={show} className='icon'><FontAwesomeIcon icon={faPenSquare} /></button>}
            </div>
            {showBtns &&
              <div className='OKCancel'>
                <button onClick={() => setShowBtns(false)} className='icon'><FontAwesomeIcon icon={faSquareCheck} /></button>
                <button onClick={cancel} className='icon'><FontAwesomeIcon icon={faRectangleXmark} /></button>
              </div>}

          </div>

        </div>

        <div className='btnStrStRes'>
          {!end&&!showBtns&&<button onClick={startStopResume} className='LgIcon'>{nameBtn}</button>}
          {!isReset && !showBtns&&<button onClick={reset} className='LgIcon'><FontAwesomeIcon icon={faRotateLeft} /></button>}
        </div>
      </div>

    </>
  )
}

export default App
