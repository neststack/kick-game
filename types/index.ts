export type GameData = {
  ongoing: boolean;
  displayMessage: string;
  playerTurn: boolean;
  playerHealth: number;
  playerMana: number;
  enemyHealth: number;
};

export type GameLogEntry = {
  time: string;
  message: string;
  color: string;
  value: number;
};
