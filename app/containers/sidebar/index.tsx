import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  getConnectionsAction,
  addConnectionAction,
  updateConnectionAction,
  removeConnectionAction
} from '../../actions/localDB';
import { setActiveConnectionAction } from '../../actions/connection';
import { isConnectingToServerAction } from '../../actions/loading';
import { getAllKeyValuesAction } from '../../actions/query';
import { AppState } from '../../reducers/types';
// eslint-disable-next-line import/no-cycle
import Sidebar from './Sidebar';

export const mapStateToProps = ({
  connectionState,
  loadingState
}: AppState) => {
  const { connections, activeConnection } = connectionState;
  const { isConnectingToServer } = loadingState;
  return { connections, activeConnection, isConnectingToServer };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getConnectionsAction,
      addConnectionAction,
      updateConnectionAction,
      removeConnectionAction,
      setActiveConnectionAction,
      isConnectingToServerAction,
      getAllKeyValuesAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
