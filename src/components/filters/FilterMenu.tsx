import React from 'react';
import { Menu } from '@headlessui/react';
import { Save, Trash2, Star, ChevronDown } from 'lucide-react';
import { useFilters } from '../../hooks/useFilters';
import { useDialog } from '../../hooks/useDialog';
import { SaveFilterDialog } from './SaveFilterDialog';

interface FilterMenuProps {
  type: 'ticket' | 'asset' | 'chromebook';
  currentFilters: Record<string, any>;
  onFilterSelect: (filters: Record<string, any>) => void;
}

export function FilterMenu({ type, currentFilters, onFilterSelect }: FilterMenuProps) {
  const dialog = useDialog();
  const { savedFilters, deleteFilter, setDefaultFilter } = useFilters();

  const typeFilters = savedFilters.filter((filter) => filter.type === type);

  const handleSaveFilter = () => {
    dialog.show({
      title: 'Save Filter',
      content: (
        <SaveFilterDialog
          type={type}
          filters={currentFilters}
          onClose={() => dialog.hide()}
        />
      ),
    });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Saved Filters
        <ChevronDown className="ml-2 h-4 w-4" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          {typeFilters.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No saved filters
            </div>
          ) : (
            typeFilters.map((filter) => (
              <Menu.Item key={filter.id}>
                {({ active }) => (
                  <div
                    className={`flex items-center justify-between px-4 py-2 text-sm ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    <button
                      onClick={() => onFilterSelect(filter.filters)}
                      className="flex-1 text-left text-gray-700"
                    >
                      {filter.name}
                      {filter.isDefault && (
                        <span className="ml-2 text-yellow-500">
                          <Star className="inline h-4 w-4" />
                        </span>
                      )}
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setDefaultFilter(filter.id)}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteFilter(filter.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </Menu.Item>
            ))
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSaveFilter}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Current Filter
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}