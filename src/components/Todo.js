import { useState } from 'react';
import cancelImage from '../assets/images/cancel.png';
import { useDeleteToDoMutation, useUpdateToDoMutation } from '../features/apiSlice';
import Modal from './modal';

export default function Todo({ todo }) {
    const { text, id, completed, color } = todo;
    const [updateToDo] = useUpdateToDoMutation();
    const [deleteToDo] = useDeleteToDoMutation();

    const [modal, setModal] = useState('');

    const closeModal = () => {
        setModal('');
    };
    const handleEdit = (i) => {
        setModal(<Modal id={i} todo={todo} closeModal={closeModal} />);
    };
    const handleStatusChange = (todoId, status) => {
        updateToDo({
            id: todoId,
            data: {
                completed: !status,
            },
        });
    };
    const handleColorChange = (todoId, color) => {
        updateToDo({
            id: todoId,
            data: {
                color: color,
            },
        });
    };
    const handleDelete = (todoId) => {
        deleteToDo(todoId);
    };

    return (
        <>
            {modal}
            <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
                <div
                    className={`relative rounded-full bg-white border-2 border-gray-400 cursor:pointer w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                        completed && 'border-green-500 focus-within:border-green-500'
                    }`}
                >
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => handleStatusChange(id, completed)}
                        className="opacity-0 absolute rounded-full"
                    />
                    {completed && (
                        <svg
                            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                            viewBox="0 0 20 20"
                        >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                    )}
                </div>

                <div className={`select-none flex-1 ${completed && 'line-through'}`}>{text}</div>
                <div
                    className={`flex-shrink-0 h-4 w-4  ml-auto cursor-pointer
        }`}
                    onClick={() => handleEdit(id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="fill-green-600"
                    >
                        <path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z" />
                    </svg>
                </div>

                <div
                    className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                        color === 'green' && 'bg-green-500'
                    }`}
                    onClick={() => handleColorChange(id, 'green')}
                ></div>

                <div
                    className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                        color === 'yellow' && 'bg-yellow-500'
                    }`}
                    onClick={() => handleColorChange(id, 'yellow')}
                ></div>

                <div
                    className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                        color === 'red' && 'bg-red-500'
                    }`}
                    onClick={() => handleColorChange(id, 'red')}
                ></div>

                <img
                    src={cancelImage}
                    className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                    alt="Cancel"
                    onClick={() => handleDelete(id)}
                />
            </div>
        </>
    );
}
