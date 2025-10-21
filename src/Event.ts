/**
 * Event
 *
 * Single event model
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-03-1
 */

// Callback type
export type EventCallback = (...args: any[]) => void;

// Return type
export type EventReturn = {
	lastArgs: any[] | null,
	unsubscribe: () => boolean
}

/**
 * Event
 *
 * Manages subscriptions to a single event
 *
 * @name Event
 * @extends Subscribe
 */
export default class Event {

	// The last event sent
	private lastArgs: any[] | null = null;

	// The list of callbacks to notify on changes
	private subscribers: EventCallback[];

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name Event
	 * @access public
	 * @returns a new instance
	 */
	constructor() {
		this.subscribers = [];
	}

	/**
	 * Trigger
	 *
	 * Called to notify anyone subscribed of changes
	 *
	 * @name trigger
	 * @access public
	 * @param
	 */
	trigger(...varArgs: any[]): void  {

		// Check for additional arguments that will be passed to the
		//	callbacks
		let args: any[] = [];
		if(varArgs && varArgs.length) {
			args = varArgs;
		}

		// Store it for anyone who subscribes in the future
		this.lastArgs = args;

		// Notify the subscribers
		for(const f of this.subscribers) {
			f.apply(null, args);
		}
	}

	/**
	 * Subscribe
	 *
	 * Stores a callback function to be called whenever the option data needs
	 * to change
	 *
	 * @name subscribe
	 * @access public
	 * @param callback The function to call when data changes
	 * @returns the last trigger arguments, and an unsubscribe method
	 */
	subscribe(callback: EventCallback): EventReturn {

		// Add it to the list
		this.subscribers.push(callback);

		// Return the current data as well as a function to unsubscribe
		return {
			lastArgs: this.lastArgs,
			unsubscribe: () => {
				return this.unsubscribe(callback);
			}
		};
	}

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
	public unsubscribe(callback: EventCallback): boolean {

		// Search for the index of the callback
		const i = this.subscribers.indexOf(callback);

		// If it's found
		if(i > -1) {

			// Splice it out of the callbacks and return success
			this.subscribers.splice(i, 1);
			return true;
		}

		// Return that it was not removed
		return false;
	}
}