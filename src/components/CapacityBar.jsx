import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const CapacityBar = ({ allocatedPercent }) => {
  const available = 100 - allocatedPercent;
  return (
    <ProgressBar>
      <ProgressBar now={allocatedPercent} label={`${allocatedPercent}% Allocated`} key={1} variant="danger" />
      <ProgressBar now={available} label={`${available}% Available`} key={2} variant="success" />
    </ProgressBar>
  );
};

export default CapacityBar;
