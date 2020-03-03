import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/types';
// eslint-disable-next-line import/no-cycle
import MainScreen from './MainScreen';
import { initDBAction, getConnectionsAction } from '../../actions/localDB';

export const mapStateToProps = ({ localDBState }: AppState) => {
  const { initStatus } = localDBState;
  return { localDBInitStatus: initStatus };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      initLocalDBAction: initDBAction,
      getConnectionsAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
