import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';
import { connect } from 'react-redux';
import * as todoActions from './actions';
import { bindActionCreators, compose } from 'redux';
import {Header} from './Header';
import { firebaseConnect, isLoaded, isEmpty, orderedToJS, pathToJS } from 'react-redux-firebase'


function mapStateToProps (state) {
  const { firebase, todoApp } = state
  return {
    value: todoApp.value,
    tasks: orderedToJS(firebase, 'users/'+todoApp.userId+'/') || [],
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