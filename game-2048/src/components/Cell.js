import React from 'react';

export default function Cell(props) {
  const {value, isNew, isMerged} = props;
  const cellClass = value ? `cell-${value}` : '';
  const newNumber = isNew ? `new-number` : '';
  const merged = isMerged ? `merged` : '';
  return (
    <div
      className={`cell ${cellClass} ${newNumber} ${merged}`}
    >
      {value}
    </div>
  )
}