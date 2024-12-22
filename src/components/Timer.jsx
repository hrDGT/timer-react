import React, { useEffect } from "react"
import { useState } from 'react'
import './Timer.css'

export default function Timer() {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [isRunning, setIsRunning] = useState(null)
    const [results, setResults] = useState([]);

    const changeSeconds = (e) => {
        setSeconds(e.target.value)
    }
    const changeMinutes = (e) => {
        setMinutes(e.target.value)
    }
    const changeHours = (e) => {
        setHours(e.target.value)
    }
    
    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval (() => {
                if (seconds > 0) {
                    setSeconds((seconds) =>  seconds - 1)
                }
                else if (minutes > 0) {
                    setMinutes((minutes) =>  minutes - 1)
                    setSeconds(59)
                }
                else if (hours > 0) {
                    setHours((hours) => hours - 1)
                    setMinutes(59)
                    setSeconds(59)
                }
            }, 1000)
        }

        if (hours === 0 && minutes === 0 && seconds === 1) {
            setTimeout(stopTimer, 1000)
        }
        return () => clearInterval(interval)
    }, [seconds, minutes, hours, isRunning])

    function startTimer() {
        if (hours != 0 || minutes !=0 || seconds !=0) {
            setIsRunning(true)
        }
    }

    function pauseTimer() {
        setIsRunning(false)
    }

    function stopTimer() {
        setIsRunning(false)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setResults([])
    }

    function saveValue() {
        setResults([...results, <div>{hours} : {minutes} : {seconds}</div>]);
    }

    return (
        <div className="timer">
        <div className="timer__time">
            <div className="timer__item">
                <label>Часы</label>
                <input value={hours} onChange={changeHours}/>
            </div>
            <div className="timer__item">
                <label>Минуты</label>
                <input value={minutes} onChange={changeMinutes}/>
            </div>
            <div className="timer__item">
                <label>Секунды</label>
                <input value={seconds} onChange={changeSeconds}/>
            </div>
        </div>
        <div className="timer__buttons">
          <button onClick={saveValue}>Сохранить значение</button>
          <button onClick={stopTimer}>Очистить</button>
          <button onClick={pauseTimer}>Остановить</button>
          <button onClick={startTimer}>Запустить</button>
        </div>
        {results}
      </div>
    )
}