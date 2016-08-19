export function mapDay(dayin) {
    return (dayin == 0) ? 7 : dayin;
}

export function hasDayPassed(dayNumber) {
    let courseTime = new Date();
    if (dayNumber < mapDay(courseTime.getDay())) {
        return true;
    } else {
        return false;
    }
}

export function hasTimePassed(dayNumber, startTime) {
    let courseTime = getCourseTimeLocal(0, startTime, dayNumber);
    if (courseTime.getTime() < Date.now()) {
        return true;
    } else {
        return false;
    }
}


export function sameDay(dayNumber) {
    let courseTime = new Date();
    if (dayNumber === mapDay(courseTime.getDay())) {
        return true;
    } else {
        return false;
    }
}

export function timeToMoment(startTime) {
    return startTime - Date.now();
}

export function getCourseTimeUTC(weeksForward, timeOfStart, dayNumber) {
    let courseTimeUTC = getCourseTimeLocal(weeksForward, timeOfStart, dayNumber);
    courseTimeUTC.setTime(courseTimeUTC.getTime() + courseTimeUTC.getTimezoneOffset() * 60 * 1000);
}

export function getCourseTimeLocal(weeksForward, timeOfStart, dayNumber) {

    let courseTime = new Date();
    let dayNum = courseTime.getDay()
    dayNum = (dayNum == 0) ? 7 : dayNum;
    let daysToAdd = weeksForward * 7 + dayNumber - dayNum;

    courseTime.setHours(0);
    courseTime.setMinutes(0);
    courseTime.setSeconds(0);
    courseTime.setMilliseconds(0);
    courseTime.setTime(courseTime.getTime() + daysToAdd * 24 * 60 * 60 * 1000 + timeOfStart);

    return courseTime;
}

export function daysLeft(time){
    let today = new Date();
    let duration = 0;
    let daysLeft = 0;
    if(time != 0){
      duration = time - today.getTime()
      return Math.round(duration / (24*60*60*1000))
    } else {
      return 0;
    }
  }

export function getDayStrMs(ms) {
    let day = new Date();
    day.setTime(ms);
    return getDayStr(day)
}

export function toMilliseconds(time) {
    let hours = 0;
    let minutes = 0;

    minutes = time % 100
    hours = (time - minutes) / 100

    return (hours * 3600000) + (minutes * 60000)
}

export function toHplusMfromMs(ms) {
    let hours = 0;
    let hoursMs = 0;
    let minutes = 0;
    let minutesMs = 0;
    minutesMs = ms % 3600000
    hoursMs = ms - minutesMs
    minutes = minutesMs / 60000
    hours = hoursMs / 3600000
    return hours * 100 + minutes
}

export function getTimeStrMsBeginnignOfDay(ms) {
    let day = new Date();
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    day.setTime(day.getTime() + ms);
    return getTimeStr(day);
}

export function getTimeStrMs(ms) {
    let day = new Date();
    day.setTime(ms)
    return getTimeStr(day)
}

export function getDayStr(day) {
    let month = day.getMonth() + 1
    let weekday = day.getDay();
    let weekdays = ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai']
    return weekdays[weekday] + " " + day.getDate() + "." + month + "." + day.getFullYear()
}

export function getTimeStr(day) {
    return day.toTimeString().slice(0, 5)
}