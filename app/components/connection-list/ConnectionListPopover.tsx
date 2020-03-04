import React from 'react';
import { Menu, MenuDivider, MenuItem, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

interface OwnProps {
  isOpen: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onExit: () => void;
}

const ConnectionListPopover: React.FC<OwnProps> = ({
  onEdit,
  onDelete,
  onDisconnect,
  onConnect,
  isOpen
}) => {
  return (
    <Menu>
      {isOpen ? (
        <MenuItem
          text="Disconnect"
          icon={IconNames.DISABLE}
          onClick={onDisconnect}
        />
      ) : (
        <MenuItem text="Connect" icon={IconNames.LINK} onClick={onConnect} />
      )}
      <MenuItem
        text="Edit"
        icon={<Icon icon={IconNames.EDIT} intent={Intent.WARNING} />}
        onClick={onEdit}
        disabled={isOpen}
      />

      <MenuDivider />
      <MenuItem
        text="Delete"
        icon={<Icon icon={IconNames.TRASH} intent={Intent.DANGER} />}
        onClick={onDelete}
        disabled={isOpen}
      />
      <MenuDivider />
      <MenuItem text="Exit" icon={IconNames.CROSS} />
    </Menu>
  );
};

export default ConnectionListPopover;
