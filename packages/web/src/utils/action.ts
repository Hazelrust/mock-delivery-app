export const isDuringTimePeriod = (openTimeStr : string, closeTimeStr : string): boolean => {
    const [openHour, openMinute] = openTimeStr.split(':').map(Number)
    const [endHour, endMinute] = closeTimeStr.split(':').map(Number)
    
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    const openTime = new Date()
    openTime.setHours(openHour, openMinute, 0, 0)

    const closeTime = new Date()
    closeTime.setHours(endHour, endMinute, 0, 0)

    const currentTime = new Date()
    currentTime.setHours(currentHour, currentMinute, 0, 0)
    
    // Check if current time is during in open and close time
    return currentTime >= openTime && currentTime <= closeTime
}