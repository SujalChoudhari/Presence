"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import styles from './stats.module.css'

function Stats() {
    const [username, setUsername] = useState('User');
    const [attendance, setAttendance] = useState(100);
  
    useEffect(() => {
      const username = localStorage.getItem('username');
      const attendance = localStorage.getItem('attendance');
      if (username)
        setUsername(username);
      else
        setUsername('User');
      if (attendance)
        setAttendance(attendance);
      else
        setAttendance(100);
    }, [])
  
    const usernameChangeHandler = (event) => {
      setUsername(event.target.value);
      localStorage.setItem('username', event.target.value);
    }
  
  
    return (
      <header className={styles.container}>
        <div>
          <p className={styles.hello}>Hello, </p>
          <input
            type="text"
            name="username"
            id="username"
            onChange={usernameChangeHandler}
            className={styles.username}
            value={username} />
        </div>
        <div className={styles.attendance}>
          <p className={styles.percent}> {attendance}% </p>
        </div>
      </header>
    )
}

export default Stats