"use client";
import React, { useState, useEffect } from 'react';
import styles from './Report.module.css';
import { getAllSubjects, getAttendanceForSubject, getAttendancePercentageForSubject, getDaysforSubject, setSubjectsFromCSV, toggleDayForSubject } from '@/components/database';

function Profile() {
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [percentage, setPercentages] = useState([]);

  useEffect(() => {
    const localsubs = getAllSubjects();
    setSubjects(localsubs || []);
    setAttendance(localsubs.map(sub => getAttendanceForSubject(sub) || [0, 0]));
    setPercentages(localsubs.map(sub => getAttendancePercentageForSubject(sub) || 'N/A'));

  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['attendance-container']}>
        <p>Attendance <b>Report</b></p>
        {subjects.map((subject, index) => {
          if (!subject) return null; // Skip empty or undefined subjects
          let [attended, total] = attendance[index] || [0, 0];
          if(attended === undefined) attended = 0;
          if(total === undefined) total = 0;
          return (
            <div key={index} className={styles['attendance-report']}>
              <div className={styles['subject-name']}>
                <h3>{subject} {`${attended}/${total}`}</h3>
              </div>
              <div className={styles['subject-attendance']}>
                <p>{percentage[index]}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
