import { Car } from "./domain/Car";

const car = new Car("Toyota", "Corolla", 2023, 180);

function numberInput(id: string): number {
  return Number(document.querySelector<HTMLInputElement>(`#${id}`)!.value);
}

function showMessage(text: string, isError = false): void {
  const message = document.querySelector("#message")!;
  message.className = isError ? "alert alert-danger" : "alert alert-info";
  message.textContent = text;
}

function render(): void {
  document.querySelector("#description")!.textContent = car.getDescription();
  document.querySelector("#speed")!.textContent = String(car.getSpeed());
  const moving = document.querySelector("#moving")!;
  moving.className = car.isMoving() ? "badge bg-success" : "badge bg-secondary";
  moving.textContent = car.isMoving() ? "En movimiento" : "Detenido";
}

function onClick(id: string, action: () => string): void {
  document.querySelector(`#${id}`)!.addEventListener("click", () => {
    try {
      showMessage(action());
    } catch (error) {
      showMessage((error as Error).message, true);
    }
    render();
  });
}

onClick("accelerate", () => {
  car.accelerate(numberInput("amount"));
  return `Aceleró ${numberInput("amount")} km/h`;
});
onClick("decelerate", () => {
  car.decelerate(numberInput("amount"));
  return `Frenó ${numberInput("amount")} km/h`;
});
onClick("stop", () => {
  car.stop();
  return "Se detuvo";
});
onClick(
  "distance",
  () => `Distancia: ${car.calculateDistance(numberInput("time"))} km`,
);

render();
