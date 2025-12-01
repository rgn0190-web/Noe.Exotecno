
let audioCtx: AudioContext | null = null;

export const playClickSound = () => {
  try {
    if (typeof window === 'undefined') return;

    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume context if suspended (common browser autoplay policy restriction)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Create a subtle "digital blip" sound
    osc.type = 'sine'; // Sine is softest
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.05);

    // Envelope for a short, crisp sound
    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime); // Low volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);

  } catch (e) {
    // Fail silently if audio is not supported or blocked
    console.warn("Audio play failed", e);
  }
};
