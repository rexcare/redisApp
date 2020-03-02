import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  getConnections,
  addConnection,
  updateConnection,
  removeConnection
} from '../../actions/localDB';
import { setActiveConnection } from '../../actions/connection';
import { isConnectingToServer } from '../../actions/loading';
import { AppState } from '../../reducers/types';
// eslint-disable-next-line import/no-cycle
import Sidebar from './Sidebar';

export const mapStateToProps = ({ connectionState }: AppState) => {
  const { connections, activeConnection } = connectionState;
  return { connections, activeConnection };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getConnections,
      addConnection,
      updateConnection,
      removeConnection,
      setActiveConnection,
      isConnectingToServer
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
