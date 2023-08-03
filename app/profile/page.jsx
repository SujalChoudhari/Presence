"use client";
import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { getAllSubjects, getAttendanceForSubject, getAttendancePercentageForSubject, getDaysforSubject, setSubjectsFromCSV, toggleDayForSubject } from '@/components/database';

function Profile() {
  const [subjects, setSubjects] = useState([]);
  const [activeCheckbox, setActiveCheckbox] = useState({}); // Fix the state variable name

  useEffect(() => {
    const localsubs = getAllSubjects();
    setSubjects(localsubs || []);
    
    localsubs.forEach(s => {
      const days = getDaysforSubject(s);
      if (days) {
        days.forEach(d => {
          setActiveCheckbox(prev => ({ ...prev, [`${s}-${d}`]: true }));
        });
      }
    });
  }, []);

  const subjectsChangeHandler = (event) => {
    const sub = event.target.value;
    setSubjects(sub.split(','));
    setSubjectsFromCSV(sub);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const checkboxChangeHandler = (day, subject) => {
    toggleDayForSubject(subject, day);
    setActiveCheckbox(prev => ({ ...prev, [`${subject}-${day}`]: !prev[`${subject}-${day}`] }));
  };

  return (
    <div className={styles.container}>
      <div className={styles['subject-container']}>
        <p><b>Subjects</b> (separate by comma)</p>
        <textarea
          className={styles.subjects}
          id="subjects"
          value={subjects.join(",")}
          onChange={subjectsChangeHandler}
          placeholder="Maths,English,Science"
        />
      </div>
      <div className={styles['timetable-container']}>
        <p>Timetable</p>
        <div className={styles['timetable-holder']}>
          {days.map((day, index) => (
            <div key={index} className={styles['timetable-day']}>
              <h3>{day}</h3>
              <div className={styles['timetable-subjects']}>
                {subjects.map((subject, subjIndex) => {
                  if (!subject) return null; // Skip empty or undefined subjects
                  return (
                    <div key={subjIndex} className={styles['timetable-subject']}>
                      <input
                        type="checkbox"
                        name={`subject-${subject}`}
                        id={`${subject}-button`}
                        className={styles['checkbox']}
                        onChange={() => checkboxChangeHandler(day, subject)}
                        checked={activeCheckbox[`${subject}-${day}`]}
                      />
                      <label htmlFor={`${subject}-button`}>{subject}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
