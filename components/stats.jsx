"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import styles from './stats.module.css'
import { getAveragePercentageforAll, getUserName, setUserName } from './database';

function Stats() {
    const [username, setUsername] = useState('User');
    const [attendance, setAttendance] = useState(100);
  
    useEffect(() => {
      const username = getUserName();
      const attendance = getAveragePercentageforAll();
      if (username)
        setUsername(username);
      else
        setUsername('User');
      if (attendance)
        setAttendance(Math.round(attendance));
      else
        setAttendance(100);
    }, [])
  
    const usernameChangeHandler = (event) => {
      setUsername(event.target.value);
      setUserName(event.target.value);
    }

    const refreshAttendance = () => {
      const attendance = getAveragePercentageforAll();
      if (attendance)
        setAttendance(Math.round(attendance));
      else
        setAttendance(0);
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
        <div onClick={refreshAttendance} className={styles.attendance}>
          <p className={styles.percent}> {attendance}% </p>
        </div>
      </header>
    )
}

export default Stats