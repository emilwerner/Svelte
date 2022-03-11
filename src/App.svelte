<script>
  import { storage } from './storage';
  import TodoList from './todolist.svelte';
  import TodoForm from './form.svelte';

  let array = storage.getList();

  const addToList = (obj) => {
    if (obj) {
      array = [...array, obj];
      persistList();
    }
  };

  const deleteFromList = (id) => {
    array = array.filter((item) => item.id !== id);
    persistList();
  };

  const persistList = () => {
    storage.setList(array);
  };
</script>

<div class="container">
  <div class="row">
    <div class="col">
      <TodoForm {addToList} />
      <TodoList {array} {persistList} {deleteFromList} />
    </div>
  </div>
</div>

<style>
  .container {
    margin-top: 150px;
    background: #f9f6ee;
    border-radius: 5px;
    padding: 25px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
</style>
