import { useState } from 'react';

export const useEditedTodo = (refreshTodos, setRefreshTodos, currentId, setCurrentId) => {
	const [editedTodo, setEditedTodo] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [editedTodoError, setEditedTodoError] = useState(true);

	const onClickOpenToEditTodo = (id) => {
		setCurrentId(id);
		setOpenModal(true);
	};

	const onChangeEditedTodo = ({ target }) => {
		setEditedTodo(target.value);
		if (target.value.length === 0) {
			setEditedTodoError('Новое название не должно быть пустым.');
		} else {
			setEditedTodoError(false);
		}
	};

	const onSubmitEditedTodo = (event) => {
		event.preventDefault();
		fetch(`http://localhost:3005/todos/${currentId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editedTodo,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo edited:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setOpenModal(false));
	};

	return {
		onClickOpenToEditTodo,
		onChangeEditedTodo,
		onSubmitEditedTodo,
		openModal,
		editedTodoError,
	};
};
