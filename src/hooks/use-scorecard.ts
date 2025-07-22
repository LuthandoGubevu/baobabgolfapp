'use client';

import { useState, useEffect, useCallback } from 'react';
import { Scorecard, getInitialScores, SCORECARD_STORAGE_KEY } from '@/lib/constants';

export const useScorecard = () => {
  const [scorecard, setScorecard] = useState<Scorecard>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedScores = localStorage.getItem(SCORECARD_STORAGE_KEY);
      if (storedScores) {
        setScorecard(JSON.parse(storedScores));
      } else {
        setScorecard(getInitialScores());
      }
    } catch (error) {
      console.error("Failed to load scores from local storage", error);
      setScorecard(getInitialScores());
    } finally {
        setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (scorecard.length > 0 && isLoaded) {
      try {
        localStorage.setItem(SCORECARD_STORAGE_KEY, JSON.stringify(scorecard));
      } catch (error) {
        console.error("Failed to save scores to local storage", error);
      }
    }
  }, [scorecard, isLoaded]);

  const updateScore = useCallback((holeIndex: number, player: string, score: number | null) => {
    setScorecard(prevScorecard => {
      const newScorecard = [...prevScorecard];
      const newScore = Math.max(1, Math.min(10, score || 0));
      if (newScorecard[holeIndex]) {
        newScorecard[holeIndex].scores[player as keyof typeof newScorecard[number]['scores']] = score === null ? null : newScore;
      }
      return newScorecard;
    });
  }, []);

  const getBestScoresForHole = useCallback((holeIndex: number): (number | null)[] => {
    if (!scorecard || !scorecard[holeIndex]) return [];
    const scores = Object.values(scorecard[holeIndex].scores)
      .filter((s): s is number => s !== null && s > 0);
    
    if (scores.length === 0) return [];
    
    scores.sort((a, b) => a - b);
    return scores.slice(0, 2);
  }, [scorecard]);
  
  const getTeamTotalForHole = useCallback((holeIndex: number): number => {
    const bestScores = getBestScoresForHole(holeIndex);
    return bestScores.reduce((acc: number, score) => acc + (score || 0), 0);
  }, [getBestScoresForHole]);

  const getTotalTeamScore = useCallback((): number => {
    return scorecard.reduce((total, _, holeIndex) => {
      return total + getTeamTotalForHole(holeIndex);
    }, 0);
  }, [scorecard, getTeamTotalForHole]);

  const resetScores = useCallback(() => {
    const initialScores = getInitialScores();
    setScorecard(initialScores);
    try {
      localStorage.setItem(SCORECARD_STORAGE_KEY, JSON.stringify(initialScores));
    } catch (error) {
      console.error("Failed to reset scores in local storage", error);
    }
  }, []);

  return { 
    scorecard, 
    isLoaded, 
    updateScore, 
    getBestScoresForHole,
    getTeamTotalForHole, 
    getTotalTeamScore, 
    resetScores 
  };
};
