import { useState } from 'react';

export const useNewTodo = (refreshTodos, setRefreshTodos) => {
	const [newTodo, setNewTodo] = useState();

	const onChangeNewTodo = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSubmitNewTodo = (event) => {
		event.preventDefault();
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTodo,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo added:', response);
				setRefreshTodos(!refreshTodos);
			});
	};

	return { newTodo, onChangeNewTodo, onSubmitNewTodo };
};
