/**
 * subject {
 *  days : [],
 *  attendance: [attended,total],
 *  todaysAttendance: {
 *    day: 'Monday',
 *    attendance: 1
 *  }
 * }
 */

export const daysInWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const blankSubject = {
    days: [],
    attendance: [0, 0],
    todaysAttendance: {
        day: '',
        attendance: 0
    }
};

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const setSubjectsFromCSV = (csvSubjects) => {
    let subs = csvSubjects.split(',');
    subs = subs.map(sub => sub.trim());
    subs = subs.filter(sub => sub.length > 0);
    localStorage.setItem('subjects', JSON.stringify(subs));
}


const getAllSubjects = () => {
    const subs = localStorage.getItem('subjects');
    if (subs) {
        return JSON.parse(subs);
    }
    return [];
}

const setDaysforSubject = (subject, days) => {
    let sub = JSON.parse(localStorage.getItem(subject));
    if (sub) {
        sub.days = days;
    } else {
        sub = {
            days: days,
            attendance: [0, 0]
        };
    }
    localStorage.setItem(subject, JSON.stringify(sub));
};


const getDaysforSubject = (subject) => {
    const sub = JSON.parse(localStorage.getItem(subject));
    if (sub) {
        return sub.days;
    }
    return [];
}

const getSubjectsforDay = (day) => {
    const subs = getAllSubjects();
    const subsForDay = subs.filter(sub => {
        const days = getDaysforSubject(sub);
        return days.includes(day);
    });
    return subsForDay;
}

const addDayForSubject = (subject, day) => {
    const days = getDaysforSubject(subject);
    if (!days.includes(day)) {
        days.push(day);
    }
    setDaysforSubject(subject, days);
}

const removeDayForSubject = (subject, day) => {
    const days = getDaysforSubject(subject);
    if (days.includes(day)) {
        days.splice(days.indexOf(day), 1);
    }
    setDaysforSubject(subject, days);
}

const toggleDayForSubject = (subject, day) => {
    const days = getDaysforSubject(subject);
    if (days.includes(day)) {
        days.splice(days.indexOf(day), 1);
    } else {
        days.push(day);
    }
    setDaysforSubject(subject, days);
}

const setAttendanceForSubject = (subject, attendance) => {
    let sub = JSON.parse(localStorage.getItem(subject));
    if (sub) {
        sub.attendance = attendance;
    } else {
        sub = {
            days: [],
            attendance: attendance
        };
    }
    localStorage.setItem(subject, JSON.stringify(sub));
};

const getAttendanceForSubject = (subject) => {
    const sub = JSON.parse(localStorage.getItem(subject));
    if (sub) {
        return sub.attendance;
    }
    return [];
}

const setTodaysAttendanceForSubject = (subject, value) => {

    const today = daysInWeek[new Date().getDay()];

    const subjectData = JSON.parse(localStorage.getItem(subject));
    if (subjectData && subjectData.todaysAttendance && subjectData.todaysAttendance.day !== today) {
        delete subjectData.todaysAttendance;
    }

    const subData = JSON.parse(localStorage.getItem(subject)) || {
        days: [],
        attendance: [0, 0],
    };

    if (subData.todaysAttendance !== undefined) {
        if (value === 1) {
            if (subData.todaysAttendance.attendance === 0) {
                subData.attendance[0] += 1;
            } else if (subData.todaysAttendance.attendance === -1) {
                subData.attendance[0] += 1;
                subData.attendance[1] += 1;
            }
        } else if (value === 0) {
            if (subData.todaysAttendance.attendance === 1) {
                subData.attendance[0] -= 1;
            } else if (subData.todaysAttendance.attendance === -1) {
                subData.attendance[1] += 1;
            }
        }
        else if (value === -1) {
            if (subData.todaysAttendance.attendance === 1) {
                subData.attendance[0] -= 1;
                subData.attendance[1] -= 1;
            } else if (subData.todaysAttendance.attendance === 0) {
                subData.attendance[1] -= 1;
            }
        }
    } else {
        if (value === 1) {
            subData.attendance[0] += 1;
            subData.attendance[1] += 1;
        } else if (value === 0) {
            subData.attendance[1] += 1;
        }
    }

    subData.todaysAttendance = {
        day: today,
        attendance: value,
    };

    localStorage.setItem(subject, JSON.stringify(subData));
}

const getTodaysAttendanceForSubject = (subject) => {
    const subData = JSON.parse(localStorage.getItem(subject));
    if (subData && subData.todaysAttendance) {
        return subData.todaysAttendance.attendance;
    }
    return -1;
}

const getAttendancePercentageForSubject = (subject) => {
    const attendance = getAttendanceForSubject(subject);
    const percent = Math.floor((attendance[0] / attendance[1]) * 100);
    if (isNaN(percent)) {
        return 100;
    }
    return percent;
}

const getAttendancePercentageForDay = (day) => {
    const subs = getSubjectsforDay(day);
    const attendance = subs.map(sub => getAttendancePercentageForSubject(sub));
    return attendance;
}

const getAttendancePercentageForAll = () => {
    const subs = getAllSubjects();
    const attendance = subs.map(sub => getAttendancePercentageForSubject(sub));
    return attendance;
}

const getAveragePercentageforAll = () => {
    const attendance = getAttendancePercentageForAll();
    const average = attendance.reduce((acc, curr) => acc + curr, 0) / attendance.length;
    return average;
}

const getUserName = () => {
    const name = localStorage.getItem('name');
    if (name) {
        return name;
    }
    setUserName('User');
    return 'User';
}

const setUserName = (name) => {
    localStorage.setItem('name', name);
}


export {
    getCurrentDate,
    setSubjectsFromCSV,
    getAllSubjects,
    setDaysforSubject,
    getDaysforSubject,
    getSubjectsforDay,
    addDayForSubject,
    removeDayForSubject,
    setAttendanceForSubject,
    getAttendanceForSubject,
    getAttendancePercentageForSubject,
    getAttendancePercentageForDay,
    getAttendancePercentageForAll,
    toggleDayForSubject,
    setTodaysAttendanceForSubject,
    getUserName,
    getTodaysAttendanceForSubject,
    setUserName,
    getAveragePercentageforAll,
};