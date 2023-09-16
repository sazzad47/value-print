const columnIndex = selectedTable.columns.indexOf(columnName);
let nextColumnIndex = columnIndex + 1;
let nextColumnName = selectedTable.columns[nextColumnIndex];
let isEmptyColumn = true; // Flag to track if the current column is empty
const emptyColumns = []; // Store the indices of empty columns

if (columnIndex < selectedTable.columns.length - 1) {
  let nextColumnOptions = new Set();
  let foundNonEmptyColumn = false;

  while (
    !foundNonEmptyColumn &&
    nextColumnIndex < selectedTable.columns.length
  ) {
    // Filter rows and check for non-empty options in the next column
    isEmptyColumn = selectedTable.rows.every(
      (row) =>
        selectedTable.columns
          .slice(0, columnIndex)
          .filter(
            (prevColumnName) =>
              !hiddenColumns.includes(
                selectedTable.columns.indexOf(prevColumnName)
              )
          )
          .every((prevColumnName) =>
            row.cellData[selectedTable.columns.indexOf(prevColumnName)].some(
              (option) =>
                selectedOptions[prevColumnName]?.value === option.value
            )
          ) &&
        row.cellData[columnIndex].some((option) => option.value === value) &&
        row.cellData[nextColumnIndex].every((option) => option.value === "")
    );

    if (!isEmptyColumn) {
      // If the next column is not empty, add its options and exit the loop
      selectedTable.rows
        .filter(
          (row) =>
            selectedTable.columns
              .slice(0, columnIndex)
              .filter(
                (prevColumnName) =>
                  !hiddenColumns.includes(
                    selectedTable.columns.indexOf(prevColumnName)
                  )
              )
              .every((prevColumnName) =>
                row.cellData[
                  selectedTable.columns.indexOf(prevColumnName)
                ].some(
                  (option) =>
                    selectedOptions[prevColumnName]?.value === option.value
                )
              ) &&
            row.cellData[columnIndex].some((option) => option.value === value)
        )
        .forEach((row) => {
          row.cellData[nextColumnIndex].forEach((option) => {
            const optionToAdd = {
              value: option.value || "",
              photo: option.photo || "",
              is_popular: option.is_popular || false,
            };

            if (
              ![...nextColumnOptions].some(
                (existingOption) => existingOption.value === optionToAdd.value
              )
            ) {
              nextColumnOptions.add(optionToAdd);
            }
          });
        });

      foundNonEmptyColumn = true; // Set to true if non-empty options are found
    } else {
      // If the next column is empty, store its index
      emptyColumns.push(nextColumnIndex);
      nextColumnIndex++;
      nextColumnName = selectedTable.columns[nextColumnIndex];
    }
  }

  // Conditionally update hiddenColumns based on the empty columns
  setHiddenColumns((prevHiddenColumns) =>
    isEmptyColumn
      ? [...prevHiddenColumns, ...emptyColumns]
      : prevHiddenColumns.filter((colIndex) => !emptyColumns.includes(colIndex))
  );

  setNextOptions((prevNextOptions) => ({
    ...prevNextOptions,
    [nextColumnName]: Array.from(nextColumnOptions).map((value) => ({
      ...value,
      photo: value.photo || "",
      is_popular: value.is_popular || false,
    })),
  }));

  selectedTable.columns.forEach((col) => {
    if (reachedNextColumn) {
      setNextOptions((prevNextOptions) => ({
        ...prevNextOptions,
        [col]: [],
      }));
    }

    // Check if the current column matches the nextColumnName
    if (col === nextColumnName) {
      reachedNextColumn = true;
    }
  });

  setSelectedOptions((prevSelectedOptions) => ({
    ...prevSelectedOptions,
    [nextColumnName]: {
      value: "",
      photo: "",
      is_popular: false,
    },
  }));
}
