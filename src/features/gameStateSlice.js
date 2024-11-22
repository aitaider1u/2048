import { createSlice } from '@reduxjs/toolkit';
import { Direction , Step} from './../utils/constant';

const initialGrid = [
  [2, 4, 32, 16],
  [32, 64, 128, 256],
  [512, 1024, 516, 2],
  [8, 2048,16, 4],
];

const initialGridZero = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
];

const addRandomTile = (grid) => {
  // Trouver toutes les cases vides
  const emptyCells = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  // Si aucune case vide, retourner la grille sans changement
  if (emptyCells.length === 0) {
    return grid;
  }

  // Sélectionner une case vide aléatoire
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  // Déterminer si on ajoute un 2 (70%) ou un 4 (30%)
  const newValue = Math.random() < 0.7 ? 2 : 4;

  // Créer une copie de la grille pour y appliquer les modifications
  const newGrid = grid.map((row, rowIndex) =>
    row.map((value, colIndex) => {
      if (rowIndex === randomCell.row && colIndex === randomCell.col) {
        return newValue; // Ajouter la nouvelle valeur
      }
      return value; // Garder la valeur actuelle
    })
  );

  return newGrid; // Retourner la nouvelle grille
};



export const detectGameState = (grid) => {
  // Check for a winning condition (2048 tile)
  for (let row of grid) {
    if (row.includes(2048)) {
      return Step.WON; // Player has won
    }
  }

  // Check for any possible moves
  const canMove = (grid) => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col];

        // Check if there is an empty tile
        if (current === 0) {
          return true; // There is a move possible
        }

        // Check for adjacent tiles with the same value
        if (
          (col < grid[row].length - 1 && current === grid[row][col + 1]) || // Check right
          (row < grid.length - 1 && current === grid[row + 1][col])        // Check down
        ) {
          return true; // There is a move possible
        }
      }
    }
    return false; // No moves possible
  };

  // If no moves are possible, player has lost
  if (!canMove(grid)) {
    return Step.LOST;
  }

  // Otherwise, the game is still ongoing
  return Step.PLAYING;
};



const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: { value: initialGrid, score: 0 , step : Step.WAITING, pause: false },
  reducers: {
    increment: (state) => {
      state.value[1][1] = 1; // Mutation directe autorisée
    },
    move: (state, action) => {
      if(state.pause){
        return
      }

      if(state.step === Step.WAITING || state.step === Step.WON || state.step === Step.LOST){
        state.value = addRandomTile(addRandomTile(initialGridZero));
        state.step = Step.PLAYING;
        return
      }

      const grid = state.value; // Récupérer la grille actuelle
      let score = 0; // Initialiser la somme des valeurs fusionnées
    
      // Fonction pour glisser les tuiles vers la gauche
      const slide = (row) => {
        const filteredRow = row.filter((num) => num !== 0); // Supprime les zéros
        const newRow = [];
        let skip = false;
    
        for (let i = 0; i < filteredRow.length; i++) {
          if (skip) {
            skip = false;
            continue;
          }
    
          if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) {
            const mergedValue = filteredRow[i] * 2;
            newRow.push(mergedValue); // Fusionne les tuiles
            score += mergedValue; // Ajoute la valeur fusionnée au score
            skip = true; // Ignore la prochaine tuile
          } else {
            newRow.push(filteredRow[i]); // Garde la tuile
          }
        }
    
        // Ajoute des zéros pour compléter la ligne
        while (newRow.length < 4) {
          newRow.push(0);
        }
    
        return newRow;
      };
    
      // Transpose une matrice (échange lignes <-> colonnes)
      const transpose = (matrix) => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
    
      // Inverse chaque ligne d'une matrice
      const reverse = (matrix) => matrix.map((row) => [...row].reverse());
    
      let newGrid;
    
      switch (action.payload) {
        case Direction.UP:
          newGrid = transpose(grid); // Transpose pour traiter verticalement
          newGrid = newGrid.map((row) => slide(row)); // Déplace chaque ligne
          newGrid = transpose(newGrid); // Re-transpose pour revenir à la disposition originale
          break;
    
        case Direction.DOWN:
          newGrid = transpose(grid); // Transpose pour traiter verticalement
          newGrid = reverse(newGrid); // Inverse pour simuler un déplacement vers le bas
          newGrid = newGrid.map((row) => slide(row)); // Déplace chaque ligne
          newGrid = reverse(newGrid); // Ré-inverse pour revenir à la disposition originale
          newGrid = transpose(newGrid); // Re-transpose pour revenir à la disposition originale
          break;
    
        case Direction.LEFT:
          newGrid = grid.map((row) => slide(row)); // Déplace chaque ligne vers la gauche
          break;
    
        case Direction.RIGHT:
          newGrid = reverse(grid); // Inverse chaque ligne
          newGrid = newGrid.map((row) => slide(row)); // Déplace chaque ligne vers la gauche
          newGrid = reverse(newGrid); // Ré-inverse chaque ligne
          break;
    
        default:
          return; // Si la direction est invalide, ne change pas l'état
      }
    
      // Vérifie si le nouvel état est différent avant de mettre à jour
      if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
        // Ajoute une nouvelle tuile si le mouvement a modifié la grille
        state.value = addRandomTile(newGrid);
        // Mettre à jour le score dans l'état
        state.score =  state.score + score;
        state.step = detectGameState(state.value)
        if(state.step == Step.WON || state.step == Step.LOST){
          state.pause = true;
          state.score = 0;
        }
      }
    },
    togglePause: (state) => {
      state.pause = !state.pause 
    },
    
    relaod: (state) => {
      state.value = addRandomTile(addRandomTile(initialGridZero));
      state.step = Step.PLAYING;
      state.pause = false;
      state.score = 0;
    },
  },
});

export const { increment, move, togglePause, relaod} = gameStateSlice.actions;
export default gameStateSlice.reducer;
