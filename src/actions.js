
export const ADD_TODO = "ADD_TODO"
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED"
export const TOGGLE_EDIT = "TOGGLE_EDIT"
export const CHANGE_TASK = "CHANGE_TASK"
export const SET_VISIBILITY = "SET_VISIBILITY"
export const REMOVE_TODO = "REMOVE_TODO"
export const CHANGE_INPUT = "CHANGE_INPUT"
export const TOGGLE_ALL = "TOGGLE_ALL"
export const CLEAR_COMPLETED = "CLEAR_COMPLETED"
export const UPDATE_ITEMS = "UPDATE_ITEMS"
export const CHANGE_USER = "CHANGE_USER"

export function addTodo(task) {
  return { type: ADD_TODO, task }
}

export function toggleCompleted(id) {
	return {type: TOGGLE_COMPLETED, id}
}

export function toggleEdit(id) {
	return {type: TOGGLE_EDIT, id}
}

export function changeTask(id, newTask) {
	return {type: CHANGE_TASK, id, newTask}
}

export function setVisibility(id, val) {
	return {type: SET_VISIBILITY, id, val}
}

export function removeTodo(id) {
	return {type: REMOVE_TODO, id}
}

export function changeInput(val) {
	return {type: CHANGE_INPUT, val}
}

export function toggleAll() {
	return {type: TOGGLE_ALL}
}

export function clearCompleted() {
	return {type: CLEAR_COMPLETED}
}

export function updateItems(items) {
	return {type: UPDATE_ITEMS, items}
}

export function changeUser(id) {
	return {type: CHANGE_USER, id}
}