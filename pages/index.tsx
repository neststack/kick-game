'use client';

import { format } from 'date-fns';
import Button from '@/components/Button';
import { GameLogEntry } from '@/types';
import useGameData from '@/hooks/useGameData';

const Home = () => {
  const {
    gameData,
    gameLog,
    playerAttack,
    playerBlock,
    playerHeal,
    playerWait,
    resetGame,
  } = useGameData();

  const {
    ongoing,
    displayMessage,
    playerTurn,
    playerHealth,
    playerMana,
    enemyHealth,
  } = gameData;

  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center bg-neutral-700 px-2'>
      <div className='rounded-lg border-2 border-zinc-600 h-2/6 bg-neutral-800 w-full py-2 overflow-y-scroll text-zinc-400'>
        {[...gameLog].reverse().map((item: GameLogEntry) => (
          <div
            key={item.time}
            className='flex flex-row flex-wrap gap-2 justify-start'
          >
            <span className='text-teal-800'>
              {format(new Date(item.time), 'kk:mm:ss')}:{' '}
            </span>
            <span>{item.message}</span>
            {item.color !== '' && (
              <span
                className={`font-semibold ${
                  item.color === 'green'
                    ? 'text-green-700'
                    : item.color === 'blue'
                    ? 'text-sky-700'
                    : item.color === 'red'
                    ? 'text-red-800'
                    : item.color === 'dark red'
                    ? 'text-red-600'
                    : ''
                }`}
              >
                {item.value}
              </span>
            )}
            <span> HP</span>
          </div>
        ))}
      </div>
      <div className='h-2/6 w-full py-2'>
        <div>Player Health: {playerHealth}</div>
        <div>Player Mana: {playerMana}</div>
        <div>Enemy Health: {enemyHealth}</div>
      </div>
      <hr className='border-zinc-200 mb-4 bg-zinc-200 h-[2px] w-full' />
      <div className='flex flex-col gap-6 justify-center items-center h-1/6 w-full py-2'>
        <div className='text-2xl text-white font-semibold'>
          {displayMessage}
        </div>
        <div className='w-full rounded-lg bg-neutral-800 flex flex-row flex-wrap gap-6 p-4 items-center justify-center'>
          {ongoing ? (
            <>
              <Button
                onClick={playerAttack}
                label='Attack'
                disabled={!playerTurn}
              />
              <Button
                onClick={playerWait}
                label='Wait'
                disabled={!playerTurn}
              />
              <Button
                onClick={playerHeal}
                primary
                label='Heal (15 MP)'
                disabled={!playerTurn || playerMana < 15}
              />
            </>
          ) : (
            <Button large primary label='Start' onClick={resetGame} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
