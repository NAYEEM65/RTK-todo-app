import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://json-todo-api-nayeem.herokuapp.com',
    }),
    tagTypes: ['allTodos'],
    endpoints: (builder) => ({
        getToDos: builder.query({
            query: ({ status, colors }) => {
                let queryString = '';
                if (colors.length > 0) {
                    queryString += colors.map((color) => `&color=${color}`).join('&');
                }
                if (status !== '') {
                    if (status === 'Complete') {
                        queryString += '&completed=true';
                    } else if (status === 'Incomplete') {
                        queryString += '&completed=false';
                    }
                }
                return {
                    url: `/todos/?_sort=id&_order=desc${queryString}`,
                    method: 'GET',
                };
            },
            providesTags: ['allToDos'],
        }),
        getSingleToDo: builder.query({
            query: (id) => `/todos/?id=${id}`,
        }),
        addToDo: builder.mutation({
            query: (data) => ({
                url: `/todos`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: () => ['allToDos'],
        }),
        updateToDo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: () => ['allToDos'],
        }),

        deleteToDo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => ['allToDos'],
        }),
    }),
});
export const {
    useGetToDosQuery,
    useGetSingleToDoQuery,
    useAddToDoMutation,
    useUpdateToDoMutation,
    useDeleteToDoMutation,
} = apiSlice;
