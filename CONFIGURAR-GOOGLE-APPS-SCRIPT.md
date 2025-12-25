# 📝 Configurar Google Apps Script - Sincronización Bidireccional

## 🎯 Objetivo
Permitir que el panel de administración **escriba** productos directamente en Google Sheets, no solo leerlos.

---

## 🚀 Pasos para Configurar

### 1️⃣ Abrir Google Apps Script

1. Abre tu Google Sheet: [https://docs.google.com/spreadsheets/d/10GzvoQx7mBNR_HFLSxvzFOBa5t-Zk77VRdilgHekS6Y/edit](https://docs.google.com/spreadsheets/d/10GzvoQx7mBNR_HFLSxvzFOBa5t-Zk77VRdilgHekS6Y/edit)

2. En el menú superior, click en:
   ```
   Extensions → Apps Script
   ```

3. Se abrirá una nueva pestaña con el editor de Apps Script

---

### 2️⃣ Pegar el Código

1. **Borra todo el código** que aparece por defecto (function myFunction() {...})

2. **Copia el código** del archivo: `google-apps-script/Code.gs`

3. **Pega el código completo** en el editor de Apps Script

4. El código debe verse así al inicio:
   ```javascript
   const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
   const SHEET_NAME = 'Productos';

   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents);
       ...
   ```

---

### 3️⃣ Guardar el Proyecto

1. Click en el **ícono de disco** 💾 o presiona `Ctrl + S`

2. Dale un nombre al proyecto:
   ```
   SELAH - Menu API
   ```

3. Click **"OK"**

---

### 4️⃣ Hacer Deploy (Publicar)

1. En la parte superior, click en **"Deploy"** → **"New deployment"**

2. Click en el **ícono de engranaje** ⚙️ junto a "Select type"

3. Selecciona **"Web app"**

4. Configura:
   - **Description**: "API para administrar productos SELAH"
   - **Execute as**: **"Me"** (tu cuenta)
   - **Who has access**: **"Anyone"** ⚠️ IMPORTANTE

5. Click **"Deploy"**

6. Aparecerá un mensaje de autorización:
   - Click **"Authorize access"**
   - Selecciona tu cuenta de Google
   - Click **"Advanced"** (Avanzado)
   - Click **"Go to SELAH - Menu API (unsafe)"** (Ir a...)
   - Click **"Allow"** (Permitir)

7. **¡MUY IMPORTANTE!** Copia la **URL del Web app**
   - Se ve así:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXX/exec
   ```
   - **Guarda esta URL**, la necesitarás en el siguiente paso

---

### 5️⃣ Configurar la URL en la App

1. Abre el archivo:
   ```
   cafe-menu/src/services/googleSheetsWriteService.js
   ```

2. Busca la línea 13:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/TU_DEPLOYMENT_ID_AQUI/exec';
   ```

3. **Reemplaza** con la URL que copiaste:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXX/exec';
   ```

4. **Guarda el archivo** (Ctrl + S)

---

### 6️⃣ Probar la Conexión

1. Abre tu app en el navegador: `http://localhost:5173`

2. Click en el botón **⚙️** (engranaje) para abrir el panel de admin

3. Ingresa la contraseña: `selah2024`

4. Click en **"Agregar Producto"**

5. Llena el formulario de prueba:
   - **Nombre**: "Producto de Prueba"
   - **Categoría**: "licuados"
   - **Precio**: 10.00
   - Llena los demás campos básicos

6. Click en **"Crear Producto"**

7. **Verifica en Google Sheets**:
   - Abre tu Google Sheet
   - Ve a la pestaña **"Productos"**
   - Debería aparecer el nuevo producto en la última fila

---

## ✅ Confirmación de que Funciona

Si todo está bien configurado:

1. ✅ El producto aparece en Google Sheets
2. ✅ El producto aparece en la app inmediatamente
3. ✅ No aparecen errores en la consola (F12)
4. ✅ Al recargar la página, el producto sigue ahí

---

## 🔧 Solución de Problemas

### ❌ Error: "Script function not found: doPost"
**Solución**:
- Verifica que pegaste TODO el código completo
- El código debe empezar con `const SHEET_ID = ...`
- Guarda el archivo de nuevo

### ❌ Error: "Permission denied"
**Solución**:
- En el deploy, verifica que "Who has access" sea **"Anyone"**
- Re-deploy el script:
  1. Deploy → Manage deployments
  2. Click en ✏️ Edit
  3. Cambia a "Anyone"
  4. Click "Deploy"

### ❌ Error: "The caller does not have permission"
**Solución**:
- Asegúrate de autorizar el script completamente
- Sigue todos los pasos de autorización, incluyendo "unsafe"

### ❌ Los productos no aparecen en Google Sheets
**Solución**:
- Verifica que la pestaña se llame exactamente **"Productos"** (con P mayúscula)
- Verifica que copiaste la URL correcta en `googleSheetsWriteService.js`
- Abre la consola (F12) y busca errores

### ❌ Error: "Cannot read property 'postData' of undefined"
**Solución**:
- Esto significa que la URL está mal configurada
- Verifica que copiaste la URL completa que termina en `/exec`
- NO uses la URL del Google Sheet, usa la URL del Web App

---

## 🔄 Cómo Funciona

### Flujo de Datos:

1. **Usuario crea/edita/elimina** producto en el Panel de Admin
2. **App envía datos** a Google Apps Script (POST request)
3. **Apps Script escribe** en Google Sheet
4. **App actualiza** la vista local inmediatamente
5. **Otros usuarios** verán los cambios al recargar

### Arquitectura:

```
Panel Admin (React)
     ↓
googleSheetsWriteService.js
     ↓
Google Apps Script (Code.gs)
     ↓
Google Sheets (Productos)
```

---

## 📊 Funciones del Script

El script que pegaste tiene 4 funciones principales:

### 1. `doPost(e)` - Recibe peticiones
- Procesa las peticiones POST desde la app
- Determina qué acción realizar (add, update, delete)

### 2. `addProduct(productArray)` - Agregar producto
- Agrega una nueva fila al final del sheet
- Retorna confirmación

### 3. `updateProduct(productId, productArray)` - Actualizar producto
- Busca el producto por ID
- Actualiza toda la fila
- Retorna confirmación

### 4. `deleteProduct(productId)` - Eliminar producto
- Busca el producto por ID
- Elimina la fila completa
- Retorna confirmación

---

## 🔐 Seguridad

### ¿Es seguro hacer el script público?

✅ **SÍ**, porque:
- Solo permite operaciones en TU Google Sheet
- Solo tú puedes editar el script
- Las peticiones pasan por Google Apps Script (no acceso directo)
- Puedes agregar validación adicional si quieres

### Mejoras de Seguridad Opcionales:

1. **Agregar validación de origen**:
   ```javascript
   // Al inicio de doPost(e)
   const allowedOrigins = ['http://localhost:5173', 'https://tu-dominio.com'];
   const origin = e.parameter.origin;
   if (!allowedOrigins.includes(origin)) {
     throw new Error('Origen no autorizado');
   }
   ```

2. **Agregar API Key secreta**:
   ```javascript
   const SECRET_KEY = 'tu-clave-secreta-aqui';
   if (data.apiKey !== SECRET_KEY) {
     throw new Error('API Key inválida');
   }
   ```

---

## 🎨 Personalización

### Cambiar el nombre de la hoja:

Si tu pestaña NO se llama "Productos", edita línea 14 del script:

```javascript
const SHEET_NAME = 'TuNombreDeHoja';
```

### Agregar logging:

Para ver qué hace el script, agrega:

```javascript
Logger.log('Producto agregado: ' + JSON.stringify(productArray));
```

Luego ve a: **Execution log** en el editor de Apps Script

---

## 🚀 Próximos Pasos

Una vez configurado:

1. ✅ Puedes administrar productos desde la app
2. ✅ Los cambios se guardan en Google Sheets automáticamente
3. ✅ Todos los usuarios ven los mismos productos
4. ✅ Tienes backup automático en Google Drive
5. ✅ Puedes compartir el Sheet con tu equipo

---

## 📱 Uso en Producción

Cuando publiques la app:

1. Actualiza la lista de orígenes permitidos
2. Considera agregar autenticación adicional
3. Monitorea el uso en Apps Script dashboard
4. Configura notificaciones de errores

---

## 🆘 Ayuda Adicional

### Ver Logs de Ejecución:
1. En Apps Script editor
2. Click en **"Executions"** (lado izquierdo)
3. Verás todas las ejecuciones y errores

### Probar el Script Directamente:
1. En Apps Script editor
2. Selecciona la función `doGet` arriba
3. Click en **"Run"**
4. Debería retornar: "Google Apps Script funcionando correctamente"

---

**¡Listo! Ahora tienes sincronización bidireccional completa con Google Sheets! 🎉**
