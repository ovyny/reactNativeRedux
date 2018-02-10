import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

// For android spring animation support
UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, expanded } = this.props;
    const { descriptionStyle } = styles;

    if (expanded) {
      return (
        <Text style={descriptionStyle}>
          {library.description}
        </Text>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  descriptionStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
