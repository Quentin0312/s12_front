// TODO: En faire un objet ? OU le best practice avec plusieurs fichiers ? OU le 2 ?

export enum LanguageEnum {
  fr = "french",
  eng = "english",
  // ch = "// chinnois",
}

type LanguageDictType = { [key in LanguageEnum]: string };

export const gameTitle: LanguageDictType = {
  french: "Puissance 4",
  english: "Connect 4",
  // chinnois: "电源4",
};

export const gameModeLocal: LanguageDictType = {
  french: "Partie local",
  english: "Local versus",
  // chinnois: "本地部分",
};
export const gameModeOnline: LanguageDictType = {
  french: "Partie en ligne",
  english: "Online versus",
  // chinnois: "在线部分",
};
// export const gameModeIAeasy: LanguageDictType = {
//   french: "Partie contre IA facile",
//   english: "IA easy",
// };

export const gameModeIA: LanguageDictType = {
  french: "Partie contre IA",
  english: "Play against an AI",
};

// export const gameModeIAmedium: LanguageDictType = {
//   french: "Partie contre IA moyen",
//   english: "IA medium",
// };

export const backToModeSelection: LanguageDictType = {
  french: "Séléction du mode de jeu",
  english: "Back to game mode selection",
  // chinnois: "返回游戏模式选择",
};

export const waitingPLayer: LanguageDictType = {
  french: "En attente d'un adversaire",
  english: "Waiting for an opponent",
  // chinnois: "等待对手",
};
export const opponentLeftMessage: LanguageDictType = {
  french: "L'adversaire a pris la fuite",
  english: "The opponent left",
  // chinnois: "对手离开",
};

export const drawMessage: LanguageDictType = {
  french: "Match null :/",
  english: "Draw !",
  // chinnois: "平等",
};
export const redWinMessage: LanguageDictType = {
  french: "Le joueur rouge remporte la partie !",
  english: "Red won",
  // chinnois: "韩元",
};
export const yellowWinMessage: LanguageDictType = {
  french: "Le joueur jaune remporte la partie !",
  english: "Yellow won",
  // chinnois: "韩元",
};

export const yourTurnMessageLanguageDictType: LanguageDictType = {
  french: "C'est à votre tour de jouer !",
  english: "It's your turn",
  // chinnois: "轮到你了",
};
export const opponentTurnMessageLanguageDictType: LanguageDictType = {
  french: "C'est au tour de votre adversaire !",
  english: "It's your opponent turn",
  // chinnois: "轮到你的对手了",
};

export const playerYellowTurn: LanguageDictType = {
  french: "C'est au tour du joueur jaune !",
  english: "It's yellow player turn",
  // chinnois: "轮到黄色玩家了",
};
export const playerRedTurn: LanguageDictType = {
  french: "C'est au tour du joueur rouge !",
  english: "It's yellow player turn",
  // chinnois: "轮到黄色玩家了",
};

export const chooseDifficulty: LanguageDictType = {
  french: "Choisissez le niveau de difficulté :",
  english: "choose the difficulty level :",
};

export const easy: LanguageDictType = {
  french: "Facile",
  english: "Easy",
};

export const medium: LanguageDictType = {
  french: "Moyenne",
  english: "Medium",
};

export const hard: LanguageDictType = {
  french: "Difficile",
  english: "Hard",
};

export const veryHard: LanguageDictType = {
  french: "Très difficile",
  english: "Very hard",
};

export const difficultyLevel: LanguageDictType = {
  french: "Niveau de difficulté :",
  english: "Difficulty level :",
};
