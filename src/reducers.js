import * as todoActions from './actions'

export const initialState = {
	tasks: [],
  	value: '', 
  	toggleTo: 'completed',
  	itemsLeft: 0,
  	currId: -1
}

export function todoApp(state = initialState, action) {
	switch(action.type) {
		case todoActions.ADD_TODO:
			return Object.assign({}, state, {
				tasks: [
					...state.tasks,
					{
						task: action.task,
						id: state.id+1,
						status: '',
						visible: true
					}
				],
				value: '',
				itemsLeft: state.itemsLeft+1,
				currId: state.id+1
			})
		case todoActions.TOGGLE_COMPLETED: 
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						return Object.assign({}, task, {
							status: (task.status === 'completed' ? '' : 'completed')
						})
					}
				})
			})
		case todoActions.TOGGLE_EDIT: 
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						return Object.assign({}, task, {
							status: (task.status === 'editing' ? '' : 'editing')
						})
					}
				})
			})
		case todoActions.CHANGE_TASK:
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						return Object.assign({}, task, {
							value: action.newTask
						})
					}
				})
			})
		case todoActions.SET_VISIBILITY:
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						return Object.assign({}, task, {
							visibility: action.val
						})
					}
				})
			})
		case todoActions.REMOVE_TODO:
			const i = tasks.findIndex((val, j) => tasks[j].id === action.id);
			let itemsLeft = state.itemsLeft;
			if (state.tasks[i].status !== 'completed') {
				itemsLeft--;
			}

			return Object.assign({}, state, {
				tasks: state.tasks.filter((task) => task.id !== action.id),
				itemsLeft: itemsLeft
			})
		case todoActions.CHANGE_INPUT:
			return Object.assign({}, state, {
				value: action.val
			})
		case todoActions.TOGGLE_ALL:
			const tasks = state.tasks.slice();
			let toggleTo = '';

			for (let i=0; i<tasks.length; i++) {
	  			tasks[i].status = this.state.toggleTo;
	  		}
	  		if (state.toggleTo === '') {
  			toggleTo = 'completed';
  			} 
			return Object.assign({}, state, {
				tasks: tasks,
				toggleTo: toggleTo
			})
		case todoActions.CLEAR_COMPLETED:
			return Object.assign({}, state, {
				tasks: this.state.tasks.filter((val, i) => tasks[i].status !== 'completed')
			})
		default:
			return state
	}
}