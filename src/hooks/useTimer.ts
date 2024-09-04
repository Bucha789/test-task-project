import { useCallback, useEffect, useRef, useState } from "react";
import { reproduceAudio } from "../utils";
import audio from '../../public/clock-alarm-8761.mp3';


type TimerOptions = {
  onChangeTimer?: (duration: number) => void
  playSound?: boolean
}

export const useTimer = (duration: number, options?: TimerOptions) => {
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const start = useCallback(() => {
    setIsRunning(true);
    interval.current = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval.current as NodeJS.Timeout);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      setIsRunning(false);
      setTime(duration);
    }
  }, [duration])

  useEffect(() => {
    if (options?.onChangeTimer) {
      options.onChangeTimer(time)
    }
  }, [time, options])


  useEffect(() => {
    if (options?.playSound && time === 0) {
      reproduceAudio(audio);
    }
  }, [options?.playSound, time])

  return {
    stop,
    start,
    reset,
    isRunning,
    time
  }
}