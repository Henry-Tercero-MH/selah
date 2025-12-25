/**
 * Google Apps Script para SELAH Cafetería
 * Este script permite escribir datos en Google Sheets desde la app web
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

// ID de tu Google Sheet (automático)
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_NAME = 'Productos';

/**
 * Manejar peticiones POST desde la app
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    let result;

    switch(action) {
      case 'addProduct':
        result = addProduct(data.product);
        break;
      case 'updateProduct':
        result = updateProduct(data.productId, data.product);
        break;
      case 'deleteProduct':
        result = deleteProduct(data.productId);
        break;
      default:
        throw new Error('Acción no válida');
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
 * Agregar nuevo producto
 */
function addProduct(productArray) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Hoja "Productos" no encontrada');
  }

  // Agregar nueva fila al final
  sheet.appendRow(productArray);

  return { message: 'Producto agregado exitosamente' };
}

/**
 * Actualizar producto existente
 */
function updateProduct(productId, productArray) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Hoja "Productos" no encontrada');
  }

  const data = sheet.getDataRange().getValues();

  // Buscar la fila con el ID del producto (columna A)
  for (let i = 1; i < data.length; i++) { // Empezar en 1 para saltar header
    if (data[i][0] == productId) {
      // Actualizar la fila (i+1 porque las filas empiezan en 1, no en 0)
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
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Hoja "Productos" no encontrada');
  }

  const data = sheet.getDataRange().getValues();

  // Buscar la fila con el ID del producto
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == productId) {
      // Eliminar la fila (i+1 porque las filas empiezan en 1)
      sheet.deleteRow(i + 1);

      return { message: 'Producto eliminado exitosamente', row: i + 1 };
    }
  }

  throw new Error('Producto no encontrado con ID: ' + productId);
}

/**
 * Probar conexión (GET request)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script funcionando correctamente',
      sheetId: SHEET_ID,
      sheetName: SHEET_NAME
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
