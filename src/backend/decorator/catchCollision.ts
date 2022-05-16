import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { CollisionError } from "../errors";

export function catchCollision() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: any) {
      try {
        console.log(args);
        return method.call(target, ...args);
      } catch (err) {
        // Prisma 에서 collision error 를 터뜨린다면 자체 collsion error 로 변환해서 내보낸다.
        if (
          err instanceof PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          const colErr = new CollisionError(err.message);
          colErr.cause = err.cause;
          colErr.stack = err.stack;

          throw colErr;
        }
        // 그게 아니라면 에러 그대로 내보낸다.
        throw err;
      }
    };
  };
}
