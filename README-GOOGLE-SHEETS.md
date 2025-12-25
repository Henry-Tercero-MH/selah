# 🚀 Guía Rápida: Conectar con Google Sheets

## ✅ Pasos Rápidos (5 minutos)

### 1️⃣ Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja: **"SELAH - Menu Digital"**
3. Crea una pestaña llamada **"Productos"**

### 2️⃣ Configurar Columnas
En la **fila 1**, copia estas columnas exactamente:

```
ID | Nombre | Categoría | Precio | Moneda | Descripción | Descripción Larga | Imagen URL | Color | Icono | Popular | Calorías | Tiempo Prep | Ingredientes | Tags | Tamaños
```

### 3️⃣ Agregar Productos
**Ejemplo de fila 2** (copia y pega):

```
1 | Licuado de Fresa | licuados | 15.00 | Q | Delicioso licuado de fresa fresca | Preparado con fresas frescas de temporada | https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd | #D84315 | FaStrawberry | true | 180 | 5 min | ["Fresas","Leche","Azúcar","Hielo"] | ["frutal","cremoso"] | [{"name":"Regular","price":15.00}]
```

### 4️⃣ Hacer Pública la Hoja
1. Click en **"Compartir"** (arriba a la derecha)
2. Click **"Cambiar a cualquier persona con el enlace"**
3. Permisos: **"Lector"**
4. Click **"Listo"**

### 5️⃣ Obtener el ID del Sheet
De la URL:
```
https://docs.google.com/spreadsheets/d/ABC123XYZ_ESTE_ES_TU_ID/edit
```
Copia solo: `ABC123XYZ_ESTE_ES_TU_ID`

### 6️⃣ Configurar Google Cloud

#### A. Crear Proyecto
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Nuevo Proyecto"**
3. Nombre: **"SELAH Menu"**
4. Click **"Crear"**

#### B. Habilitar API
1. En el menú → **"APIs y servicios"** → **"Biblioteca"**
2. Busca: **"Google Sheets API"**
3. Click **"Habilitar"**

#### C. Crear API Key
1. **"APIs y servicios"** → **"Credenciales"**
2. Click **"+ CREAR CREDENCIALES"**
3. Selecciona **"Clave de API"**
4. **Copia la API Key** (guárdala segura)

### 7️⃣ Configurar la App

Abre el archivo:
```
cafe-menu/src/services/googleSheetsService.js
```

Reemplaza estas líneas:
```javascript
const SHEET_ID = 'TU_SHEET_ID_AQUI'; // ← Pega tu Sheet ID
const API_KEY = 'TU_API_KEY_AQUI'; // ← Pega tu API Key
```

### 8️⃣ ¡Probar!

1. Guarda el archivo
2. La app se recargará automáticamente
3. Verás en la esquina superior derecha:
   - ✅ **"Conectado a Google Sheets"** si todo funciona
   - ⚠️ **"Usando datos locales"** si algo falla

---

## 📝 Guía de Valores

### Categorías (columna C):
- `licuados`
- `cafe`
- `comida`
- `postres`

### Colores (columna I):
- `#D84315` (Terracota)
- `#FF6F00` (Naranja)
- `#7CB342` (Verde)
- `#FFA000` (Ámbar)
- `#FFB300` (Amarillo)
- `#5D4037` (Café oscuro)
- `#8D6E63` (Café claro)

### Iconos (columna J):
- `FaStrawberry` (Fresa)
- `FaCoffee` (Café)
- `FaLeaf` (Natural)
- `FaPizzaSlice` (Comida)
- `FaIceCream` (Postres)

### Popular (columna K):
- `true` = Producto destacado
- `false` = Producto normal

### Arrays (columnas N, O, P):

**Ingredientes:**
```
["Fresas","Leche","Azúcar","Hielo"]
```

**Tags:**
```
["frutal","cremoso","vitaminas"]
```

**Tamaños:**
```
[{"name":"Regular","price":15.00},{"name":"Grande","price":18.00}]
```

---

## 🎯 Ventajas

✅ **Edita desde cualquier lugar** - Solo necesitas internet
✅ **Sin código** - Usa Google Sheets como Excel
✅ **Tiempo real** - Cambios al refrescar la página
✅ **Colaborativo** - Varias personas pueden editar
✅ **Gratis** - Sin costos adicionales
✅ **Backup automático** - Google guarda todo

---

## 🔧 Solución de Problemas

### ❌ "Usando datos locales"
✅ Verifica que copiaste bien el SHEET_ID y API_KEY
✅ Verifica que el Sheet sea público
✅ Verifica que habilitaste Google Sheets API
✅ Abre la consola del navegador (F12) para ver errores

### ❌ "No se encontraron datos"
✅ Verifica que la hoja se llame **"Productos"** (mayúscula la P)
✅ Verifica que tienes al menos 1 fila de datos (fila 2)
✅ Verifica que las columnas estén en el orden correcto

### ❌ Los cambios no se reflejan
✅ Refresca el navegador (F5 o Ctrl+R)
✅ Verifica que guardaste los cambios en Google Sheets
✅ Limpia caché del navegador

---

## 📞 ¿Necesitas Ayuda?

1. Abre la consola del navegador: **F12**
2. Ve a la pestaña **"Console"**
3. Busca mensajes de error en rojo
4. Lee la documentación completa en: `GOOGLE-SHEETS-CONFIG.md`

---

**¡Listo!** Ahora puedes administrar tu menú desde Google Sheets sin tocar código 🎉
