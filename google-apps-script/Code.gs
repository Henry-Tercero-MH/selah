/**
 * Google Apps Script para SELAH Cafetería
 * Este script permite escribir datos en Google Sheets desde la app web
 *
 * Maneja:
 * - Productos (CRUD)
 * - Pedidos (para Dashboard)
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Abre tu Google Sheet
 * 2. Extensions → Apps Script
 * 3. Borra el código por defecto
 * 4. Pega este código completo
 * 5. Click "Deploy" → "New deployment"
 * 6. Type: "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Click "Deploy"
 * 10. Copia la URL generada
 */

// Nombres de las hojas
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const PRODUCTS_SHEET = 'Productos';
const ORDERS_SHEET = 'Pedidos';

/**
 * Manejar peticiones POST desde la app
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    let result;

    switch(action) {
      // === PRODUCTOS ===
      case 'addProduct':
        result = addProduct(data.product);
        break;
      case 'updateProduct':
        result = updateProduct(data.productId, data.product);
        break;
      case 'deleteProduct':
        result = deleteProduct(data.productId);
        break;

      // === PEDIDOS ===
      case 'addOrder':
        result = addOrder(data.order);
        break;
      case 'getOrders':
        result = getOrders(data.startDate, data.endDate);
        break;

      default:
        throw new Error('Acción no válida: ' + action);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, result: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Manejar peticiones GET (para obtener datos)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'getOrders') {
      const orders = getAllOrders();

      // Crear respuesta con headers CORS
      const output = ContentService.createTextOutput(JSON.stringify({
        success: true,
        orders: orders
      }))
      .setMimeType(ContentService.MimeType.JSON);

      return output;
    }

    // Respuesta por defecto
    const output = ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script funcionando correctamente',
      sheetId: SHEET_ID,
      sheets: [PRODUCTS_SHEET, ORDERS_SHEET]
    }))
    .setMimeType(ContentService.MimeType.JSON);

    return output;

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// FUNCIONES DE PRODUCTOS
// ========================================

/**
 * Agregar nuevo producto
 */
function addProduct(productArray) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PRODUCTS_SHEET);

  if (!sheet) {
    throw new Error('Hoja "Productos" no encontrada');
  }

  sheet.appendRow(productArray);
  return { message: 'Producto agregado exitosamente' };
}

/**
 * Actualizar producto existente
 */
function updateProduct(productId, productArray) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PRODUCTS_SHEET);

  if (!sheet) {
    throw new Error('Hoja "Productos" no encontrada');
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == productId) {
      const rowNumber = i + 1;
      const range = sheet.getRange(rowNumber, 1, 1, productArray.length);
      range.setValues([productArray]);

      return { message: 'Producto actualizado exitosamente', row: rowNumber };
    }
  }

  throw new Error('Producto no encontrado con ID: ' + productId);
}

/**
 * Eliminar producto
 */
function deleteProduct(productId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PRODUCTS_SHEET);

  if (!sheet) {
    throw new Error('Hoja "Productos" no encontrada');
  }

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == productId) {
      sheet.deleteRow(i + 1);
      return { message: 'Producto eliminado exitosamente', row: i + 1 };
    }
  }

  throw new Error('Producto no encontrado con ID: ' + productId);
}

// ========================================
// FUNCIONES DE PEDIDOS
// ========================================

/**
 * Agregar nuevo pedido
 */
function addOrder(orderData) {
  const sheet = getOrCreateOrdersSheet();

  // Formato: [ID, Timestamp, Fecha, Hora, Total, Items, Productos (JSON), Hour, DayOfWeek, Status]
  const row = [
    orderData.id,
    orderData.timestamp,
    orderData.date,
    orderData.time,
    orderData.total,
    orderData.itemCount,
    JSON.stringify(orderData.items),
    orderData.hour || 0,
    orderData.dayOfWeek || 0,
    orderData.status || 'completed'
  ];

  sheet.appendRow(row);
  return { message: 'Pedido guardado exitosamente', orderId: orderData.id };
}

/**
 * Obtener todos los pedidos
 */
function getAllOrders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ORDERS_SHEET);

  if (!sheet) {
    return []; // Si no existe la hoja, retornar array vacío
  }

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return []; // Solo header o vacío
  }

  // Convertir a objetos
  const orders = [];
  for (let i = 1; i < data.length; i++) {
    try {
      orders.push({
        id: data[i][0],
        timestamp: data[i][1],
        date: data[i][2],
        time: data[i][3],
        total: parseFloat(data[i][4]),
        itemCount: parseInt(data[i][5]),
        items: JSON.parse(data[i][6] || '[]'),
        hour: parseInt(data[i][7] || 0),
        dayOfWeek: parseInt(data[i][8] || 0),
        status: data[i][9] || 'completed'
      });
    } catch (error) {
      Logger.log('Error parseando fila ' + i + ': ' + error);
    }
  }

  return orders;
}

/**
 * Obtener pedidos en un rango de fechas
 */
function getOrders(startDate, endDate) {
  const allOrders = getAllOrders();

  if (!startDate || !endDate) {
    return allOrders;
  }

  // Filtrar por rango de fechas
  return allOrders.filter(order => {
    const orderDate = new Date(order.timestamp);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return orderDate >= start && orderDate <= end;
  });
}

/**
 * Crear hoja de Pedidos si no existe
 */
function getOrCreateOrdersSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(ORDERS_SHEET);

  if (!sheet) {
    // Crear nueva hoja
    sheet = spreadsheet.insertSheet(ORDERS_SHEET);

    // Agregar headers
    const headers = [
      'ID',
      'Timestamp',
      'Fecha',
      'Hora',
      'Total (Q)',
      'Items',
      'Productos (JSON)',
      'Hour',
      'DayOfWeek',
      'Status'
    ];

    sheet.appendRow(headers);

    // Formatear headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#5D4037');
    headerRange.setFontColor('#FFFFFF');

    // Ajustar anchos de columna
    sheet.setColumnWidth(1, 200); // ID
    sheet.setColumnWidth(2, 150); // Timestamp
    sheet.setColumnWidth(3, 100); // Fecha
    sheet.setColumnWidth(4, 80);  // Hora
    sheet.setColumnWidth(5, 100); // Total
    sheet.setColumnWidth(6, 80);  // Items
    sheet.setColumnWidth(7, 400); // Productos JSON
    sheet.setColumnWidth(8, 60);  // Hour
    sheet.setColumnWidth(9, 90);  // DayOfWeek
    sheet.setColumnWidth(10, 100); // Status

    Logger.log('Hoja "Pedidos" creada exitosamente');
  }

  return sheet;
}
