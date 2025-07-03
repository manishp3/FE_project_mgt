export const convertInputedToMainFormat = (time) => {
    console.log("im called on step 1", time, typeof time);

    if (!time || typeof time != "string") {
        return { formatted: null, isValid: false }
    }
    const trimmedTime = time.trim().toLowerCase()
    console.log("im called on step trimmedTime 2", trimmedTime);
    if (trimmedTime == "") {
        return { formatted: null, isValid: false }
    }
    console.log("im called on step 3");

    const parts = trimmedTime.split(/\s+/);
    const validPartRegex = /^(\d+)([mhdw])$/;
    let totalMinutes = 0
    let totalHour = 0;
    console.log("im called on step 4");

    for (const part of parts) {
        console.log("im called on step 5");
        const match = part.match(validPartRegex)
        if (!match) {
            console.log("im called on step 6");
            return { formatted: null, isValid: false }
        }
        else {
            console.log("im called on step 7");
            console.log("log of time match ::", match);

            const value = parseInt(match[1], 10)
            const unit = match[2]
            // if (unit == "m" && value % 5 != 0) {
            //     return {
            //         formatted: null,
            //         // minutes: 0,
            //         // hours: 0,
            //         // roundedHours: 0,
            //         isValid: false,
            //         error: `Minute value ${value} must be divisible by 5`
            //     };
            // }
            switch (unit) {
                case 'm':
                    totalHour += value / 60
                    totalMinutes += value
                    break;
                case 'h':
                    totalHour += value
                    totalMinutes += value * 60
                    break;
                case 'd':
                    totalHour += value * 24
                    totalMinutes += value * 60 * 24;
                    break;
                case 'w':
                    totalHour += value * 24 * 7
                    totalMinutes += value * 60 * 24 * 7;
                    break;
            }
        }
    }
    totalHour = totalMinutes / 60
    const dishour = Number.isInteger(totalHour) ? totalHour : totalHour.toFixed(1)
    console.log("im called on step totalHour 8::", totalMinutes);
    console.log("im called on step totalHour 8.1::", totalHour);
    console.log("im called on step totalHour 8.2::", dishour);
    const weeks = Math.floor(totalMinutes / (7 * 24 * 60))
    totalMinutes %= (7 * 24 * 60)
    const days = Math.floor(totalMinutes / (24 * 60))
    totalMinutes %= (24 * 60)
    const hours = Math.floor(totalMinutes / (60))
    console.log("im called on step hour::", hours);

    const minutes = totalMinutes % 60;
    console.log("im called on step min::", totalMinutes);
    let formattedTime = "";
    if (weeks > 0) formattedTime += `${weeks}w `;
    if (days > 0) formattedTime += `${days}d `;
    if (hours > 0) formattedTime += `${hours}h `;
    if (minutes > 0) formattedTime += `${minutes}m`;
    console.log("im called on step 9");
    return { formatted: Number(formattedTime), isValid: true, totalHour: Number(dishour) }
}



export const convertDecimalHoursToFormat = (decimalHour) => {
    if (!decimalHour) return "";

    // Convert total hours to total minutes
    let totalMinutes = Math.round(decimalHour * 60);

    const weeks = Math.floor(totalMinutes / (7 * 24 * 60));
    totalMinutes %= (7 * 24 * 60);

    const days = Math.floor(totalMinutes / (24 * 60));
    totalMinutes %= (24 * 60);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let formatted = "";
    if (weeks > 0) formatted += `${weeks}w `;
    if (days > 0) formatted += `${days}d `;
    if (hours > 0) formatted += `${hours}h `;
    if (minutes > 0) formatted += `${minutes}m`;
console.log("log of formatted data::",formatted);

    return formatted.trim();
};





