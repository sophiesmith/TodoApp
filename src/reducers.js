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
			return {
				...state,
				tasks: [
					...state.tasks,
					{
						value: action.task,
						id: state.currId+1,
						status: '',
						visible: true
					}
				],
				value: '',
				itemsLeft: state.itemsLeft+1,
				currId: state.currId+1
			};
		case todoActions.TOGGLE_COMPLETED: 
			let items = state.itemsLeft;
			let status = '';
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						if (task.status === 'completed') {
							items++;
						} else {
							items--;
							status = 'completed';
						}
						return Object.assign({}, task, {
							status: status
						})
					} else {
						return task;
					}
				}),
				itemsLeft: items
			})
		case todoActions.TOGGLE_EDIT: 
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						return Object.assign({}, task, {
							status: (task.status === 'editing' ? '' : 'editing')
						})
					} else {
						return task;
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
					} else {
						return task;
					}
				})
			})
		case todoActions.SET_VISIBILITY:
			return Object.assign({}, state, {
				tasks: state.tasks.map((task) => {
					if (task.id === action.id) {
						return Object.assign({}, task, {
							visible: action.val
						})
					} else {
						return task;
					}
				})
			})
		case todoActions.REMOVE_TODO:
			const i = state.tasks.findIndex((val, j) => val.id === action.id);
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
	  			tasks[i].status = state.toggleTo;
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
				tasks: state.tasks.filter((val, i) => val.status !== 'completed')
			})
		default:
			return state
	}
}