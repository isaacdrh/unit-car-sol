# 🚗 Ejercicio Car

**Objetivos:**

- Ejercitar test unitario

## ⚙️ Iniciar el proyecto

1. Realiza un fork del repositorio. A partir de este punto, se trabajará en el repositorio creado en este paso.
2. Clonar el fork:

   ```bash
   git clone https://github.com/<USUARIO>/unit-car
   ```

3. Abrir la carpeta del proyecto en **Visual Studio Code**.
4. Abrir una terminal dentro de Visual Studio Code y ejecutar:

   ```bash
   npm install
   ```

5. Una vez finalizada la instalación, ejecutar:

   ```bash
   npm run dev
   ```

6. Abrir en el navegador la dirección que aparece en la terminal.
7. Recorrer la app: acelerar, frenar y detener el auto, y calcular la distancia recorrida. Probar también acelerar por encima de la velocidad máxima.

> 💡 `npm run dev` queda ejecutándose en esa terminal. Para el resto de los comandos (`npm run lint`, `npm run test`, etc.) abrir una terminal nueva.

## 🧪 Test unitario

1. En la terminal ejecutar `npm run test`
2. Completar los casos de test pendientes (`test.todo`) en `src/tests/Car.test.ts`, reemplazando cada `test.todo("...")` por `test("...", () => { ... })`, hasta alcanzar 100% cobertura de `src/domain/Car.ts`
3. Verificar en la app el comportamiento probado (ej: acelerar por encima de la velocidad máxima)

Hacer commit de los cambios y push al repositorio remoto

## Referencias

- TypeScript: https://www.w3schools.com/typescript/
- Vitest: https://vitest.dev/api/
