# ✅ Configuración Completada - Google Sheets

## 🎉 Lo que YA está configurado:

✅ **Sheet ID configurado**: `10GzvoQx7mBNR_HFLSxvzFOBa5t-Zk77VRdilgHekS6Y`
✅ **API Key configurada**: `AIzaSyCeU5FqzwkFh0WD2ZMmPbfxKM1lx3PTGDc`
✅ **Código integrado**: La app ya está lista para usar Google Sheets
✅ **Servidor corriendo**: `http://localhost:5173`

---

## 📋 Lo que FALTA hacer en tu Google Sheet:

### 1️⃣ Verificar Permisos del Google Sheet

**IMPORTANTE:** El Google Sheet debe ser público para que la API funcione.

#### Pasos:
1. Abre tu Google Sheet: [https://docs.google.com/spreadsheets/d/10GzvoQx7mBNR_HFLSxvzFOBa5t-Zk77VRdilgHekS6Y/edit](https://docs.google.com/spreadsheets/d/10GzvoQx7mBNR_HFLSxvzFOBa5t-Zk77VRdilgHekS6Y/edit)

2. Click en **"Compartir"** (botón verde arriba a la derecha)

3. Click en **"Cambiar a cualquier persona con el enlace"**

4. Asegúrate que diga:
   - **Acceso general**: "Cualquier persona con el enlace"
   - **Función**: "Lector" (solo lectura)

5. Click **"Listo"**

---

### 2️⃣ Crear la pestaña "Productos"

Tu Google Sheet necesita una pestaña llamada exactamente **"Productos"** (con P mayúscula).

#### Pasos:
1. En tu Google Sheet, crea una nueva pestaña
2. Nómbrala: **"Productos"** (importante: P mayúscula)

---

### 3️⃣ Configurar las Columnas

En la **fila 1** de la pestaña "Productos", copia estas columnas EXACTAMENTE:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ID | Nombre | Categoría | Precio | Moneda | Descripción | Descripción Larga | Imagen URL | Color | Icono | Popular | Calorías | Tiempo Prep | Ingredientes | Tags | Tamaños |

---

### 4️⃣ Agregar Productos de Ejemplo

Copia estos productos en las filas 2, 3, 4, etc:

#### Fila 2 - Licuado de Fresa:
```
1 | Licuado de Fresa | licuados | 15.00 | Q | Delicioso licuado de fresa fresca y cremoso | Preparado con fresas frescas de temporada, leche y un toque de azúcar natural. Rico en vitamina C y antioxidantes. | https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd | #D84315 | FaStrawberry | true | 180 | 5 min | ["Fresas frescas","Leche","Azúcar","Hielo"] | ["frutal","cremoso","vitaminas"] | [{"name":"Regular","price":15.00},{"name":"Grande","price":18.00}]
```

#### Fila 3 - Café:
```
2 | Café | cafe | 8.00 | Q | Café negro recién preparado | Café 100% guatemalteco, tostado artesanalmente. Notas de chocolate y nueces. Servido caliente y aromático. | https://images.unsplash.com/photo-1509042239860-f550ce710b93 | #6D4C41 | FaMugHot | true | 5 | 3 min | ["Café guatemalteco","Agua filtrada"] | ["intenso","aromático","tradicional"] | [{"name":"Regular","price":8.00},{"name":"Grande","price":10.00}]
```

#### Fila 4 - Nachos:
```
3 | Nachos | comida | 25.00 | Q | Crujientes nachos con queso fundido | Totopos de maíz recién horneados cubiertos con queso cheddar fundido, jalapeños, crema agria y pico de gallo. | https://images.unsplash.com/photo-1582169296194-e4d644c48063 | #FFA500 | FaPizzaSlice | true | 450 | 8 min | ["Totopos","Queso cheddar","Jalapeños","Crema","Pico de gallo"] | ["crujiente","compartir","picante"] | [{"name":"Individual","price":25.00},{"name":"Para Compartir","price":40.00}]
```

---

## 🔍 Verificar que Funciona

### Después de configurar el Google Sheet:

1. ✅ Abre tu navegador en: `http://localhost:5173`

2. ✅ Abre la **Consola del Navegador** (presiona F12)

3. ✅ Ve a la pestaña **"Console"**

4. ✅ Busca uno de estos mensajes:
   - ✅ `"✅ Productos cargados desde Google Sheets"` = **¡FUNCIONA!**
   - ⚠️ `"⚠️ Usando datos locales (Google Sheets no disponible)"` = **Algo falta**

5. ✅ En la esquina superior derecha de la página verás:
   - 🟢 **"✓ Conectado a Google Sheets"** = Todo bien
   - 🟡 **"📋 Usando datos locales"** = Revisa la configuración

---

## 📊 Valores Importantes para las Columnas

### Columna C - Categorías:
- `licuados`
- `cafe`
- `comida`
- `postres`

### Columna I - Colores:
- `#D84315` (Terracota - Fresa)
- `#FF6F00` (Naranja - Papaya)
- `#7CB342` (Verde - Melón)
- `#FFA000` (Ámbar - Piña)
- `#FFB300` (Amarillo - Banano)
- `#5D4037` (Café oscuro)
- `#6D4C41` (Café medio)
- `#8D6E63` (Café claro)

### Columna J - Iconos:
- `FaStrawberry` (Fresa)
- `FaCoffee` (Café)
- `FaMugHot` (Taza caliente)
- `FaLeaf` (Hoja)
- `FaSeedling` (Planta)
- `FaPizzaSlice` (Pizza/Comida)
- `FaHamburger` (Hamburguesa)
- `FaCheese` (Queso)
- `FaIceCream` (Helado/Postres)

### Columna K - Popular:
- `true` o `1` = Producto destacado
- `false` o `0` = Producto normal

### Columnas N, O, P - Arrays (formato JSON):

**Ingredientes (columna N):**
```json
["Ingrediente 1","Ingrediente 2","Ingrediente 3"]
```

**Tags (columna O):**
```json
["tag1","tag2","tag3"]
```

**Tamaños (columna P):**
```json
[{"name":"Regular","price":15.00},{"name":"Grande","price":18.00}]
```

---

## 🚨 Errores Comunes y Soluciones

### ❌ Error: "The caller does not have permission"
**Solución**: El Google Sheet NO es público. Sigue los pasos del punto 1️⃣ arriba.

### ❌ Error: "Unable to parse range: Productos!A2:P"
**Solución**: La pestaña NO se llama "Productos". Renombra la pestaña exactamente como "Productos".

### ❌ No se ven productos
**Solución**:
- Verifica que tienes datos en la fila 2 (y siguientes)
- Verifica que las columnas están en el orden correcto
- Refresca el navegador (F5)

### ❌ Muestra "Usando datos locales"
**Solución**:
- Abre la consola del navegador (F12)
- Lee el mensaje de error en rojo
- Verifica permisos del Sheet
- Verifica que la API Key sea correcta

---

## ✨ Una vez que funcione:

1. **Edita productos** directamente en Google Sheets
2. **Refresca el navegador** (F5) para ver cambios
3. **Comparte el Sheet** con otras personas para que administren el menú
4. **Agrega, edita o elimina** productos sin tocar código

---

## 📞 Soporte

Si algo no funciona:
1. Abre la consola del navegador (F12)
2. Mira los mensajes de error
3. Verifica que completaste TODOS los pasos arriba
4. Asegúrate que el Sheet sea público

---

**¡Estás a solo unos pasos de tener tu menú completamente dinámico! 🎉**
