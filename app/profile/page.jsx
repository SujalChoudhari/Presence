"use client";
import React, { useState } from 'react';
import styles from './Profile.module.css';

function Profile() {
  // States for subjects, attendance, and timetable
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [timetable, setTimetable] = useState([[], [], [], [], [], [], []]); // list of subjects for each day of the week

  // Load data from localStorage on initial render
  React.useEffect(() => {
    const localsubs = localStorage.getItem('subjects');
    const localAttendance = localStorage.getItem('attendance');
    const localTimetable = localStorage.getItem('timetable');

    if (localsubs) setSubjects(localsubs.split(','));
    else setSubjects([]);

    if (localAttendance) setAttendance(localAttendance.split(','));
    else setAttendance([]);

    if (localTimetable) setTimetable(JSON.parse(localTimetable));
    else setTimetable([[], [], [], [], [], [], []]);
  }, []);

  // Handle changes in the subjects input
  const subjectsChangeHandler = (event) => {
    const sub = event.target.value.split(',');
    setSubjects(sub);
    localStorage.setItem('subjects', sub.join(','));
  };

  // Toggle subject in the timetable
  const toggleSubject = (day, toggleableSubject) => {
    const dayIndex = days.indexOf(day);
    const dayInTimetable = timetable[dayIndex];
    if (dayInTimetable.includes(toggleableSubject))
      dayInTimetable.splice(dayInTimetable.indexOf(toggleableSubject), 1);
    else dayInTimetable.push(toggleableSubject);

    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex] = dayInTimetable;
    setTimetable(updatedTimetable);
    localStorage.setItem('timetable', JSON.stringify(updatedTimetable));
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <>
      <div className={styles.container}>
        <div className={styles['subject-container']}>
          <p><b>Subjects</b> (separate by comma)</p>
          <textarea
            className={styles.subjects}
            id="subjects"
            value={subjects.join(',')} // Join the subjects array into a comma-separated string for the textarea
            onChange={subjectsChangeHandler}
            placeholder="Maths,English,Science"
          />
        </div>
        <div className={styles['attendance-container']}>
          <p>Attendance <b>Report</b></p>
          {subjects.map((subject, index) => {
            if (subject === '' || subject === undefined) return null; // Skip empty or undefined subjects
            return (
              <div key={index} className={styles['attendance-report']}>
                <div className={styles['subject-name']}>
                  <h3>{subject}</h3>
                </div>
                <div className={styles['subject-attendance']}>
                  <h4>{attendance[index] || 'N/A'}</h4> {/* Display the corresponding attendance from the attendance array */}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles['timetable-container']}>
          <p>Timetable</p>
          <div className={styles['timetable-holder']}>
            {days.map((day, index) => {
              return (
                <div key={index} className={styles['timetable-day']}>
                  <h3>{day}</h3>
                  <div className={styles['timetable-subjects']}>
                    {subjects.map((subject, subjIndex) => {
                      if (subject === '' || subject === undefined) return null; // Skip empty or undefined subjects
                      return (
                        <div key={subjIndex} className={styles['timetable-subject']}>
                          <input
                            type="checkbox"
                            name={`subject-${subject}`}
                            id={`${subject}-button`}
                            className={styles['checkbox']}
                            onChange={() => toggleSubject(day, subject)}
                            checked={timetable[index].includes(subject)}
                          />
                          <label htmlFor={`${subject}-button`}>{subject}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
