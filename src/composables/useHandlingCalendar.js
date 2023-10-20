const isLeapYear = (year) => {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    }
    return false;
};

export const getNumberOfDaysInMonth = (year, month) => {
    switch (month) {
        case 1:
            return 31;
        case 2:
            if (isLeapYear(year)) return 29;
            return 28;
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
    }
};

export const getStartDay = (year, month) => {
    const startDay = 3; // 1800년 1월 1일 수요일
    const totalNumberOfDays = getTotalNumberOfDays(year, month);
    return (startDay + totalNumberOfDays) % 7;
};

const getTotalNumberOfDays = (year, month) => {
    let total = 0;
    for (let i = 1800; i < year; i++) {
        if (isLeapYear(i)) {
            total += 366;
        } else {
            total += 365;
        }
    }
    for (let i = 1; i < month; i++) {
        total += getNumberOfDaysInMonth(year, i);
    }
    return total;
};
