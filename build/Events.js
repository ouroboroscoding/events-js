/**
 * Events
 *
 * Event model for non UI events
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
// Local imports
import Event from './Event';
/**
 * Events
 *
 * Handles managing individual events, created once and exported
 *
 * @name Events
 * @access private
 */
export default class Events {
    // The list of events
    events = {};
    /**
     * Get
     *
     * Returns the event object associated with the requested string. If one
     * does not exist yet, it is created then returned
     *
     * @name get
     * @access public
     * @param event The name of the event to get
     */
    get(name) {
        // Does the event exist already?
        if (!(name in this.events)) {
            // Create it
            this.events[name] = new Event();
        }
        // Return the event associated
        return this.events[name];
    }
}
