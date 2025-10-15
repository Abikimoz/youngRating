import React from "react";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  categoryTranslations: { [key: string]: string };
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose, onSubmit, categoryTranslations }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-sm">
      <div className="relative mx-auto p-5 border w-auto max-w-full min-w-max shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Добавить мероприятие</h3>
        <form onSubmit={onSubmit} className="mt-2 space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Направление</label>
            <select name="category" id="category" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
              {Object.keys(categoryTranslations).map(key => (
                <option key={key} value={key}>{categoryTranslations[key]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Название</label>
            <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Дата</label>
            <input type="date" name="date" id="date" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div className="items-center gap-2 mt-3 sm:flex">
            <button type="submit" className="w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2">Добавить</button>
            <button type="button" className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
