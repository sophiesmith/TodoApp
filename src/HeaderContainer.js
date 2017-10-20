import React, { Component } from 'react';
import {Main} from './Main';
import {Footer} from './Footer';
import { connect } from 'react-redux';
import * as todoActions from './actions';
import { bindActionCreators } from 'redux';
import {Header} from './Header';


function mapStateToProps (state) {
  return {
    tasks: state.tasks,
    value: state.value,
    itemsLeft: state.itemsLeft,
    currId: state.currId
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
