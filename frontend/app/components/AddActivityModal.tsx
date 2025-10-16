import React, { useState, useEffect, useRef } from "react";
import { activityNames } from "../activities";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  categoryTranslations: { [key: string]: string };
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose, onSubmit, categoryTranslations }) => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(categoryTranslations)[0]);
  // Состояние для хранения длины обрезки текста
  const [truncateLength, setTruncateLength] = useState(50);
  // Ref для доступа к элементу select
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(Object.keys(categoryTranslations)[0]);

      // Функция для вычисления длины обрезки на основе ширины элемента select
      const calculateTruncateLength = () => {
        if (selectRef.current) {
          const width = selectRef.current.offsetWidth;
          // Предполагая среднюю ширину символа 8px для шрифта 16px, вычисляем, сколько символов поместится
          // Вычитаем 5, чтобы добавить небольшой отступ
          const chars = Math.floor(width / 9) - 2;
          setTruncateLength(chars);
        }
      };

      // Небольшая задержка, чтобы убедиться, что модальное окно отобразилось и имеет окончательную ширину
      const timeoutId = setTimeout(calculateTruncateLength, 100);

      // Обработчик изменения размера окна
      const handleResize = () => {
        calculateTruncateLength();
      };

      window.addEventListener('resize', handleResize); // Добавляем слушатель события изменения размера окна

      // Очистка слушателя и таймаута при размонтировании компонента или закрытии модального окна
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen, categoryTranslations]);

  if (!isOpen) {
    return null;
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Функция для обрезки строки до n символов и добавления многоточия
  const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-sm">
      <div className="relative mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Добавить мероприятие</h3>
        <form onSubmit={onSubmit} className="mt-2 space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Направление</label>
            <select name="category" id="category" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required onChange={handleCategoryChange} value={selectedCategory}>
              {Object.keys(categoryTranslations).map(key => (
                <option key={key} value={key}>{categoryTranslations[key]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Наименование мероприятия</label>
            {/* Ref используется для получения ширины элемента select */}
            <select name="name" id="name" ref={selectRef} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
              {activityNames[selectedCategory]?.map(name => (
                // Атрибут title показывает полный текст при наведении
                <option key={name} value={name} title={name}>{truncate(name, truncateLength)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
            <textarea name="description" id="description" rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
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