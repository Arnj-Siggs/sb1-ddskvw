import React from 'react';
import { Tab } from '@headlessui/react';
import { clsx } from 'clsx';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  selectedTab: string;
  setSelectedTab: (value: string) => void;
} | null>(null);

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={clsx('flex space-x-4 border-b border-gray-200', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const { selectedTab, setSelectedTab } = context;
  const isSelected = selectedTab === value;

  return (
    <button
      onClick={() => setSelectedTab(value)}
      className={clsx(
        'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
        isSelected
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const { selectedTab } = context;
  if (selectedTab !== value) return null;

  return <div className={className}>{children}</div>;
}