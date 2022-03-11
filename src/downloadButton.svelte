<script>
  export let data;
  export let fileName = 'defaultName';

  const downloadJson = () => {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', fileName + '.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
</script>

<button type="button" class="btn btn-outline-primary" on:click={downloadJson}
  >Export</button
>
