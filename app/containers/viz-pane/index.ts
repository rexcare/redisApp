import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import VizPane from './VizPane';

export const mapStateToProps = state => {
  console.log(state);
  return {};
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VizPane);
