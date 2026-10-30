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
