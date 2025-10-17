import React, { useState, useEffect, useRef } from "react";
import { getActivityDetails } from "../api/auth";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  categoryTranslations: { [key: string]: string };
}

interface ActivityDetail {
  name: string;
  points: number[];
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose, onSubmit, categoryTranslations }) => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(categoryTranslations)[0]);
  const [activityDetails, setActivityDetails] = useState<{ [key: string]: ActivityDetail[] }>({});
  const [truncateLength, setTruncateLength] = useState(50);
  const selectRef = useRef<HTMLSelectElement>(null);

  const [selectedActivityName, setSelectedActivityName] = useState('');
  const [availablePoints, setAvailablePoints] = useState<number[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<number | ''>('');

  useEffect(() => {
    if (isOpen) {
      const firstCategory = Object.keys(categoryTranslations)[0];
      setSelectedCategory(firstCategory);
      setSelectedActivityName('');
      setAvailablePoints([]);
      setSelectedPoints('');

      const fetchActivityDetails = async () => {
        const result = await getActivityDetails();
        if (result.success) {
          setActivityDetails(result.activityDetails);
        }
      };

      fetchActivityDetails();

      const calculateTruncateLength = () => {
        if (selectRef.current) {
          const width = selectRef.current.offsetWidth;
          const chars = Math.floor(width / 9) - 2;
          setTruncateLength(chars);
        }
      };

      const timeoutId = setTimeout(calculateTruncateLength, 100);
      const handleResize = () => calculateTruncateLength();
      window.addEventListener('resize', handleResize);

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
    setSelectedActivityName('');
    setAvailablePoints([]);
    setSelectedPoints('');
  };

  const handleActivityNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    setSelectedActivityName(name);
    const activity = activityDetails[selectedCategory]?.find(act => act.name === name);
    const points = activity ? activity.points : [];
    setAvailablePoints(points);
    setSelectedPoints(points.length > 0 ? points[0] : '');
  };

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
            <select name="name" id="name" ref={selectRef} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required onChange={handleActivityNameChange} value={selectedActivityName}>
              <option value="" disabled>Выберите мероприятие</option>
              {activityDetails[selectedCategory]?.map(activity => (
                <option key={activity.name} value={activity.name} title={activity.name}>{truncate(activity.name, truncateLength)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700">Баллы</label>
            <select name="points" id="points" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required value={selectedPoints} onChange={(e) => setSelectedPoints(Number(e.target.value))} disabled={availablePoints.length === 0}>
              {availablePoints.length === 0 && <option value="">--</option>}
              {availablePoints.map(point => (
                <option key={point} value={point}>{point}</option>
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
