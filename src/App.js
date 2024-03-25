import styles from './app.module.css';
import { useState } from 'react';
import { useNewTodo, useEditedTodo, useDeleteTodo, useLoadTodos } from './hooks/index';

const App = () => {
	const [currentId, setCurrentId] = useState();
	const [searchTodo, setSearchTodo] = useState(null);
	const [isSort, setIsSort] = useState(false);
	const [sortButton, setSortButton] = useState('Sort');

	const todos = useLoadTodos(isSort, setSortButton);

	const { newTodo, onChangeNewTodo, onSubmitNewTodo } = useNewTodo();

	const {
		editedTodo,
		onClickOpenToEditTodo,
		onChangeEditedTodo,
		onSubmitEditedTodo,
		openModal,
		editedTodoError,
	} = useEditedTodo(currentId, setCurrentId);

	const onClickDeleteTodo = useDeleteTodo(setCurrentId);

	const onChangeSearchTodo = ({ target }) => {
		setSearchTodo(target.value);
	};

	return (
		<main className={styles.todos}>
			<div
				className={`${styles.todosContainer} ${openModal ? styles.blured : null}`}
			>
				<div className={styles.todosControls}>
					<form onSubmit={onSubmitNewTodo}>
						<input onChange={onChangeNewTodo} value={newTodo}></input>
						<button>Add todo</button>
					</form>
					<input
						onChange={onChangeSearchTodo}
						value={searchTodo}
						placeholder="Search todo"
					></input>
					<button onClick={() => setIsSort(!isSort)}>{sortButton}</button>
				</div>
				{Object.keys(todos).length ? (
					Object.entries(todos).map(([id, { title }]) => (
						<div
							key={id}
							className={`${styles.todo} ${searchTodo && !title.includes(searchTodo) ? styles.hide : styles.show}`}
						>
							{title}
							<div>
								<span
									className={styles.editButton}
									onClick={() => onClickOpenToEditTodo(id)}
								></span>
								<span
									className={styles.deleteButton}
									onClick={() => onClickDeleteTodo(id)}
								></span>
							</div>
						</div>
					))
				) : (
					<span>Add some todos!</span>
				)}
			</div>
			<form
				onSubmit={onSubmitEditedTodo}
				className={`${styles.editTodoForm} ${openModal ? styles.active : null}`}
			>
				{editedTodoError && <div className={styles.error}>{editedTodoError}</div>}
				<input onChange={onChangeEditedTodo} value={editedTodo}></input>
				<button disabled={!!editedTodoError}>Edit todo</button>
			</form>
		</main>
	);
};

export default App;
