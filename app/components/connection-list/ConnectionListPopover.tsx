import React from 'react';
import {
  IProps,
  Menu,
  MenuDivider,
  MenuItem,
  Icon,
  Intent
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

interface OwnProps {
  onDisconnect: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onExit: () => void;
}

const ConnectionListPopover: React.FC<OwnProps> = () => {
  return (
    <Menu>
      <MenuItem text="Disconnect" icon={IconNames.DISABLE} />
      <MenuItem
        text="Edit"
        icon={<Icon icon={IconNames.EDIT} intent={Intent.WARNING} />}
      />
      <MenuDivider />
      <MenuItem
        text="Delete"
        icon={<Icon icon={IconNames.TRASH} intent={Intent.DANGER} />}
      />
      <MenuDivider />
      <MenuItem text="Exit" icon={IconNames.CROSS} />
    </Menu>
  );
};

export default ConnectionListPopover;
