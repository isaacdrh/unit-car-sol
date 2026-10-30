/**
 * Represents a car object.
 *
 * @class
 */
export class Car {
  make: string;
  model: string;
  year: number;
  speed: number;
  maxSpeed: number;

  /**
   * Creates an instance of the Car class.
   *
   * @constructor
   * @param make - The make of the car.
   * @param model - The model of the car.
   * @param year - The year the car was manufactured.
   * @param maxSpeed - The maximum speed the car can accelerate.
   */
  constructor(make: string, model: string, year: number, maxSpeed: number) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.speed = 0;
    this.maxSpeed = maxSpeed;
  }

  /**
   * Returns a string that contains the year, make, and model of a car.
   *
   * @return The description of a car.
   */
  getDescription(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }

  /**
   * Accelerates the car by a specified amount.
   *
   * @param amount - The amount by which to accelerate the car.
   */
  accelerate(amount: number): void {
    if (amount < 0) {
      throw new Error("Amount should be a positive number.");
    }
    if (this.speed + amount > this.maxSpeed) {
      throw new Error("Speed limit has been reached.");
    }
    this.speed += amount;
  }

  /**
   * Decelerates the car by a specified amount.
   *
   * @param amount - The amount by which to decelerate the car.
   */
  decelerate(amount: number): void {
    if (amount < 0) {
      throw new Error("Amount should be a positive number.");
    }
    this.speed = Math.max(0, this.speed - amount);
  }

  /**
   * Returns the current speed of the car.
   *
   * @return The current speed of the car.
   */
  getSpeed(): number {
    return this.speed;
  }

  /**
   * Resets the speed of the car to zero.
   */
  stop(): void {
    this.speed = 0;
  }

  /**
   * Calculates the distance traveled by the car given the time traveled.
   *
   * @param time - The time traveled in hours.
   * @return The distance traveled in kilometers.
   */
  calculateDistance(time: number): number {
    const distance = this.speed * time;
    return distance;
  }

  /**
   * Returns a boolean value indicating if the car is moving or not.
   *
   * @return A boolean value representing if the car is moving or not
   */
  isMoving(): boolean {
    return this.speed > 0;
  }
}
