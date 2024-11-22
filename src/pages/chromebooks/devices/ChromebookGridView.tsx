import React from 'react';
import { Chromebook } from '../../../types/chromebooks';
import { ChromebookCard } from '../ChromebookCard';

interface ChromebookGridViewProps {
  chromebooks: Chromebook[];
}

export function ChromebookGridView({ chromebooks }: ChromebookGridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chromebooks.map((chromebook) => (
        <ChromebookCard key={chromebook.id} chromebook={chromebook} />
      ))}
    </div>
  );
}