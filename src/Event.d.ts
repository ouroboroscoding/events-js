/**
 * Event
 *
 * Single event model
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-03-1
 */
export type EventCallback = (...args: any[]) => void;
export type EventReturn = {
    unsubscribe: () => boolean;
};
/**
 * Event
 *
 * Manages subscriptions to a single event
 *
 * @name Event
 * @extends Subscribe
 */
export default class Event {
    private subscribers;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name Event
     * @access public
     * @returns a new instance
     */
    constructor();
    /**
     * Trigger
     *
     * Called to notify anyone subscribed of changes
     *
     * @name trigger
     * @access public
     * @param
     */
    trigger(...varArgs: any[]): void;
    /**
     * Subscribe
     *
     * Stores a callback function to be called whenever the option data needs
     * to change
     *
     * @name subscribe
     * @access public
     * @param callback The function to call when data changes
     * @returns current data
     */
    subscribe(callback: EventCallback): EventReturn;
    /**
     * Unsubscribe
     *
     * Not meant to be called publicaly, but kept as such in order to support
     * code using old style subscrube/unsubscribe methods. Searches for the
     * callback and then removes it from the list if found.
     *
     * @name unsubscribe
     * @access public
     * @param callback The function to look for to remove
     * @returns if the callback was removed or not
     */
    unsubscribe(callback: EventCallback): boolean;
}
