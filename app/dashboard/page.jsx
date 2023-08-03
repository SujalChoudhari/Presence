"use client";
import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { daysInWeek, getTodaysAttendanceForSubject, getCurrentDate, getSubjectsforDay, setTodaysAttendanceForSubject } from '@/components/database';

function Dashboard() {
  const [currentDate, _] = useState(getCurrentDate());
  const [subjects, setSubjects] = useState([]);
  const [isChecked, setIsChecked] = useState({});

  useEffect(() => {
    const todaysDay = daysInWeek[new Date().getDay()];
    const subs = getSubjectsforDay(todaysDay);
    if (subs) setSubjects(subs);
    else setSubjects([]);



    subs.forEach((sub) => {
      const todaysAtten = getTodaysAttendanceForSubject(sub); // 1,0,-1
      if (todaysAtten === 1) { setIsChecked((prev) => ({ ...prev, [`${sub}-1`]: true, [`${sub}-0`]: false, [`${sub}--1`]: false })); }
      else if (todaysAtten === 0) setIsChecked((prev) => ({ ...prev, [`${sub}-0`]: true, [`${sub}-1`]: false, [`${sub}--1`]: false }));
      else if (todaysAtten === -1) setIsChecked((prev) => ({ ...prev, [`${sub}--1`]: true, [`${sub}-0`]: false, [`${sub}-1`]: false }));
      console.log(todaysAtten);
    });
  }, []);

  const handleAttendanceChange = (subject, value) => {
    setTodaysAttendanceForSubject(subject, value);
    if (value === 1) setIsChecked((prev) => ({ ...prev, [`${subject}-1`]: true, [`${subject}-0`]: false, [`${subject}--1`]: false }));
    else if (value === 0) setIsChecked((prev) => ({ ...prev, [`${subject}-0`]: true, [`${subject}-1`]: false, [`${subject}--1`]: false }));
    else if (value === -1) setIsChecked((prev) => ({ ...prev, [`${subject}--1`]: true, [`${subject}-0`]: false, [`${subject}-1`]: false }));
  };

  return (
    <div className={styles.dashboard}>
      <p className={styles.date}>{currentDate}</p>
      <p>
        <b>Today's Subjects</b>
      </p>
      {subjects.map((subject) => (
        <div key={subject} className={styles.subjectRow}>
          <span>{subject}</span>
          <span>
          <label>
            <input
              type="radio"
              name={`attendance-${subject}`}
              value={1}
              onChange={(e) => handleAttendanceChange(subject, parseInt(e.target.value))}
              checked={isChecked[`${subject}-1`]}
            />
            <img src="/present.png" alt="Present" />
          </label>
          <label>
            <input
              type="radio"
              name={`attendance-${subject}`}
              value={0}
              onChange={(e) => handleAttendanceChange(subject, parseInt(e.target.value))}
              checked={isChecked[`${subject}-0`]}
            />
            <img src="/absent.png" alt="Present" />
          </label>
          <label>
            <input
              type="radio"
              name={`attendance-${subject}`}
              value={-1}
              onChange={(e) => handleAttendanceChange(subject, parseInt(e.target.value))}
              checked={isChecked[`${subject}--1`]}
            />
            <img src="/cancel.png" alt="Present" />
          </label>
          </span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
