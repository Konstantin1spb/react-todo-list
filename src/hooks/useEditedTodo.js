import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useEditedTodo = (currentId, setCurrentId) => {
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
		const todoDbRef = ref(db, `todos/${currentId}`);
		set(todoDbRef, {
			title: editedTodo,
		})
			.then((response) => {
				console.log('Todo edited:', response);
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
