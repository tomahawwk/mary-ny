
import Snowfall from 'react-snowfall'
import { useState } from 'react';
import DragDropComponent from 'components/DragDropComponent';

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameStarted2, setGameStarted2] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  
  const startGame = () => {
    setGameStarted(!gameStarted);
    setTimeout(() => {
      setGameStarted2(true);
    }, 300);
    setTimeout(() => {
      setOpen(true);
    }, 700);
    setTimeout(() => {
      setOpen(false);
    }, 1200);
  }

  return (
    <div className="App overflow-hidden">
      <Snowfall snowflakeCount={200} radius={[0.1, .3]} />
      <div className="w-[1000px] h-[1000px] absolute top-0 bottom-0 right-0 m-auto left-0 overflow-hidden duration-[.4s]" style={{transform: gameStarted ? 'translateX(-300px)' : 'translateX(-100px)'}}>
          <div style={{opacity: open ? 1 : 0 }}>
            <img src="/images/2.png" className="absolute left-[200px] top-[-300px] w-[1000px] h-[1300px] object-contain" />
            <img src="/images/box-2.png" className="absolute top-[450px] w-[300px] z-[-1] left-[570px]" />
          </div>
          <div style={{opacity: open ? 0 : 1 }}>
            <img src="/images/1.png" className="absolute left-[200px] top-[-300px] w-[1000px] h-[1300px] object-contain animation-fade-y-reverse" style={{animationDelay: '.1s'}} />
            <img src="/images/box.png" className="absolute top-[450px] w-[300px] z-[-1] left-[560px] animation-fade-y" style={{animationDelay: '.0s'}} />
            </div>
          <div className="absolute left-[260px] z-2 top-0 bottom-0 m-auto flex items-end flex-col gap-[15px] justify-center">
            <h1 className="text-[rgb(206_243_255)] uppercase flex flex-col mt-[-50px] items-end">
              <span className="animation-fade-y" style={{animationDelay: '.2s'}}>С новым годом</span>
              <span className="animation-fade-y" style={{animationDelay: '.3s'}}><span className="text-[#CC0000]">Марипоша</span></span>
            </h1>
            {gameStarted ? (
              <p className="h-[34px] text-white text-[21px] text-right duration-[.4s]" style={{transform: gameStarted2 ? 'translateY(0px)' : 'translateY(-20px)', opacity: gameStarted2 ? 1 : 0}}>Шо то тут надо сделать 😁 <br></br>(это не домашка)</p>
            ) : (
              <button className="bg-[rgb(94_9_9)] text-white text-[20px] w-fit font-medium px-[8px] py-[2px] duration-[.4s] rounded-[4px] hover:scale-[1.1] hover:bg-[#cc0000] animation-fade-y" style={{animationDelay: '.4s'}} onClick={startGame}>Тык 👉</button>
            )}
          </div>
        </div>
        {gameStarted && (
          <div className="absolute z-2 top-0 bottom-0 flex flex-col justify-center left-[1024px] w-[300px] duration-[.4s]">
            <DragDropComponent onEnd={setEndGame} />
            {endGame && <p className="text-white">Game won!</p>}
          </div>
        )}
    </div>
     
  );
}

export default App;
