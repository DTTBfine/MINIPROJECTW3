export const formatTime = (time) => {
    // time có định dạng "HH:MM:SS"
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;  // Trả về định dạng "HH:MM"
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