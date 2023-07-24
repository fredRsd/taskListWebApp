/**
 * Represents a task list.
 * @class
 * @default
 */
export default class TaskList {
    /**
     * Creates a new instance of TaskList.
     * @constructor
     */
    constructor() {
      /**
       * The array representing the list of task items.
       * @type {Array}
       * @private
       */
      this._list = [];
    }
  
    /**
     * Get the list of task items.
     * @returns {Array} The list of task items.
     */
    getList() {
      return this._list;
    }
  
    /**
     * Clears the list of task items.
     */
    clearList() {
      this._list = [];
    }
  
    /**
     * Add an item to the list.
     * @param {Object} itemObj - The item object to add.
     */
    addItemToList(itemObj) {
      this._list.push(itemObj);
    }
  
    /**
     * Remove an item from the list by ID.
     * @param {number} id - The ID of the item to remove.
     */
    removeItemFromList(id) {
      const list = this._list;
  
      // Find the item with the matching ID and remove it from the list
      for (let i = 0; i < list.length; i++) {
        console.log("aaaaaa");
        if (list[i]._id == id) {
          list.splice(i, 1);
          break;
        }
      }
    }
  }
  