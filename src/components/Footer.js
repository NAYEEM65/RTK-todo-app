import { useDispatch, useSelector } from 'react-redux';
import { useGetToDosQuery } from '../features/apiSlice';
import { colorAdded, colorRemoved, statusChanged } from '../features/filter/filterSlice';

const numberOfTodos = (no_of_todos) => {
    switch (no_of_todos) {
        case 0:
            return 'No task';
        case 1:
            return '1 task';
        default:
            return `${no_of_todos} tasks`;
    }
};

export default function Footer() {
    const { selectedColors, status } = useSelector((state) => state.filters);
    const {
        data: todos,
        isLoading,
        isError,
    } = useGetToDosQuery({ status: status, colors: selectedColors });

    const dispatch = useDispatch();

    const inCompletedToDo = todos?.filter((todos) => todos.completed !== true && todos);

    const handleStatusChange = (status) => {
        dispatch(statusChanged(status));
    };

    const handleColorChange = (color) => {
        if (selectedColors.includes(color)) {
            dispatch(colorRemoved(color));
        } else {
            dispatch(colorAdded(color));
        }
    };

    let content = null;
    if (isLoading) {
        content = <p></p>;
    }
    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }
    if (!isLoading && !isError) {
        content = (
            <div className="mt-4 flex justify-between text-xs text-gray-500">
                <p>{numberOfTodos(inCompletedToDo.length)} left</p>
                <ul className="flex space-x-1 items-center text-xs">
                    <li
                        className={`cursor-pointer ${status === 'All' && 'font-bold'}`}
                        onClick={() => handleStatusChange('All')}
                    >
                        All
                    </li>
                    <li>|</li>
                    <li
                        className={`cursor-pointer ${status === 'Incomplete' && 'font-bold'}`}
                        onClick={() => handleStatusChange('Incomplete')}
                    >
                        Incomplete
                    </li>
                    <li>|</li>
                    <li
                        className={`cursor-pointer ${status === 'Complete' && 'font-bold'}`}
                        onClick={() => handleStatusChange('Complete')}
                    >
                        Complete
                    </li>
                    <li></li>
                    <li></li>
                    <li
                        className={`h-3 w-3 border-2 ${
                            selectedColors.includes('green') && 'bg-green-500'
                        } border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer`}
                        onClick={() => handleColorChange('green')}
                    ></li>
                    <li
                        className={`h-3 w-3 border-2 border-red-500 ${
                            selectedColors.includes('red') && 'bg-red-500'
                        } md:hover:bg-red-500 rounded-full cursor-pointer `}
                        onClick={() => handleColorChange('red')}
                    ></li>
                    <li
                        className={`h-3 w-3 border-2 border-yellow-500 ${
                            selectedColors.includes('yellow') && 'bg-yellow-500'
                        } md:hover:bg-yellow-500 rounded-full cursor-pointer`}
                        onClick={() => handleColorChange('yellow')}
                    ></li>
                </ul>
            </div>
        );
    }

    return content;
}
