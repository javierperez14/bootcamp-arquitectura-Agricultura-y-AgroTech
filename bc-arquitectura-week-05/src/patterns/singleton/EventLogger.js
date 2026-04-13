export class EventLogger {
  static #instance;

  constructor() {
    if (EventLogger.#instance) {
      return EventLogger.#instance;
    }
    this.logs = [];
    EventLogger.#instance = this;
  }

  static getInstance() {
    if (!EventLogger.#instance) {
      EventLogger.#instance = new EventLogger();
    }
    return EventLogger.#instance;
  }

  log(nivel, mensaje, metadata = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      nivel,
      mensaje,
      metadata,
    };
    this.logs.push(entry);
    console.log(`[${nivel}] ${mensaje}`);
    return entry;
  }

  getHistory() {
    return this.logs;
  }
}
