import React from 'react';
import { Dialog, FormGroup, InputGroup } from '@blueprintjs/core';

type Props = {
  isOpen: boolean;
};

const ConnectionDialog = () => {
  return (
    <Dialog icon="info-sign">
      <FormGroup
        helperText="Helper text with details..."
        label="Label A"
        labelFor="text-input"
        labelInfo="(required)"
        inline
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
      >
        <InputGroup id="text-input" placeholder="Placeholder text" />
      </FormGroup>
    </Dialog>
  );
};

export default ConnectionDialog;
