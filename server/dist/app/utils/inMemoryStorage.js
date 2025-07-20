"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_constant_1 = require("../modules/event/event.constant");
class InMemoryEventStorage {
    constructor() {
        this.events = [];
        this.nextId = 1;
    }
    generateId() {
        return `event_${this.nextId++}_${Date.now()}`;
    }
    create(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const event = {
                id: this.generateId(),
                title: eventData.title,
                date: new Date(eventData.date),
                time: eventData.time,
                notes: eventData.notes,
                archivedStatus: false,
                category: (0, event_constant_1.categorizeEvent)(eventData.title, eventData.notes),
                createdAt: now,
                updatedAt: now,
                isDeleted: false,
            };
            this.events.push(event);
            return event;
        });
    }
    findMany(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let filteredEvents = this.events.filter(event => !event.isDeleted);
            // Apply category filter
            if ((_a = options.where) === null || _a === void 0 ? void 0 : _a.category) {
                filteredEvents = filteredEvents.filter(event => event.category === options.where.category);
            }
            // Apply sorting
            if (options.orderBy) {
                if (typeof options.orderBy === 'object' && !Array.isArray(options.orderBy)) {
                    // Single field sorting
                    const [field, order] = Object.entries(options.orderBy)[0];
                    filteredEvents.sort((a, b) => {
                        let aValue = a[field];
                        let bValue = b[field];
                        // Handle date comparison
                        if (field === 'date') {
                            aValue = aValue.getTime();
                            bValue = bValue.getTime();
                        }
                        if (order === 'asc') {
                            return aValue > bValue ? 1 : -1;
                        }
                        else {
                            return aValue < bValue ? 1 : -1;
                        }
                    });
                }
                else if (Array.isArray(options.orderBy)) {
                    // Multiple field sorting
                    filteredEvents.sort((a, b) => {
                        for (const orderByItem of options.orderBy) {
                            const [field, order] = Object.entries(orderByItem)[0];
                            let aValue = a[field];
                            let bValue = b[field];
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
        });
    }
    findFirst(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = this.events.find(event => event.id === options.where.id &&
                (options.where.isDeleted === undefined || event.isDeleted === options.where.isDeleted));
            return event || null;
        });
    }
    findUnique(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = this.events.find(event => event.id === options.where.id);
            return event || null;
        });
    }
    update(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventIndex = this.events.findIndex(event => event.id === options.where.id);
            if (eventIndex === -1) {
                throw new Error('Event not found');
            }
            this.events[eventIndex] = Object.assign(Object.assign(Object.assign({}, this.events[eventIndex]), options.data), { updatedAt: new Date() });
            return this.events[eventIndex];
        });
    }
    delete(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventIndex = this.events.findIndex(event => event.id === options.where.id);
            if (eventIndex === -1) {
                throw new Error('Event not found');
            }
            const deletedEvent = this.events[eventIndex];
            this.events.splice(eventIndex, 1);
            return deletedEvent;
        });
    }
}
// Create a singleton instance
const inMemoryStorage = new InMemoryEventStorage();
exports.default = inMemoryStorage;
