import * as events from 'events';

class EventsBus extends events.EventEmitter {
  async publish(event: string, args: any) {
    return this.emit(event, args);
  }

  async subscribe(event: string, handler: any) {
    this.on(event, handler);
  }
}

export default EventsBus;
