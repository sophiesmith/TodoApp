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
  let items = 0;
  for(let attr in tasks){
    let task = tasks[attr];
    tasksArray.push({status: task.status, value: task.value, color: task.color, photo: task.photo, visible: task.visible, id: attr});
    if (task.status === '') {
      items++;
    }
  }
  return {
    value: todoApp.value,
    color: todoApp.color,
    photo: todoApp.photo,
    photoUrl: todoApp.photoUrl,
    tasks: tasksArray,
    itemsLeft: items,
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