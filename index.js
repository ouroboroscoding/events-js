/**
 * Events
 *
 * Event model for non UI events
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-24
 */
// Init the callbacks object
const callbacks = {};
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
function subscribe(event, callback) {
    // If the event doesn't exist yet
    if (!(event in callbacks)) {
        callbacks[event] = [];
    }
    // Add the callback to the list
    callbacks[event].push(callback);
    return true;
}
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
export function trigger(event, ...varArgs) {
    // If we have callbacks for the event
    if (event in callbacks) {
        // Check for additional arguments that will be passed to the
        //	callbacks
        let args = [];
        if (varArgs && varArgs.length) {
            args = varArgs;
        }
        // If there's any callbacks, call them one by one
        for (const f of callbacks[event]) {
            try {
                // If we got false back, stop calling the callbacks
                if (f.apply(null, args) === false) {
                    break;
                }
            }
            catch (err) {
                throw new Error(event + ' callback threw exception: ' + err);
            }
        }
    }
}
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
function unsubscribe(event, callback) {
    // If the name exists in the object
    if (event in callbacks) {
        // If the callback exists in the list
        const i = callbacks[event].indexOf(callback);
        if (i > -1) {
            callbacks[event].splice(i, 1);
            return true;
        }
    }
    // Nothing found, return false
    return false;
}
// Default export
const Events = { subscribe, trigger, unsubscribe };
export default Events;
