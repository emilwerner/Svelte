<script>
  import { staticValues } from './staticValues';
  import DownloadButton from './downloadButton.svelte';
  export let array;
  export let persistList;
  export let deleteFromList;

  let sortOrder;
  let showCompleted = true;
  const getPrioBadgeClass = (value) => {
    if (value === 'Hög') {
      return 'bg-danger';
    } else if (value === 'Låg') {
      return 'bg-light text-dark';
    }
    return 'bg-primary';
  };

  const sortArray = (arr) => {
    return arr.sort((itemA, itemB) => {
      if (itemA[sortOrder] > itemB[sortOrder]) return 1;
      if (itemA[sortOrder] < itemB[sortOrder]) return -1;
      return 0;
    });
  };

  const filterArray = (arr) => {
    if (showCompleted) {
      return arr;
    }
    return arr.filter((item) => !item.completed);
  };

  $: todoArray = sortArray(filterArray(array, showCompleted), sortOrder);
</script>

<div class="body">
  {#if !!array && !!array.length}
    <div class="row">
      <div class="col">
        <div class="form-floating">
          <select
            bind:value={sortOrder}
            class="form-select"
            id="floatingSelect"
          >
            {#each staticValues.sortValues as item}
              <option value={item.key}>{item.name}</option>
            {/each}
          </select>
          <label for="floatingSelect">Välj sorteringsordning</label>
        </div>
      </div>
      <div class="col">
        <DownloadButton data={array} />
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            bind:checked={showCompleted}
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            >Visa färdiga</label
          >
        </div>
      </div>
    </div>
  {/if}
  <ul class="list-group">
    {#each todoArray as item}
      <li class:completed={item.completed} class="list-group-item">
        <div>
          <input
            class="form-check-input"
            type="checkbox"
            bind:checked={item.completed}
            on:change={persistList}
          />
          <span class="todo-text"> {item.text}</span>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            on:click={() => deleteFromList(item.id)}
          />
          <span class="badge {getPrioBadgeClass(item.priority)}"
            >{item.priority}</span
          >
        </div>
        {#if item.assignedPerson}
          <p class="assigned-person"><em>{item.assignedPerson}</em></p>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .btn-close {
    float: right;
  }

  .form-check-input[type='checkbox'] {
    margin-right: 5px;
  }
  .form-check-input:checked {
    background-color: black;
    border-color: black;
  }
  .completed {
    background: lightgrey;
  }

  .completed .todo-text {
    text-decoration: line-through;
  }
  .badge {
    float: right;
    margin-right: 10px;
  }
  .assigned-person {
    color: grey;
    margin-bottom: 0;
    margin-left: 25px;
  }

  .body {
    width: 90%;
    margin: 0 auto;
  }
  .row {
    margin-bottom: 5px;
  }
  .form-switch {
    margin-top: 21px;
    float: right;
  }
</style>
