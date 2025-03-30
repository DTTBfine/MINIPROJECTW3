export const formatTime = (time) => {
    // time có định dạng "HH:MM:SS"
    const [hours, minutes] = time.split(':');

    const formatString = `${hours}:${minutes}`

    return { hours, minutes, formatString };  // Trả về định dạng "HH:MM"
}

export const formatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    let day = date.getDate();

    // Thêm số 0 ở đầu nếu tháng hoặc ngày có một chữ số
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
}

export const hideUuid = (uuid) => {
    if (!uuid) return '';

    const firstFour = uuid.substring(0, 4);
    const lastFour = uuid.substring(uuid.length - 4);
    const hiddenPart = '*'.repeat(uuid.length - 8); // Số lượng dấu * cần ẩn đi

    return `${firstFour}${hiddenPart}${lastFour}`;
};