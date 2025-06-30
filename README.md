# 📱 FlipBook - Visualizador Web Móvil
mi
Este proyecto es una **aplicación móvil desarrollada con Ionic v3.9.9**, que permite visualizar contenido web embebido desde una URL externa, utilizando `InAppBrowser` o `SafariViewController`, dependiendo de la plataforma (Android o iOS, respectivamente).

---

## ⚙️ Requisitos previos

Antes de instalar o ejecutar esta aplicación, asegúrate de tener instalado lo siguiente:

- **Node.js** v14.21.3  
- **npm** v6.14.18  
- **Ionic CLI** v6.20.9  
- **Cordova CLI** v10.0.0  
- **Git**

---

## 📂 Clonar el repositorio

```bash
git clone https://github.com/davidromeroy/FlipBook.git
cd FlipBook
```



## 🔧 Instalación
Instala las dependencias necesarias del proyecto con:

```bash
npm install
```

## 🔌 Plugins requeridos
Instala los plugins de Cordova necesarios para ejecutar correctamente el visor embebido:

```bash
# Safari View Controller (iOS)
ionic cordova plugin add cordova-plugin-safariviewcontroller
npm install @ionic-native/safari-view-controller@4.20.0 --save

# InAppBrowser (Android e iOS)
ionic cordova plugin add cordova-plugin-inappbrowser
npm install @ionic-native/in-app-browser@4.20.0 --save

```

## 🧪 Ejecutar la app
En navegador (modo desarrollo):


```bash
ionic serve
```
🔎 Nota: En el navegador se utilizará un <iframe> para mostrar el contenido. SafariViewController solo está disponible en dispositivos iOS reales.

### En Android:
```bash
ionic cordova platform add android@13.0.0
ionic cordova run android --device
```
Build para Android:
```bash
npm install cordova-common@5.0.0
ionic cordova build android
```
### En iOS:
```
ionic cordova platform add ios
ionic cordova run ios --device
```

📱 Importante: La funcionalidad de SafariViewController solo es visible en un dispositivo iOS real (no en emuladores ni navegador).

## 🌐 URL embebida por defecto
Actualmente, la app está configurada para cargar el siguiente FlipBook:

```bash
https://www.delportal.com.ec/3d-flip-book/promocion-junio-julio-2025/
```

Puedes cambiar esta URL en el archivo `src/pages/flipbook/flipbook.ts` para apuntar a cualquier otro recurso web embebible.

## 🛠️ Estado del proyecto
Este proyecto fue desarrollado como práctica para trabajar con InAppBrowser y SafariViewController en aplicaciones híbridas usando Ionic 3. Aunque funcional, aún puede expandirse o personalizarse según el uso final

## 📄 Licencia
MIT © David Romero








