import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [breakTime, setBreakTime] = useState(0)
  const [isWorking, setIsWorking] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isWorking) {
        setSeconds(seconds + 1)
        if (seconds === 60) {
          setSeconds(0)
          setMinutes(minutes + 1)
        } else if (minutes === 60) {
          setMinutes(0)
          setHours(hours + 1)
        }
      } else if (isBreak) {
        setSeconds(seconds - 1)
        if (seconds < 0) {
          setSeconds(0)
          setMinutes(minutes - 1)
        } else if (minutes < 0) {
          setMinutes(0)
          setHours(hours - 1)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  })

  // logic to increment the seconds, minutes and hours
  const handleWork = () => {
    setIsBreak(false)
    setIsWorking(true)
  }

  /*
    Clears counter
    Starts countdown for counter / 3 + breakTime
  */
  const handleBreak = () => {
    setIsWorking(false)
    setSeconds(Math.floor(seconds/3))
    setMinutes(Math.floor(minutes/3))
    setHours(Math.floor(hours/3))
    // converting break time in seconds
    setIsBreak(true)
  }
  
  /*
    Stop break countdown
    Run handleStart
  */
  const handleEndBreak = () => {
    setIsBreak(false)
    setBreakTime(seconds+minutes*60+hours*3600)
  }

  /*
    Stop and clear the counter
  */
  const handleExtendedBreak = () => {

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rational Breaks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://www.lesswrong.com/posts/RWu8eZqbwgB9zaerh/rational-breaks-a-better-way-to-work">Rational Breaks</a> timer 
        </h1>
        <span>
          <p>{hours}:{minutes}:{seconds}</p>
          {!isWorking && (
              <button onClick={() => handleWork()}>Start Working</button>
          )}
          {isWorking && (
            <button onClick={() => handleBreak()}>Start Break</button>
          )}
          {isBreak && (
            <button onClick={(() => handleExtendedBreak())}>Long Break</button>
          )}
        </span>
      </main>

      <footer className={styles.footer}>
          By{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
      </footer>
    </div>
  )
}

export default Home
