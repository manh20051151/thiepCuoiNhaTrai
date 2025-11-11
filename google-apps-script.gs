/**
 * GOOGLE APPS SCRIPT - LƯU DỮ LIỆU THIỆP CƯỚI VÀO GOOGLE SHEETS
 * 
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Mở Google Sheets tại: https://sheets.google.com
 * 2. Tạo spreadsheet mới tên: "Thiep_Cuoi_RSVP"
 * 3. Tạo header row với các cột:
 *    A1: Thời gian
 *    B1: Tên
 *    C1: Lời nhắn
 *    D1: Có đến không
 *    E1: Số người
 *    F1: Khách của ai
 * 4. Extensions > Apps Script
 * 5. Dán code này vào
 * 6. Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy URL deployment và dán vào script.js
 */

// Hàm xử lý GET request (test)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'success',
      message: 'Google Apps Script đang hoạt động!',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Hàm xử lý POST request (nhận dữ liệu từ website)
function doPost(e) {
  try {
    // Lấy spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dữ liệu từ request
    var data = JSON.parse(e.postData.contents);
    
    // Lấy thời gian hiện tại (múi giờ Việt Nam)
    var timestamp = Utilities.formatDate(
      new Date(), 
      "Asia/Ho_Chi_Minh", 
      "dd/MM/yyyy HH:mm:ss"
    );
    
    // Tạo row mới với dữ liệu
    var newRow = [
      timestamp,                    // A: Thời gian
      data.name || '',              // B: Tên
      data.message || '',           // C: Lời nhắn
      data.attending || '',         // D: Có đến không
      data.guests || '',            // E: Số người
      data.side || ''               // F: Khách của ai
    ];
    
    // Thêm row vào sheet
    sheet.appendRow(newRow);
    
    // Trả về response thành công
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Đã lưu dữ liệu thành công!',
        data: {
          name: data.name,
          timestamp: timestamp
        }
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Trả về response lỗi
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm kiểm tra và tạo header nếu chưa có
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Kiểm tra nếu row đầu tiên trống
  if (sheet.getRange('A1').getValue() === '') {
    var headers = [
      'Thời gian',
      'Tên',
      'Lời nhắn',
      'Có đến không',
      'Số người',
      'Khách của ai'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Định dạng header
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#4a86e8')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setHorizontalAlignment('center');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    Logger.log('✅ Đã tạo header thành công!');
  }
}

