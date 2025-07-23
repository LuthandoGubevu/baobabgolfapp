export type Player = 'Player 1' | 'Player 2' | 'Player 3' | 'Player 4';
export type HoleData = { hole: number; par: number };
export type Score = { [key in Player]?: number | null };
export type Scorecard = (HoleData & { scores: Score })[];

export const PLAYERS: Player[] = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
export const TOTAL_HOLES = 18;
export const SCORECARD_STORAGE_KEY = 'baobab-golf-scores';

export const HOLES_DATA: HoleData[] = [
  { hole: 1, par: 4 },
  { hole: 2, par: 3 },
  { hole: 3, par: 5 },
  { hole: 4, par: 4 },
  { hole: 5, par: 3 },
  { hole: 6, par: 4 },
  { hole: 7, par: 5 },
  { hole: 8, par: 3 },
  { hole: 9, par: 4 },
  { hole: 10, par: 4 },
  { hole: 11, par: 5 },
  { hole: 12, par: 3 },
  { hole: 13, par: 4 },
  { hole: 14, par: 4 },
  { hole: 15, par: 3 },
  { hole: 16, par: 5 },
  { hole: 17, par: 4 },
  { hole: 18, par: 4 },
];

export const getInitialScores = (numberOfHoles: 9 | 18 = 18): Scorecard => {
  const holes = HOLES_DATA.slice(0, numberOfHoles);
  return holes.map(holeData => ({
    ...holeData,
    scores: PLAYERS.reduce((acc, player) => {
      acc[player] = null;
      return acc;
    }, {} as Score),
  }));
};
