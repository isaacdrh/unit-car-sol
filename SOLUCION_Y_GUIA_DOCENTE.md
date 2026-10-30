# 🚗 Ejercicio Car — Solución y guía docente

**Tema:** tests unitarios con Vitest (TypeScript)
**Archivo a completar:** `src/tests/Car.test.ts`
**Meta del ejercicio:** 100 % de cobertura de `src/domain/Car.ts`

---

## 1. Resumen para el docente

| Aspecto | Detalle |
| --- | --- |
| Estado inicial | 3 tests escritos, 8 `test.todo`, cobertura 52,63 % (branches 66,66 %, funciones 25 %) |
| Estado con la solución | 13 tests, cobertura 100 % en statements, branches, funciones y líneas |
| Líneas sin cubrir al inicio | 36 (`decelerate` con monto negativo) y 60-99 (`decelerate`, `getSpeed`, `stop`, `calculateDistance`, `isMoving`) |
| Duración estimada | 45-60 min (20 min de reproducción de la app + 30-40 min de tests) |
| Verificado | `npm run test`, `tsc --noEmit`, `eslint` y `prettier --check` pasan sin errores |

### Objetivos de aprendizaje

1. Escribir tests unitarios con la estructura **Arrange – Act – Assert**.
2. Cubrir los caminos felices y los de error (excepciones con `toThrowError`).
3. Usar `beforeEach` para tener un estado inicial limpio y predecible.
4. Interpretar un reporte de cobertura y relacionar cada línea sin cubrir con un test faltante.
5. Distinguir **cobertura** de **calidad de los tests** (valores límite, casos que la cobertura no exige).

### Conocimientos previos

- Clases y métodos en TypeScript.
- Excepciones (`throw` / `try-catch`).
- Uso básico de git y terminal.

---

## 2. Cómo está armado el código

`Car` tiene cinco atributos públicos (`make`, `model`, `year`, `speed`, `maxSpeed`) y siete métodos. Los que tienen lógica condicional son:

| Método | Comportamiento | Ramas a cubrir |
| --- | --- | --- |
| `accelerate(amount)` | Suma a `speed`. Lanza error si `amount < 0` o si `speed + amount > maxSpeed` | monto negativo, exceder el máximo, caso normal |
| `decelerate(amount)` | Resta a `speed` con piso en 0. Lanza error si `amount < 0` | monto negativo, caso normal, piso en 0 |
| `isMoving()` | `speed > 0` | verdadero y falso |

El resto (`getDescription`, `getSpeed`, `stop`, `calculateDistance`) son métodos lineales sin ramas.

**Importante:** el `beforeEach` del archivo deja el auto con `speed = 50` y `maxSpeed = 180`. Todos los valores esperados de la solución parten de ahí.

---

## 3. Solución completa

Reemplazar el contenido de `src/tests/Car.test.ts` por:

```ts
import { Car } from "../domain/Car";
import { expect, test, describe, beforeEach } from "vitest";

/* Vitest API https://vitest.dev/api/ */

let car: Car;

describe("Car", () => {
  beforeEach(() => {
    car = new Car("Toyota", "Corolla", 2023, 180);
    car.speed = 50;
  });

  describe("accelerate", () => {
    test("should increase speed by the specified amount", () => {
      car.accelerate(20);
      expect(car.speed).toBe(70);
    });

    test("should not increase speed beyond the maximum speed limit", () => {
      car.speed = 90;
      expect(() => car.accelerate(100)).toThrowError(
        "Speed limit has been reached.",
      );
    });

    test("should allow reaching exactly the maximum speed", () => {
      car.accelerate(130);
      expect(car.speed).toBe(180);
    });

    test("should not accept negative amount", () => {
      const negativeAmount = -20;
      expect(() => car.accelerate(negativeAmount)).toThrowError(
        "Amount should be a positive number.",
      );
    });
  });

  describe("decelerate", () => {
    test("should decrease speed by the specified amount", () => {
      car.decelerate(20);
      expect(car.speed).toBe(30);
    });

    test("should not decrease speed below zero", () => {
      car.decelerate(80);
      expect(car.speed).toBe(0);
    });

    test("should not accept a negative amount", () => {
      expect(() => car.decelerate(-20)).toThrowError(
        "Amount should be a positive number.",
      );
    });
  });

  describe("getSpeed", () => {
    test("should return the current speed", () => {
      expect(car.getSpeed()).toBe(50);
    });
  });

  describe("stop", () => {
    test("should set speed to zero", () => {
      car.stop();
      expect(car.speed).toBe(0);
    });
  });

  describe("calculateDistance", () => {
    test("should return the distance traveled in the given time", () => {
      expect(car.calculateDistance(2)).toBe(100);
    });
  });

  describe("isMoving", () => {
    test("should return true if the car is moving", () => {
      expect(car.isMoving()).toBe(true);
    });

    test("should return false if the car is stopped", () => {
      car.stop();
      expect(car.isMoving()).toBe(false);
    });
  });

  describe("getDescription", () => {
    test("should return the year, make and model of the car", () => {
      expect(car.getDescription()).toBe("2023 Toyota Corolla");
    });
  });
});
```

### Resolución caso por caso

| Test | Cálculo | Por qué |
| --- | --- | --- |
| `decelerate` reduce la velocidad | 50 − 20 = **30** | Camino feliz |
| `decelerate` no baja de cero | 50 − 80 → **0** | Cubre el `Math.max(0, …)`: sin él daría −30 |
| `decelerate` rechaza negativos | `-20` lanza error | Cubre la línea 36, que era la única rama sin cubrir de `decelerate` |
| `getSpeed` | **50** | Valor puesto por el `beforeEach` |
| `stop` | `speed` pasa a **0** | Se verifica el estado luego de la acción |
| `calculateDistance` | 50 km/h × 2 h = **100** | Elegir un tiempo ≠ 1 evita que un `speed * 1` accidental pase |
| `isMoving` verdadero | `speed = 50` → `true` | |
| `isMoving` falso | luego de `stop()` → `false` | Este es el test **extra**: los `test.todo` solo pedían el caso verdadero |
| `getDescription` | **"2023 Toyota Corolla"** | Orden año, marca, modelo |
| `accelerate` hasta el máximo exacto | 50 + 130 = **180** | Test extra de valor límite (ver sección 5) |

---

## 4. Guion sugerido para la clase

### Antes (5 min)
- Que cada estudiante haga el fork, clone y `npm install`.
- Ejecutar `npm run dev` y recorrer la app. Pedir que **aceleren por encima de 180**: van a ver el mensaje de error en rojo. Eso es exactamente lo que `toThrowError` verifica en el test.

### Durante (30-40 min)
1. Correr `npm run test` **antes de tocar nada**. Mostrar el reporte: ¿qué significa 52,63 %? ¿Qué son las líneas 36 y 60-99?
2. Leer juntos los 3 tests existentes y señalar el patrón *Arrange (beforeEach) → Act → Assert*.
3. Dejar que completen los `test.todo` solos o en pares. Correr los tests seguido (uno por vez), no todos al final.
4. Volver a mirar el reporte hasta llegar a 100 %.

### Después (10 min)
- Discusión: «Llegamos a 100 %. ¿Significa que `Car` no tiene bugs?» (ver sección 5).
- Pedir commit y push.

---

## 5. Puntos de discusión (para ir más allá del 100 %)

**5.1 La cobertura no mide la calidad.** Un test sin `expect` también suma cobertura. Mostrar el ejemplo: si en `decelerate` se borra `Math.max(0, …)` y se deja `this.speed - amount`, solo falla el test «no baja de cero». Si el estudiante no lo escribió, la cobertura de líneas seguiría en 100 % porque la línea se ejecuta igual. (Se puede probar en vivo.)

**5.2 Valores límite.** El código usa `>` y no `>=`, así que llegar exactamente a `maxSpeed` es válido. El test extra lo fija. Si alguien cambia el operador a `>=`, ese test falla. Cambio sugerido para mostrar en clase: reemplazar `>` por `>=` en `accelerate` y ver qué test lo detecta (solo el de límite exacto).

**5.3 Casos que el código no valida (posibles bugs o decisiones de diseño).**

- `accelerate(NaN)`: `NaN < 0` y `speed + NaN > maxSpeed` dan `false`, así que **no lanza error y deja `speed` en `NaN`**.
- `calculateDistance(-1)` devuelve una distancia negativa; no hay validación del tiempo.
- `accelerate(0)` y `decelerate(0)` se aceptan, aunque el mensaje dice «positive number» (0 no es positivo).
- `maxSpeed`, `speed` y el resto de los atributos son públicos: los tests (y cualquiera) pueden hacer `car.speed = 90` y saltearse las reglas de la clase.

Pregunta guía: *¿Qué test escribirían para cada caso y cuál sería el comportamiento esperado?* Es una buena transición a TDD.

**5.4 Estado compartido.** La variable `car` es global al archivo y se recrea en `beforeEach`. Preguntar qué pasaría si se creara una sola vez (los tests se contaminarían entre sí y dependerían del orden).

**5.5 Nombres de los tests.** Los nombres siguen el patrón `should … when …`/`should …`. Pedir que los lean como documentación del comportamiento.

---

## 6. Errores frecuentes del estudiantado

| Error | Síntoma | Qué decir |
| --- | --- | --- |
| Olvidar el *arrow function* en `toThrowError`: `expect(car.accelerate(-1)).toThrowError()` | El test falla con el error sin capturar | La excepción debe ocurrir *dentro* de `expect`; hay que pasar `() => car.accelerate(-1)` |
| Asumir que `speed` arranca en 0 | Valores esperados erróneos | El `beforeEach` lo deja en 50 |
| Calcular `calculateDistance(1)` | Pasa, pero no demuestra la multiplicación | Usar un tiempo ≠ 1 |
| Dejar `test.todo` sin reemplazar | `npm run test` muestra «todo» y cobertura < 100 % | Reemplazar `test.todo("…")` por `test("…", () => { … })` |
| Un `expect` que no verifica nada útil (`expect(car).toBeDefined()`) | Cobertura sube, el test no detecta bugs | Ver punto 5.1 |
| Escribir tests que dependen del orden de ejecución | Fallas intermitentes | Cada test debe armar su estado en `beforeEach` |

---

## 7. Rúbrica sugerida (10 puntos)

| Criterio | Puntos |
| --- | --- |
| Reemplazó **todos** los `test.todo` por tests funcionales | 3 |
| Cobertura de `Car.ts` al 100 % (`npm run test`) | 2 |
| Cada test verifica con `expect` un resultado concreto (no solo ejecuta el código) | 2 |
| Cubre el caso falso de `isMoving` o algún valor límite adicional | 1 |
| `npm run lint` y `npm run format` sin errores | 1 |
| Commit y push al fork con mensaje claro | 1 |

---

## 8. Comandos de verificación

```bash
npm install
npm run test      # debe mostrar 13 tests y 100 % de cobertura en Car.ts
npm run lint
npm run format
npx tsc --noEmit
```

---

## 9. Extensiones opcionales

1. Escribir los tests de los casos de 5.3, ver que fallen (rojo), corregir `Car.ts` (verde).
2. Usar `test.each` para parametrizar `accelerate`/`decelerate` con varios montos.
3. Agregar tests de `main.ts` con `jsdom` (requiere agregar la dependencia).
4. Hacer *mutation testing* manual: cambiar un operador en `Car.ts` y ver qué test lo detecta.
