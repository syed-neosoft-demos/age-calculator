'use client'

import { useState } from 'react'
import styles from './page.module.css'

function calculateAge(birthDate, toDate) {
  const birth = new Date(birthDate)
  const to = new Date(toDate)

  if (isNaN(birth) || isNaN(to) || birth > to) return null

  // Years, months, days
  let years = to.getFullYear() - birth.getFullYear()
  let months = to.getMonth() - birth.getMonth()
  let days = to.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  // Total calculations
  const diffMs = to - birth
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHrs = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHrs / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonthsTotal = years * 12 + months

  // Next birthday
  let nextBirthday = new Date(to.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday <= to) nextBirthday.setFullYear(to.getFullYear() + 1)
  const daysToNext = Math.ceil((nextBirthday - to) / (1000 * 60 * 60 * 24))

  // Day of week born
  const days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const bornOnDay = days_of_week[birth.getDay()]

  return {
    years,
    months,
    days,
    totalMonths: diffMonthsTotal,
    totalWeeks: diffWeeks,
    totalDays: diffDays,
    totalHours: diffHrs,
    totalMinutes: diffMin,
    totalSeconds: diffSec,
    daysToNext,
    nextBirthdayDate: nextBirthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    bornOnDay,
  }
}

export default function Home() {
  const today = new Date().toISOString().split('T')[0]

  const [birthDate, setBirthDate] = useState('')
  const [toDate, setToDate] = useState(today)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [animated, setAnimated] = useState(false)

  function handleCalculate() {
    setError('')
    setAnimated(false)

    if (!birthDate) {
      setError('Please select your date of birth.')
      return
    }
    if (!toDate) {
      setError('Please select a target date.')
      return
    }
    if (new Date(birthDate) > new Date(toDate)) {
      setError('Date of birth cannot be after the target date.')
      return
    }

    const age = calculateAge(birthDate, toDate)
    setResult(age)
    setTimeout(() => setAnimated(true), 50)
  }

  function openDatePicker(e) {
    // Keep native editing available in browsers that cannot open the picker.
    try {
      e.currentTarget.showPicker?.()
    } catch {
      e.currentTarget.focus()
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>FREE ONLINE TOOL</div>
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>Age</span>
            <span className={styles.titleLine2}>Calculator</span>
          </h1>
          <p className={styles.subtitle}>Every year, month, and day. Find your exact age and count down to your next birthday.</p>
        </header>

        <div className={styles.workspace}>
          {/* Input Card */}
          <form className={styles.card} noValidate onSubmit={e => { e.preventDefault(); handleCalculate() }}>
            <div className={styles.cardHeading}>
              <span className={styles.sectionNumber}>01 / YOUR DATES</span>
              <h2>Start with a date</h2>
              <p>Choose your birthday and the date you want to calculate to.</p>
            </div>
            <div className={styles.inputs}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="birth-date">
                  <span className={styles.labelDot} style={{ background: 'var(--accent)' }} />
                  DATE OF BIRTH
                </label>
                <input
                  id="birth-date"
                  type="date"
                  className={styles.dateInput}
                  value={birthDate}
                  max={today}
                  onChange={e => setBirthDate(e.target.value)}
                  onClick={openDatePicker}
                  aria-describedby="birth-date-hint"
                />
                <p id="birth-date-hint" className={styles.inputHint}>Tap to choose your birth date</p>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="target-date">
                  <span className={styles.labelDot} style={{ background: 'var(--blue)' }} />
                  CALCULATE TO
                </label>
                <input
                  id="target-date"
                  type="date"
                  className={styles.dateInput}
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  onClick={openDatePicker}
                  aria-describedby="target-date-hint"
                />
                <div className={styles.inputMeta}>
                  <p id="target-date-hint" className={styles.inputHint}>Choose any target date</p>
                  <button type="button" className={styles.todayBtn} onClick={() => setToDate(today)}>Use today</button>
                </div>
              </div>
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <button type="submit" className={styles.btn}>
              <span className={styles.btnText}>Calculate Age</span>
              <span className={styles.btnArrow}>↗</span>
            </button>
            <p className={styles.cardNote}>A little perspective on your time.</p>
          </form>

          {/* Results */}
          {result ? (
            <section aria-label="Age calculation results" aria-live="polite" className={`${styles.results} ${animated ? styles.resultsVisible : ''}`}>

              {/* Hero result */}
              <div className={styles.heroResult}>
                <h2 className={styles.sectionNumber}>02 / YOUR AGE</h2>
                <div className={styles.heroNumbers}>
                  <div className={styles.heroItem}>
                    <span className={styles.heroNum}>{result.years}</span>
                    <span className={styles.heroUnit}>years</span>
                  </div>
                  <div className={styles.heroItem}>
                    <span className={styles.heroNum}>{result.months}</span>
                    <span className={styles.heroUnit}>months</span>
                  </div>
                  <div className={styles.heroItem}>
                    <span className={styles.heroNum}>{result.days}</span>
                    <span className={styles.heroUnit}>days</span>
                  </div>
                </div>
                <p className={styles.heroSubtext}>
                  Born on a <strong>{result.bornOnDay}</strong>
                </p>
              </div>

              {/* Grid stats */}
              <div className={styles.grid}>
                <StatCard
                  value={result.totalMonths.toLocaleString()}
                  label="Total Months"
                  color="var(--green)"
                  delay="0.05s"
                  animated={animated}
                />
                <StatCard
                  value={result.totalWeeks.toLocaleString()}
                  label="Total Weeks"
                  color="var(--blue)"
                  delay="0.1s"
                  animated={animated}
                />
                <StatCard
                  value={result.totalDays.toLocaleString()}
                  label="Total Days"
                  color="var(--accent)"
                  delay="0.15s"
                  animated={animated}
                />
                <StatCard
                  value={result.totalHours.toLocaleString()}
                  label="Total Hours"
                  color="var(--pink)"
                  delay="0.2s"
                  animated={animated}
                />
                <StatCard
                  value={result.totalMinutes.toLocaleString()}
                  label="Total Minutes"
                  color="var(--purple)"
                  delay="0.25s"
                  animated={animated}
                />
                <StatCard
                  value={result.totalSeconds.toLocaleString()}
                  label="Total Seconds"
                  color="var(--green)"
                  delay="0.3s"
                  animated={animated}
                />
              </div>

              {/* Next birthday */}
              <div className={styles.nextBday}>
                <div className={styles.nextBdayIcon}>🎂</div>
                <div>
                  <div className={styles.nextBdayLabel}>NEXT BIRTHDAY</div>
                  <div className={styles.nextBdayDate}>{result.nextBirthdayDate}</div>
                  <div className={styles.nextBdayDays}>{result.daysToNext} days away</div>
                </div>
              </div>

            </section>
          ) : (
            <section className={styles.emptyState} aria-label="Your age results">
              <span className={styles.sectionNumber}>02 / YOUR AGE</span>
              <div className={styles.emptyIllustration} aria-hidden="true">
                <span>Y<span>years</span></span><i>·</i><span>M<span>months</span></span><i>·</i><span>D<span>days</span></span>
              </div>
              <h2>Your story, in numbers.</h2>
              <p>Enter your dates and calculate to see your age, time lived, and next birthday.</p>
              <div className={styles.emptyTags}><span>Exact age</span><span>Time lived</span><span>Next birthday</span></div>
            </section>
          )}
        </div>
        <footer className={styles.footer}>Made for the moments that count.</footer>
      </div>
    </main>
  )
}

function StatCard({ value, label, color, delay, animated }) {
  return (
    <div
      className={`${styles.statCard} ${animated ? styles.statCardVisible : ''}`}
      style={{ '--delay': delay, '--card-color': color }}
    >
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statAccent} />
    </div>
  )
}
