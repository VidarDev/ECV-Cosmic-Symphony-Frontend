import React, { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

interface RandomMelodyPlayerProps {
  musicRange: string[];
  synthToUse: string;
  tempo: number;
  isPlaying: boolean;
}

const RandomMelodyPlayer: React.FC<RandomMelodyPlayerProps> = ({
  musicRange,
  synthToUse,
  tempo,
  isPlaying
}) => {
  const [synth, setSynth] = useState<Tone.PolySynth | Tone.MonoSynth | null>(null);
  const [sequence, setSequence] = useState<Tone.Sequence | null>(null);

  const generateMelody = useCallback(() => {
    return Array(12).fill(0).map(() => {
      const note = musicRange[Math.floor(Math.random() * musicRange.length)];
      const octave = Math.floor(Math.random() * 3) + 3; // Random octave between 3 and 5
      return `${note}${octave}`;
    });
  }, [musicRange]);

  useEffect(() => {
    // Initialize synth based on synthToUse prop
    const newSynth = synthToUse === 'PolySynth' 
      ? new Tone.PolySynth().toDestination()
      : new Tone.MonoSynth().toDestination();
    setSynth(newSynth);

    // Set tempo
    Tone.getTransport().bpm.value = tempo;

    // Clean up on component unmount
    return () => {
      if (sequence) {
        sequence.dispose();
      }
      newSynth.dispose();
    };
  }, [synthToUse, tempo]);

  useEffect(() => {
    if (isPlaying) {
      playRandomMelody();
    } else {
      stopMelody();
    }
  }, [isPlaying]);

  const playRandomMelody = useCallback(() => {
    if (!synth) return;

    const melody = generateMelody();
    console.log(melody);

    const newSequence = new Tone.Sequence((time, note) => {
      const durations = ["8t", "8n", "4n", "4t", "2n", "1n"];
      const randomDuration = durations[Math.floor(Math.random() * durations.length)];

      synth.triggerAttackRelease(note, randomDuration, time);
    }, melody);

    setSequence((prevSequence) => {
      if (prevSequence) {
        prevSequence.dispose();
      }
      return newSequence;
    });

    newSequence.start(0);
    Tone.getTransport().start();
  }, [synth, generateMelody]);

  const stopMelody = useCallback(() => {
    if (sequence) {
      sequence.stop();
    }
    Tone.getTransport().stop();
  }, [sequence]);

  // Le composant ne rend plus de bouton, car le contrôle de lecture est géré par le parent
  return null;
};

export default RandomMelodyPlayer;