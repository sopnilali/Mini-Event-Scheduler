import { categorizeEvent } from "../modules/event/event.constant";

export interface IEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  notes?: string;
  archivedStatus: boolean;
  category: 'WORK' | 'PERSONAL' | 'OTHER';
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

class InMemoryEventStorage {
  private events: IEvent[] = [];
  private nextId = 1;

  private generateId(): string {
    return `event_${this.nextId++}_${Date.now()}`;
  }

  async create(eventData: {
    title: string;
    date: string;
    time: string;
    notes?: string;
  }): Promise<IEvent> {
    const now = new Date();
    const event: IEvent = {
      id: this.generateId(),
      title: eventData.title,
      date: new Date(eventData.date),
      time: eventData.time,
      notes: eventData.notes,
      archivedStatus: false,
      category: categorizeEvent(eventData.title, eventData.notes) as 'WORK' | 'PERSONAL' | 'OTHER',
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
    };

    this.events.push(event);
    return event;
  }

  async findMany(options: {
    where?: {
      category?: 'WORK' | 'PERSONAL' | 'OTHER';
    };
    skip?: number;
    take?: number;
    orderBy?: any;
  }): Promise<IEvent[]> {
    let filteredEvents = this.events.filter(event => !event.isDeleted);

    // Apply category filter
    if (options.where?.category) {
      filteredEvents = filteredEvents.filter(event => event.category === options.where!.category);
    }

    // Apply sorting
    if (options.orderBy) {
      if (typeof options.orderBy === 'object' && !Array.isArray(options.orderBy)) {
        // Single field sorting
        const [field, order] = Object.entries(options.orderBy)[0];
        filteredEvents.sort((a, b) => {
          let aValue: any = a[field as keyof IEvent];
          let bValue: any = b[field as keyof IEvent];

          // Handle date comparison
          if (field === 'date') {
            aValue = aValue.getTime();
            bValue = bValue.getTime();
          }

          if (order === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      } else if (Array.isArray(options.orderBy)) {
        // Multiple field sorting
        filteredEvents.sort((a, b) => {
          for (const orderByItem of options.orderBy) {
            const [field, order] = Object.entries(orderByItem)[0];
            let aValue: any = a[field as keyof IEvent];
            let bValue: any = b[field as keyof IEvent];

            if (field === 'date') {
              aValue = aValue.getTime();
              bValue = bValue.getTime();
            }

            if (aValue !== bValue) {
              return order === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
            }
          }
          return 0;
        });
      }
    }

    // Apply pagination
    const skip = options.skip || 0;
    const take = options.take || filteredEvents.length;
    
    return filteredEvents.slice(skip, skip + take);
  }

  async findFirst(options: { where: { id: string; isDeleted?: boolean } }): Promise<IEvent | null> {
    const event = this.events.find(event => 
      event.id === options.where.id && 
      (options.where.isDeleted === undefined || event.isDeleted === options.where.isDeleted)
    );
    return event || null;
  }

  async findUnique(options: { where: { id: string } }): Promise<IEvent | null> {
    const event = this.events.find(event => event.id === options.where.id);
    return event || null;
  }

  async update(options: { where: { id: string }; data: Partial<IEvent> }): Promise<IEvent> {
    const eventIndex = this.events.findIndex(event => event.id === options.where.id);
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...options.data,
      updatedAt: new Date(),
    };

    return this.events[eventIndex];
  }

  async delete(options: { where: { id: string } }): Promise<IEvent> {
    const eventIndex = this.events.findIndex(event => event.id === options.where.id);
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    const deletedEvent = this.events[eventIndex];
    this.events.splice(eventIndex, 1);
    return deletedEvent;
  }
}

// Create a singleton instance
const inMemoryStorage = new InMemoryEventStorage();

export default inMemoryStorage; 