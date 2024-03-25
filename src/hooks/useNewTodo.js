import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useNewTodo = () => {
	const [newTodo, setNewTodo] = useState();

	const onChangeNewTodo = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSubmitNewTodo = (event) => {
		event.preventDefault();
		const todosDbRef = ref(db, 'todos');
		push(todosDbRef, {
			title: newTodo,
		}).then((response) => {
			console.log('Todo added:', response);
		});
	};

	return { newTodo, onChangeNewTodo, onSubmitNewTodo };
};
