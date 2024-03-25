import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useDeleteTodo = (setCurrentId) => {
	const onClickDeleteTodo = (id) => {
		setCurrentId(id);
		const todoDbRef = ref(db, `todos/${id}`);
		remove(todoDbRef).then((response) => {
			console.log('Todo deleted:', response);
		});
	};

	return onClickDeleteTodo;
};
