export class SendableError extends Error {
  toJSON() {
    const { stack, ...dto } = this;  
    return JSON.stringify(dto);
  }
}

export class LogicalError extends SendableError {}
export class NotFoundError extends SendableError {}