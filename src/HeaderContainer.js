import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';
import { connect } from 'react-redux';
import * as todoActions from './actions';
import { bindActionCreators, compose } from 'redux';
import {Header} from './Header';
import { firebaseConnect, isLoaded, isEmpty, orderedToJS, pathToJS, dataToJS } from 'react-redux-firebase'


function mapStateToProps (state) {
  const { firebase, todoApp } = state;
  let tasks = dataToJS(firebase, 'users/'+todoApp.userId);
  let tasksArray = [];
  for(let attr in tasks){
    let task = tasks[attr];
    tasksArray.push({status: task.status, value: task.value, visible: task.visible, id: attr});
  }
  return {
    value: todoApp.value,
    tasks: tasksArray,
    itemsLeft: todoApp.itemsLeft,
    toggleTo: todoApp.toggleTo,
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile'),
    userId: todoApp.userId
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}


export default compose(
  firebaseConnect([
    'users'
  ]),
  connect( 
    mapStateToProps,
    mapDispatchToProps
  )
)(Header)