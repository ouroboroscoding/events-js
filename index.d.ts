/**
 * Events
 *
 * Event model for non UI events
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
declare type Callback = (...args: any[]) => {};
/**
 * Subscribe
 *
 * Adds a callback to an event
 *
 * @name subscribe
 * @access public
 * @param {string} event The name of the event
 * @param {function} callback The callback to attach to the event
 * @returns {boolean}
 */
declare function subscribe(event: string, callback: Callback): boolean;
/**
 * Trigger
 *
 * Triggers a specific event and calls all callbacks associated
 *
 * @name trigger
 * @access public
 * @param {string} event The name of the event to trigger
 * @param {...*} varArgs Variable number of arguments passed to subscribers of the event
 * @returns {void}
 */
export declare function trigger(event: string, ...varArgs: any[]): void;
/**
 * Unsubscribe
 *
 * Removes a callback from a specific event
 *
 * @name unsubscribe
 * @access public
 * @param {string} event The name of the event to remove the callback from
 * @param {function} callback The exact same callback that was added to the event
 * @returns {boolean}
 */
declare function unsubscribe(event: string, callback: Callback): boolean;
declare const Events: {
    subscribe: typeof subscribe;
    trigger: typeof trigger;
    unsubscribe: typeof unsubscribe;
};
export default Events;
