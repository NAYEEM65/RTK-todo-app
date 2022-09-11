import { useState } from 'react';
import { useUpdateToDoMutation } from '../features/apiSlice';

export default function Modal({ todo, closeModal }) {
    const { text, id } = todo;
    const [updateToDo] = useUpdateToDoMutation();

    const [name, setName] = useState(text);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateToDo({
            id: id,
            data: { text: name },
        });
        closeModal();
    };

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="overflow-y-auto flex bg-opacity-50 bg-slate-700 overflow-x-hidden mr-auto fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        >
            <div className="relative m-auto p-4 w-full max-w-md h-full align-middle md:h-auto ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="authentication-modal"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="py-6 px-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            Edit Todo
                        </h3>
                        <form className="space-y-6" onSubmit={handleUpdate}>
                            <div>
                                <input
                                    type="text"
                                    name="to-do"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=""
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleUpdate}
                                className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-indigo-800"
                            >
                                Update Todo
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
