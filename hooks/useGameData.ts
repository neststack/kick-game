import { useEffect, useState } from 'react';
import { GameLogEntry } from '@/types';

const useGameData = () => {
  const [gameLog, setGameLog] = useState<GameLogEntry[]>([]);
  const [gameData, setGameData] = useState({
    ongoing: true,
    displayMessage: 'Start Game',
    playerTurn: true,
    playerHealth: 100,
    playerMana: 100,
    enemyHealth: 100,
  });
  console.log(gameData);

  const timeStamp = () => {
    const date = new Date();
    return date.toISOString();
  };

  const updateGameData = (dataObj: Object) => {
    setGameData((prevData) => {
      return {
        ...prevData,
        ...dataObj,
      };
    });
  };

  const updateGameLog = (dataObj: GameLogEntry) => {
    setGameLog((prevData) => [...prevData, dataObj]);
  };

  useEffect(() => {
    if (gameData.playerHealth === 0) {
      updateGameData({
        ongoing: false,
        result: 'You Lost!',
      });
      return;
    }
    if (gameData.enemyHealth === 0) {
      updateGameData({
        ongoing: false,
        result: 'You Won!',
      });
      return;
    }
  }, [gameData.playerHealth, gameData.enemyHealth]);

  const enemyAttackValue = () => {
    const crit = Math.random() > 0.7;
    const initial = 20 + Math.floor(Math.random() * 5);
    return crit ? initial * 2 : initial;
  };

  useEffect(() => {
    if (!gameData.playerTurn) {
      const hit = enemyAttackValue();
      const afterHitHealth = gameData.playerHealth - hit;
      const finalHealth = afterHitHealth <= 0 ? 0 : afterHitHealth;
      setTimeout(() => {
        if (finalHealth === 0) {
          updateGameData({
            playerTurn: true,
            playerHealth: 0,
            displayMessage: 'You Lost',
            ongoing: false,
          });
          updateGameLog({
            time: timeStamp(),
            message: `Enemy attacked for${hit >= 40 ? ' CRIT' : ''}`,
            color: hit >= 40 ? 'dark red' : 'red',
            value: gameData.playerHealth - finalHealth,
          });
        } else {
          updateGameData({
            playerTurn: true,
            displayMessage: 'Player Turn',
            playerHealth: finalHealth,
          });
          updateGameLog({
            time: timeStamp(),
            message: `Enemy attacked for${hit >= 40 ? ' CRIT' : ''}`,
            color: hit >= 40 ? 'dark red' : 'red',
            value: gameData.playerHealth - finalHealth,
          });
        }
      }, 2000);
    }
  }, [gameData.playerTurn, gameData.playerHealth]);

  const playerAttackValue = () => {
    return 15 + Math.floor(Math.random() * 8);
  };

  const playerAttack = () => {
    console.log('playerAttack');
    const hit = playerAttackValue();
    const afterHitHealth = gameData.enemyHealth - hit;
    const finalHealth = afterHitHealth <= 0 ? 0 : afterHitHealth;
    updateGameData({
      playerTurn: false,
      displayMessage: 'Enemy Turn',
      enemyHealth: finalHealth <= 0 ? 0 : finalHealth,
    });
    updateGameLog({
      time: timeStamp(),
      message: 'Player attacked for',
      color: 'green',
      value: gameData.enemyHealth - finalHealth,
    });
  };

  const playerHeal = () => {
    console.log('playerHeal');
    if (gameData.playerMana >= 15) {
      const afterHeal = gameData.playerHealth + 25;
      const finalHealth = afterHeal >= 100 ? 100 : afterHeal;
      updateGameData({
        playerTurn: false,
        displayMessage: 'Enemy Turn',
        playerMana: gameData.playerMana - 15,
        playerHealth: finalHealth,
      });
      updateGameLog({
        time: timeStamp(),
        message: `Player healed for`,
        color: 'blue',
        value: finalHealth - gameData.playerHealth,
      });
    }
  };

  const playerBlock = () => {};

  const playerWait = () => {
    console.log('playerWait');
    updateGameData({
      playerTurn: false,
      displayMessage: 'Enemy Turn',
    });
    updateGameLog({
      time: timeStamp(),
      message: `You chose to wait and observe`,
      color: '',
      value: 0,
    });
  };

  const resetGame = () => {
    console.log('resetGame');
    updateGameData({
      ongoing: true,
      displayMessage: 'Player Turn',
      playerTurn: true,
      playerHealth: 100,
      playerMana: 100,
      enemyHealth: 100,
    });
    setGameLog([]);
  };

  return {
    gameData,
    gameLog,
    playerAttack,
    playerBlock,
    playerHeal,
    playerWait,
    resetGame,
  };
};

export default useGameData;
