# Merge JSON files 

This action merges two json array of objects living in two separate files.
If a collision occurs between two json objects, the priority is given to the object of `file_2_path`.

See [action.yml](./action.yml) for the list of `inputs` and `outputs`.

## Example usage

```yaml
build-secrets:
  name: Build secrets file
  runs-on: ubuntu-latest

  steps:
    - name: Checkout
      uses: actions/checkout@v2
      with:
        fetch-depth: 0

    - name: Merge secrets 
      uses: agendrix/merge-json-files-action@v1.0.3
      with:
        key: "id"
        file_1_path: "./secrets/shared.json"
        file_2_path: "./secrets/staging.json"
```
