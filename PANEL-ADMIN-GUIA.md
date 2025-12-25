# 🎛️ Panel de Administración - SELAH Cafetería

## ✨ ¡Panel de Admin Implementado!

Ahora puedes **crear, editar y eliminar productos** directamente desde la aplicación sin necesidad de tocar código ni Google Sheets.

---

## 🚀 Cómo Acceder

### 1. Botón Flotante
- Busca el **botón con ícono de engranaje ⚙️** en la **esquina inferior izquierda**
- Es un botón café oscuro flotante
- Click en el botón para abrir el panel

### 2. Contraseña
- **Contraseña por defecto**: `selah2024`
- Ingresa la contraseña para acceder al panel
- La sesión se mantiene abierta hasta que cierres sesión

---

## 📋 Funciones del Panel

### ✅ Ver Todos los Productos
- Lista completa de productos en formato de tarjetas
- Muestra: imagen, nombre, categoría, precio
- Organizado en una cuadrícula responsive

### ➕ Agregar Nuevo Producto
1. Click en **"Agregar Producto"** (botón verde arriba)
2. Llena el formulario:
   - **Nombre** * (obligatorio)
   - **Categoría** * (licuados, cafe, comida, postres)
   - **Precio** * (en Quetzales)
   - **Descripción Corta** * (aparece en la tarjeta)
   - **Descripción Larga** (aparece en el modal)
   - **URL de Imagen** * (link de Unsplash u otro)
   - **Color** * (selecciona de la lista)
   - **Icono** * (selecciona de la lista)
   - **Calorías**
   - **Tiempo de Preparación**
   - **Ingredientes** (separados por coma)
   - **Tags** (separados por coma)
   - **Popular** (checkbox)
3. Click en **"Crear Producto"**
4. El producto aparecerá inmediatamente en el menú

### ✏️ Editar Producto Existente
1. Busca el producto en la lista
2. Click en **"Editar"** (botón azul)
3. Modifica los campos necesarios
4. Click en **"Actualizar Producto"**
5. Los cambios se reflejan inmediatamente

### 🗑️ Eliminar Producto
1. Busca el producto en la lista
2. Click en **"Eliminar"** (botón rojo)
3. Confirma la eliminación
4. El producto desaparece del menú

---

## 🎨 Valores Disponibles

### Categorías:
- `licuados` - Deliciosos Licuados
- `cafe` - Café & Bebidas Calientes
- `comida` - Alimentos
- `postres` - Postres & Dulces

### Colores:
- **Terracota** (#D84315) - Rojo tierra
- **Naranja** (#FF6F00) - Naranja quemado
- **Verde** (#7CB342) - Verde oliva
- **Ámbar** (#FFA000) - Amarillo ámbar
- **Amarillo** (#FFB300) - Amarillo dorado
- **Café Oscuro** (#5D4037) - Principal
- **Café Medio** (#6D4C41) - Medio
- **Café Claro** (#8D6E63) - Claro
- **Púrpura** (#8E24AA) - Púrpura oscuro

### Iconos:
- `FaCocktail` - Bebida/Licuado
- `FaCoffee` - Taza de café
- `FaMugHot` - Taza caliente
- `FaStrawberry` - Fresa
- `FaLeaf` - Hoja/Natural
- `FaSeedling` - Planta
- `FaAppleAlt` - Manzana/Fruta
- `FaLemon` - Limón
- `FaPizzaSlice` - Pizza/Comida
- `FaHamburger` - Hamburguesa
- `FaCheese` - Queso
- `FaIceCream` - Helado/Postres

---

## 💾 Cómo se Guardan los Datos

### Actual (Versión 1.0):
✅ **LocalStorage**: Los cambios se guardan en el navegador
- Los productos persisten al recargar la página
- Funcionan sin conexión a internet
- Los datos están en tu computadora local

⚠️ **Limitación**: Los cambios solo se ven en TU navegador
- Si otra persona abre la app, verá los productos originales
- Si borras caché del navegador, perderás los cambios

### Próxima Versión (2.0):
🔄 **Google Sheets**: Sincronización automática
- Los cambios se guardarán en Google Sheets
- Todos verán los mismos productos actualizados
- Los datos persisten en la nube
- Requiere configurar Google Apps Script (próximamente)

---

## 🔐 Seguridad

### Contraseña Actual:
- **Por defecto**: `selah2024`
- Simple para desarrollo/pruebas
- Cambiar en producción

### Dónde Cambiar la Contraseña:
Abre: `cafe-menu/src/components/AdminPanel.jsx`

Busca la línea 16:
```javascript
const ADMIN_PASSWORD = 'selah2024';
```

Cámbiala por tu contraseña:
```javascript
const ADMIN_PASSWORD = 'TuNuevaContraseña123';
```

---

## 📸 Imágenes para Productos

### Unsplash (Recomendado):
1. Ve a [Unsplash.com](https://unsplash.com)
2. Busca la comida/bebida (ej: "coffee", "nachos", "smoothie")
3. Click en la imagen que te guste
4. Click derecho en la imagen → **"Copiar dirección de imagen"**
5. Pega el URL en el campo "URL de Imagen"

### Ejemplo de URLs de Unsplash:
```
https://images.unsplash.com/photo-1509042239860-f550ce710b93
https://images.unsplash.com/photo-1565299585323-38d6b0865b47
https://images.unsplash.com/photo-1519676867240-f03562e64548
```

---

## 💡 Tips y Trucos

### ✅ Mejores Prácticas:

1. **Nombres Descriptivos**: "Licuado de Fresa" mejor que "Fresa"
2. **Precios Reales**: Usa precios reales de tu cafetería
3. **Descripciones Atractivas**: Vende el producto con palabras
4. **Imágenes de Calidad**: Usa fotos profesionales de Unsplash
5. **Tags Útiles**: Ayudan a la búsqueda (ej: "vegano", "sin azúcar")
6. **Marca como Popular**: Los productos populares tienen badge dorado

### 🎯 Ingredientes y Tags:

**Ingredientes** - Lista completa:
```
Fresas frescas, Leche entera, Azúcar, Hielo
```

**Tags** - Palabras clave para búsqueda:
```
frutal, cremoso, vitaminas, vegano
```

---

## 🚀 Workflow Recomendado

### Para Agregar un Nuevo Producto:

1. **Busca la imagen** en Unsplash primero
2. **Copia el URL** de la imagen
3. **Abre el Panel de Admin** (botón engranaje)
4. **Click "Agregar Producto"**
5. **Llena el formulario** (usa los valores de arriba)
6. **Preview de la imagen** aparece automáticamente
7. **Click "Crear Producto"**
8. **¡Listo!** El producto aparece en el menú

### Para Actualizar Precios:

1. Abre el Panel de Admin
2. Click "Editar" en el producto
3. Cambia solo el precio
4. Click "Actualizar Producto"
5. El precio se actualiza en todo el menú

---

## 🔄 Sincronización con Google Sheets (Próximamente)

### Estado Actual:
❌ Los cambios NO se guardan en Google Sheets automáticamente
✅ Los cambios SÍ se guardan en localStorage (tu navegador)

### Versión Futura:
Para habilitar la sincronización bidireccional con Google Sheets necesitas:

1. **Google Apps Script**: Crear un script que permita escribir en Sheets
2. **Deploy como Web App**: Publicar el script
3. **Configurar URL**: Agregar la URL del script a la app
4. **Autenticación**: Configurar permisos

**Documentación completa próximamente en**: `GOOGLE-SHEETS-WRITE.md`

---

## 📱 Responsive

El panel de administración funciona en:
- ✅ Desktop (mejor experiencia)
- ✅ Tablets
- ✅ Móviles (scroll vertical)

---

## 🎨 Personalización

### Cambiar Colores del Panel:

El panel usa las mismas variables CSS que el resto de la app:
- `--color-primary`: Color principal (café oscuro)
- `--color-text-primary`: Color de texto
- `--color-accent`: Color de acentos

Modifica en: `cafe-menu/src/index.css`

---

## ❓ Preguntas Frecuentes

### ¿Los cambios se sincronizan con Google Sheets?
**No** en la versión actual. Se guardan en localStorage. Próximamente se agregará sincronización bidireccional.

### ¿Puedo subir imágenes desde mi computadora?
No directamente. Usa URLs de servicios como Unsplash, Imgur, o tu propio servidor de imágenes.

### ¿Cómo cambio la contraseña del panel?
Edita `src/components/AdminPanel.jsx` línea 16.

### ¿Los productos se borran al recargar?
No. Se guardan en localStorage y persisten al recargar la página.

### ¿Puedo tener múltiples administradores?
Sí, todos pueden usar la misma contraseña. Pero los cambios solo se ven en el navegador donde se hicieron (hasta que se implemente sincronización con Sheets).

### ¿Cómo exporto mis productos?
Abre la consola del navegador (F12) y ejecuta:
```javascript
console.log(JSON.stringify(JSON.parse(localStorage.getItem('selahProducts')), null, 2))
```
Copia el resultado.

---

## 🎯 Próximas Mejoras

- [ ] Sincronización bidireccional con Google Sheets
- [ ] Subir imágenes directamente
- [ ] Múltiples usuarios con roles
- [ ] Historial de cambios
- [ ] Importar/Exportar productos en CSV
- [ ] Vista previa antes de publicar
- [ ] Categorías personalizadas

---

**¡Empieza a administrar tu menú ahora! 🎉**

Click en el botón ⚙️ en la esquina inferior izquierda.
