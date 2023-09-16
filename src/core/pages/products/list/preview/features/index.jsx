import React, { useState, useEffect } from "react";
import GeneralPlaceholer from "../../../../../components/GeneralPlaceholer";
import GeneralPrice from "../generalPrice";
import { Box, Grid, Paper } from "@mui/material";
import Dropdown from "../generalFeatures/Dropdown";

function PricingOptions({ data, featuresState, setFeaturesState }) {
  const [selectedTable, setSelectedTable] = useState(data[0]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [nextOptions, setNextOptions] = useState({});

  const [hiddenColumns, setHiddenColumns] = useState([]);
  console.log("selectedOptions", selectedOptions);

  useEffect(() => {
    const initialSelectedOptions = {};
    const initialNextOptions = {};

    data[0].columns.forEach((columnName, columnIndex) => {
      const uniqueOptions = new Set();
      const photoMap = {};

      data.forEach((table) => {
        table.rows.forEach((row) => {
          if (table.columns.includes(columnName)) {
            row.cellData[table.columns.indexOf(columnName)].forEach(
              (option) => {
                const { value, photo, is_popular } = option;

                if (!uniqueOptions.has(value)) {
                  uniqueOptions.add(value);
                  photoMap[value] = {
                    photo: photo || "",
                    is_popular: is_popular || false,
                  };
                }
              }
            );
          }
        });
      });

      initialSelectedOptions[columnName] = "";

      // Initialize nextOptions only for the first column
      if (columnIndex === 0) {
        initialNextOptions[columnName] = Array.from(uniqueOptions).map(
          (value) => ({
            value,
            photo: photoMap[value].photo,
            is_popular: photoMap[value].is_popular,
          })
        );
      } else {
        initialNextOptions[columnName] = [];
      }
    });

    setSelectedOptions(initialSelectedOptions);
    setNextOptions(initialNextOptions);
  }, [data]);

  // Use useEffect to remove hidden columns from featureState
  useEffect(() => {
    const updatedFeaturesState = { ...featuresState };

    hiddenColumns.forEach((hiddenColumnIndex) => {
      const hiddenColumnName = selectedTable.columns[hiddenColumnIndex];
      delete updatedFeaturesState[hiddenColumnName];
    });

    setFeaturesState(updatedFeaturesState);
    // eslint-disable-next-line
  }, [hiddenColumns, setFeaturesState, selectedTable.columns]);

  const handleTableChange = (value, columnName) => {
    const selectedTableName = value;
    const selectedTableData = data.find(
      (table) => table.tableName === selectedTableName
    );

    setSelectedTable(selectedTableData);

    const initialSelectedOptions = {
      [data[0].columns[0]]: {
        value: selectedTableName,
        photo: "",
        is_popular: false,
      },
    };
    setSelectedOptions(initialSelectedOptions);

    const nextColumnName = selectedTableData.columns[1];
    const nextColumnOptions = new Set();

    // Flag to track whether we've reached the current column
    let reachedCurrentColumn = false;

    selectedTableData.columns.forEach((col) => {
      if (reachedCurrentColumn) {
        // Set featureState and nextOptions to null for subsequent columns
        setFeaturesState((prevFeaturesState) => ({
          ...prevFeaturesState,
          [col]: null,
        }));
      }

      // Check if the current column matches the columnName
      if (col === columnName) {
        reachedCurrentColumn = true;
      }
    });

    // Flag to track whether we've reached the next column
    let reachedNextColumn = false;

    selectedTableData.columns.forEach((col) => {
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

    let isCurrentColumnEmpty = true;

    selectedTableData.rows.forEach((row) => {
      row.cellData[1].forEach((option) => {
        if (option.value !== "") {
          isCurrentColumnEmpty = false; // Set to false if a non-empty option is found
        }
      });
    });

    // Conditionally update hiddenColumns
    setHiddenColumns((prevHiddenColumns) => {
      // Filter out columnIndex + 1 if isCurrentColumnEmpty is false
      return isCurrentColumnEmpty
        ? [...prevHiddenColumns, 1]
        : prevHiddenColumns.filter((colIndex) => colIndex !== 1);
    });

    selectedTableData.rows.forEach((row) => {
      row.cellData[isCurrentColumnEmpty ? 2 : 1].forEach((option) => {
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

      setFeaturesState((prevFeaturesState) => ({
        ...prevFeaturesState,
        [columnName]: value,
      }));
    });

    setNextOptions((prevNextOptions) => ({
      ...prevNextOptions,
      [nextColumnName]: Array.from(nextColumnOptions).map((value) => ({
        ...value,
        photo: value.photo || "",
        is_popular: value.is_popular || false,
      })),
    }));
  };

  const handleChange = (value, columnName) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [columnName]: {
        ...prevSelectedOptions[columnName],
        value,
      },
    }));

    let reachedCurrentColumn = false;
    let reachedNextColumn = false;

    selectedTable.columns.forEach((col) => {
      if (reachedCurrentColumn) {
        // Set featureState to null for subsequent columns
        setFeaturesState((prevFeaturesState) => ({
          ...prevFeaturesState,
          [col]: null,
        }));
      }
    });

    setFeaturesState((prevFeaturesState) => ({
      ...prevFeaturesState,
      [columnName]: value,
    }));

    const columnIndex = selectedTable.columns.indexOf(columnName);
    let nextColumnIndexSecond = columnIndex + 1;
    let nextColumnName = selectedTable.columns[columnIndex + 1]
   
    if (columnIndex < selectedTable.columns.length - 1) {
      let nextColumnOptions = new Set();
     
     // First task
      for (
        let nextColumnIndex = columnIndex + 1;
        nextColumnIndex < selectedTable.columns.length;
        nextColumnIndex++
      ) {
        let isCurrentColumnEmpty = true;

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
              if (option.value !== "") {
                isCurrentColumnEmpty = false;
              }
            });
          });

        if (!isCurrentColumnEmpty) {
          // If the column is not empty, you can add the necessary logic here
          nextColumnIndexSecond = nextColumnIndex
          nextColumnName = selectedTable.columns[nextColumnIndexSecond];
          console.log("nextColumnIndex", nextColumnIndex);
          // Update hiddenColumns correctly using the state updater function
          setHiddenColumns((prevHiddenColumns) =>
            prevHiddenColumns.filter((colIndex) => colIndex !== nextColumnIndex)
          );
          break; // Exit the loop since you found a non-empty column
        } else {
          console.log("Skipped column index", nextColumnIndex); // Log the index of the skipped column
          // Update hiddenColumns correctly using the state updater function
          nextColumnName = selectedTable.columns[nextColumnIndex];
          setHiddenColumns((prevHiddenColumns) => [
            ...prevHiddenColumns,
            nextColumnIndex,
          ]);
        
        }

      }

      // Second task

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
            row.cellData[nextColumnIndexSecond].forEach((option) => {
              console.log("nextColumnIndexSecond", nextColumnIndexSecond);
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
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (selectedTable && selectedTable.columns && selectedOptions) {
        if (
          selectedTable.columns
            .filter(
              (hiddenColumn) =>
                !hiddenColumns.includes(
                  selectedTable.columns.indexOf(hiddenColumn)
                )
            )
            .every((columnName) => selectedOptions[columnName]?.value)
        ) {
          const matchingRow = selectedTable.rows.find((row) =>
            selectedTable.columns
              .filter(
                (hiddenColumn) =>
                  !hiddenColumns.includes(
                    selectedTable.columns.indexOf(hiddenColumn)
                  )
              )
              .every((columnName) => {
                const selectedValue = selectedOptions[columnName]?.value;
                const cellDataForColumn =
                  row.cellData[selectedTable.columns.indexOf(columnName)];
                return (
                  cellDataForColumn &&
                  cellDataForColumn.some(
                    (option) => option && option.value === selectedValue
                  )
                );
              })
          );

          if (matchingRow) {
            setSelectedPricing(matchingRow.pricing);
          }
        } else {
          setSelectedPricing(null);
        }
      }
    };

    calculatePrice();
  }, [selectedOptions, selectedTable, hiddenColumns]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <GeneralPlaceholer
          className="optionHeading"
          text="1. Choose your options"
        />
        <div className="px-[20px] py-[20px]">
          <Grid className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            {selectedTable?.columns.map((columnName, colIdx) => {
              if (hiddenColumns.includes(colIdx)) {
                return null; // Skip rendering the column
              }

              return (
                <React.Fragment key={colIdx}>
                  <Grid
                    id={`options-container-${colIdx}`}
                    className="w-full flex flex-col gap-3"
                  >
                    <h2 className="text-fuchsia-900 font-bold text-lg">
                      {columnName}
                    </h2>
                    <Dropdown
                      colIdx={colIdx}
                      handleChange={handleChange}
                      handleTableChange={handleTableChange}
                      nextOptions={nextOptions}
                      columnName={columnName}
                      featuresState={featuresState}
                      setFeaturesState={setFeaturesState}
                    />
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </div>
      </Paper>
      {selectedPricing && (
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            height: "auto",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <GeneralPlaceholer
            className="quantityHeading"
            text="2. Choose Quantity & Delivery Speed"
          />
          <div className="px-[20px] py-[20px]">
            <Grid container className="w-full">
              <GeneralPrice
                data={data}
                price={selectedPricing}
                setPrice={setSelectedPricing}
                featuresState={featuresState}
                setFeaturesState={setFeaturesState}
              />
            </Grid>
          </div>
        </Paper>
      )}
    </Box>
  );
}

export default PricingOptions;
