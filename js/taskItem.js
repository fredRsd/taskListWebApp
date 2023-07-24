/**
 * Represents a task item.
 * @class
 * @default
 */
export default class TaskItem {
    /**
     * Creates a new instance of TaskItem.
     * @constructor
     */
    constructor() {
      /**
       * The ID of the task item.
       * @type {?number}
       * @private
       */
      this._id = null;
  
      /**
       * The content of the task item.
       * @type {?string}
       * @private
       */
      this._item = null;
    }
  
    /**
     * Get the ID of the task item.
     * @returns {?number} The ID of the task item.
     */
    getId() {
      return this._id;
    }
  
    /**
     * Get the content of the task item.
     * @returns {?string} The content of the task item.
     */
    getItem() {
      return this._item;
    }
  
    /**
     * Set the ID of the task item.
     * @param {?number} id - The ID to set.
     */
    setId(id) {
      this._id = id;
    }
  
    /**
     * Set the content of the task item.
     * @param {?string} item - The content to set.
     */
    setItem(item) {
      this._item = item;
    }
  }