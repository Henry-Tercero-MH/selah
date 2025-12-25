# 📊 Configuración de Google Sheets - SELAH Cafetería

## 🎯 Objetivo
Conectar el menú digital con Google Sheets para administrar productos fácilmente sin necesidad de editar código.

---

## 📋 Paso 1: Crear Google Sheet

### 1.1 Crear Nueva Hoja
1. Ir a [Google Sheets](https://sheets.google.com)
2. Crear una nueva hoja de cálculo
3. Nombrarla: **"SELAH - Menu Digital"**

### 1.2 Estructura de Columnas

Crear una hoja llamada **"Productos"** con las siguientes columnas en la fila 1:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ID | Nombre | Categoría | Precio | Moneda | Descripción | Descripción Larga | Imagen URL | Color | Icono | Popular | Calorías | Tiempo Prep | Ingredientes | Tags | Tamaños |

### 1.3 Ejemplo de Fila (Fila 2)

```
1 | Licuado de Fresa | licuados | 15.00 | Q | Delicioso licuado de fresa fresca y cremoso | Preparado con fresas frescas... | https://images.unsplash.com/photo-1589733955941... | #D84315 | FaStrawberry | true | 180 | 5 min | ["Fresas frescas","Leche","Azúcar","Hielo"] | ["frutal","cremoso","vitaminas"] | [{"name":"Regular","price":15.00},{"name":"Grande","price":18.00}]
```

---

## 🔑 Paso 2: Configurar Google Cloud Console

### 2.1 Crear Proyecto
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto: **"SELAH Menu"**
3. Seleccionar el proyecto

### 2.2 Habilitar Google Sheets API
1. En el menú lateral → **APIs y servicios** → **Biblioteca**
2. Buscar: **"Google Sheets API"**
3. Click en **"Habilitar"**

### 2.3 Crear Credenciales (API Key)
1. **APIs y servicios** → **Credenciales**
2. Click **"+ CREAR CREDENCIALES"**
3. Seleccionar **"Clave de API"**
4. Copiar la API Key generada
5. (Opcional) Restringir la API Key:
   - Click en editar API Key
   - **Restricciones de API** → Seleccionar **"Google Sheets API"**
   - **Restricciones de aplicación** → Seleccionar **"Referentes HTTP"**
   - Agregar tu dominio: `http://localhost:5173/*` (desarrollo)

---

## 🔐 Paso 3: Hacer Sheet Público

### Opción A: Público (Recomendado para desarrollo)
1. En tu Google Sheet, click **"Compartir"**
2. Click **"Cambiar a cualquier persona con el enlace"**
3. Permisos: **"Lector"**
4. Click **"Listo"**

### Opción B: Privado (Requiere OAuth)
- Usar Service Account (más complejo)
- Requiere credenciales JSON
- No recomendado para este proyecto

---

## ⚙️ Paso 4: Configurar la Aplicación

### 4.1 Obtener Sheet ID
De la URL de tu Google Sheet:
```
https://docs.google.com/spreadsheets/d/1ABC-xyz123_ESTE_ES_EL_SHEET_ID/edit
```
Copiar el ID entre `/d/` y `/edit`

### 4.2 Editar archivo de configuración

Abrir: `cafe-menu/src/services/googleSheetsService.js`

Reemplazar:
```javascript
const SHEET_ID = 'TU_SHEET_ID_AQUI'; // Pegar tu Sheet ID
const API_KEY = 'TU_API_KEY_AQUI'; // Pegar tu API Key
const RANGE = 'Productos!A2:O'; // Ajustar si cambias el nombre de la hoja
```

---

## 🧪 Paso 5: Probar la Conexión

### 5.1 Verificar en App.jsx

La aplicación ya está configurada para usar Google Sheets automáticamente con fallback a datos locales.

### 5.2 Verificar en Consola del Navegador

Abrir DevTools (F12) y buscar uno de estos mensajes:
- ✅ `"Productos cargados desde Google Sheets"` - Éxito
- ⚠️ `"Usando datos locales (Google Sheets no disponible)"` - Fallback

---

## 📝 Guía de Uso de Google Sheets

### Valores Importantes

#### Categorías Válidas:
- `licuados`
- `cafe`
- `comida`
- `postres`

#### Iconos Disponibles:
- `FaStrawberry` (Fresa)
- `FaCoffee` (Café)
- `FaCocktail` (Licuado)
- `FaLeaf` (Natural)
- `FaSeedling` (Orgánico)
- `FaAppleAlt` (Fruta)
- `FaLemon` (Cítrico)
- `FaGlassMartiniAlt` (Bebida)
- `FaMugHot` (Caliente)
- `FaPizzaSlice` (Comida)
- `FaHamburger` (Fast food)
- `FaCheese` (Queso)
- `FaIceCream` (Postres)

#### Colores Recomendados:
- Terracota: `#D84315`
- Naranja: `#FF6F00`
- Verde: `#7CB342`
- Ámbar: `#FFA000`
- Amarillo: `#FFB300`
- Café oscuro: `#5D4037`
- Café medio: `#6D4C41`
- Café claro: `#8D6E63`
- Púrpura: `#8E24AA`

#### Campo Popular:
- `true` o `1` = Producto popular
- `false` o `0` = Producto normal

#### Arrays en JSON:

**Ingredientes:**
```json
["Fresas frescas","Leche","Azúcar","Hielo"]
```

**Tags:**
```json
["frutal","cremoso","vitaminas"]
```

**Tamaños:**
```json
[{"name":"Regular","price":15.00},{"name":"Grande","price":18.00}]
```

---

## 🔄 Actualización Automática

### Frecuencia de Actualización
- La app carga datos al iniciar
- Recarga automática cada vez que cambias de página/vista
- Para forzar recarga: Refrescar navegador (F5)

### Caché
- Los datos se cachean en memoria durante la sesión
- Al refrescar el navegador se obtienen datos nuevos de Google Sheets

---

## 🚨 Solución de Problemas

### Error: "No se encontraron datos"
- ✅ Verificar que la hoja se llame **"Productos"**
- ✅ Verificar que el rango sea correcto: `Productos!A2:O`
- ✅ Asegurar que hay al menos una fila de datos (fila 2)

### Error: "API Key inválida"
- ✅ Verificar que copiaste la API Key completa
- ✅ Verificar que Google Sheets API está habilitada
- ✅ Revisar restricciones de API Key

### Error: "Permiso denegado"
- ✅ Hacer el Google Sheet público (cualquier persona con el enlace)
- ✅ Verificar que los permisos sean de "Lector"

### Datos no se actualizan
- ✅ Refrescar el navegador (F5)
- ✅ Limpiar caché del navegador
- ✅ Verificar que guardaste cambios en Google Sheets

---

## 📊 Plantilla de Google Sheet

### Copiar esta plantilla:

**Hoja: Productos**

| ID | Nombre | Categoría | Precio | Moneda | Descripción | Descripción Larga | Imagen URL | Color | Icono | Popular | Calorías | Tiempo Prep | Ingredientes | Tags | Tamaños |
|----|--------|-----------|--------|---------|-------------|-------------------|------------|-------|-------|---------|----------|-------------|--------------|------|---------|
| 1 | Licuado de Fresa | licuados | 15.00 | Q | Delicioso licuado de fresa fresca y cremoso | Preparado con fresas frescas de temporada, leche y un toque de azúcar natural. Rico en vitamina C y antioxidantes. | https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd | #D84315 | FaStrawberry | true | 180 | 5 min | ["Fresas frescas","Leche","Azúcar","Hielo"] | ["frutal","cremoso","vitaminas"] | [{"name":"Regular","price":15.00},{"name":"Grande","price":18.00}] |
| 2 | Café | cafe | 8.00 | Q | Café negro recién preparado | Café 100% guatemalteco, tostado artesanalmente. | https://images.unsplash.com/photo-1509042239860-f550ce710b93 | #6D4C41 | FaMugHot | true | 5 | 3 min | ["Café guatemalteco","Agua filtrada"] | ["intenso","aromático","tradicional"] | [{"name":"Regular","price":8.00},{"name":"Grande","price":10.00}] |

---

## 💡 Ventajas de usar Google Sheets

✅ **Fácil de usar** - Edita como Excel
✅ **Colaborativo** - Varias personas pueden editar
✅ **Sin código** - No necesitas programar
✅ **Tiempo real** - Cambios se reflejan al recargar
✅ **Backup automático** - Google guarda versiones
✅ **Acceso desde cualquier lugar** - Solo necesitas internet
✅ **Gratis** - No cuesta nada

---

## 📱 Próximos Pasos

1. ✅ Crear Google Sheet con la estructura
2. ✅ Habilitar Google Sheets API
3. ✅ Obtener API Key
4. ✅ Hacer Sheet público
5. ✅ Configurar IDs en la aplicación
6. ✅ Probar conexión
7. ✅ Agregar/editar productos desde Google Sheets

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver mensajes de error detallados.
