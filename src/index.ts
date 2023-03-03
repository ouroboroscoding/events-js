// Import/Export Event types
export type { EventCallback, EventReturn } from './Event';

// Import Events
import Events from './Events';

// Create the one instance of events
const events = new Events();

// Export it as the module default
export default events;