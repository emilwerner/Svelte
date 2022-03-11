<script>
  import { staticValues } from './staticValues';
  export let addToList;
  const prioValues = staticValues.priorityValues;
  let inputText;
  let prioValue;
  let assignedPersonText;
  let showExtraForm = false;

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      addToList({
        id: Date.now(),
        checked: false,
        text: inputText,
        completed: false,
        priority: prioValue,
        assignedPerson: assignedPersonText,
      });
      resetFormValues();
    }
  };
  const resetFormValues = () => {
    inputText = '';
    assignedPersonText = '';
    prioValue = prioValues[0];
  };
  resetFormValues();
</script>

<div class="input-group input-group-lg">
  <input
    type="text"
    class="form-control"
    bind:value={inputText}
    on:keypress={onKeyPress}
  />
  <span
    class="input-group-text"
    on:click={() => (showExtraForm = !showExtraForm)}
    ><span class="arrow right" class:righter={showExtraForm} /></span
  >
</div>
<div class="extra-form" class:show={showExtraForm}>
  <div div class="mb-3">
    <div class="form-floating">
      <select bind:value={prioValue} class="form-select" id="floatingSelect">
        {#each prioValues as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
      <label for="floatingSelect">Välj prio</label>
    </div>
  </div>
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      id="floatingInput"
      bind:value={assignedPersonText}
      on:keypress={onKeyPress}
      placeholder="Sven Svensson"
    />
    <label for="floatingInput">Ansvarig person</label>
  </div>
</div>

<style>
  .input-group {
    margin-bottom: 10px;
  }

  .arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: transform 0.25s ease-out;
  }
  .righter {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .extra-form {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s ease-out;
    overflow: hidden;
  }
  .extra-form.show {
    max-height: 1000px;
    transition: max-height 0.5s ease-in;
  }
  .input-group-text {
    cursor: pointer;
  }
</style>
