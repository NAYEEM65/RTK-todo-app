import { useSelector } from 'react-redux';
import { useGetToDosQuery } from '../features/apiSlice';
import Loading from './Loading';
import Todo from './Todo';

export default function TodoList() {
    const { status, selectedColors } = useSelector((state) => state.filters);
    const {
        data: todos,
        isLoading,
        isError,
    } = useGetToDosQuery({
        status: status ? status : 'All',
        colors: selectedColors,
    });

    //What to render
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <p>Error ...</p>;
    }
    if (!isLoading && !isError) {
        content = (
            <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
                {todos.map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                ))}
            </div>
        );
    }

    return content;
}
