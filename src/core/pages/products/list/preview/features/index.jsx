import React, { useState, useEffect } from 'react';
import GeneralPlaceholer from '../../../../../components/GeneralPlaceholer';
import GeneralPrice from '../generalPrice';
import { Box, Grid, Paper } from '@mui/material';
import Dropdown from '../generalFeatures/Dropdown';

function PricingOptions({
  data,
  featuresState,
  setFeaturesState,
}) {
  const [selectedTable, setSelectedTable] = useState(data[0]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [nextOptions, setNextOptions] = useState({});

  useEffect(() => {
    const initialSelectedOptions = {};
    const initialNextOptions = {};

    data[0].columns.forEach((columnName) => {
      const uniqueOptions = new Set();
      const photoMap = {};

      data.forEach((table) => {
        table.rows.forEach((row) => {
          if (table.columns.includes(columnName)) {
            row.cellData[table.columns.indexOf(columnName)].forEach((option) => {
              const { value, photo, is_popular } = option;

              if (!uniqueOptions.has(value)) {
                uniqueOptions.add(value);
                photoMap[value] = { photo: photo || '', is_popular: is_popular || false };
              }
            });
          }
        });
      });

      initialSelectedOptions[columnName] = '';
      initialNextOptions[columnName] = Array.from(uniqueOptions).map((value) => ({
        value,
        photo: photoMap[value].photo,
        is_popular: photoMap[value].is_popular,
      }));
    });

    setSelectedOptions(initialSelectedOptions);
    setNextOptions(initialNextOptions);
  }, [data]);

  const handleTableChange = (value, columnName) => {
    const selectedTableName = value;
    const selectedTableData = data.find((table) => table.tableName === selectedTableName);
    setSelectedTable(selectedTableData);

    const initialSelectedOptions = {
      [data[0].columns[0]]: { value: selectedTableName, photo: '', is_popular: false },
    };
    setSelectedOptions(initialSelectedOptions);

    const nextColumnName = selectedTableData.columns[1];
    const nextColumnOptions = new Set();

    selectedTableData.rows.forEach((row) => {
      row.cellData[1].forEach((option) => {
        const optionToAdd = {
          value: option.value || '',
          photo: option.photo || '',
          is_popular: option.is_popular || false,
        };

        if (![...nextColumnOptions].some((existingOption) => existingOption.value === optionToAdd.value)) {
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
        photo: value.photo || '',
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

    setFeaturesState((prevFeaturesState) => ({
      ...prevFeaturesState,
      [columnName]: value,
    }));

    const columnIndex = selectedTable.columns.indexOf(columnName);

    if (columnIndex < selectedTable.columns.length - 1) {
      const nextColumnName = selectedTable.columns[columnIndex + 1];
      const nextColumnOptions = new Set();

      selectedTable.rows
        .filter((row) =>
          selectedTable.columns
            .slice(0, columnIndex)
            .every((prevColumnName) =>
              row.cellData[selectedTable.columns.indexOf(prevColumnName)].some(
                (option) => selectedOptions[prevColumnName]?.value === option.value
              )
            ) &&
          row.cellData[columnIndex].some((option) => option.value === value)
        )
        .forEach((row) => {
          row.cellData[columnIndex + 1].forEach((option) => {
            const optionToAdd = {
              value: option.value || '',
              photo: option.photo || '',
              is_popular: option.is_popular || false,
            };

            if (![...nextColumnOptions].some((existingOption) => existingOption.value === optionToAdd.value)) {
              nextColumnOptions.add(optionToAdd);
            }
          });
        });

      setNextOptions((prevNextOptions) => ({
        ...prevNextOptions,
        [nextColumnName]: Array.from(nextColumnOptions).map((value) => ({
          ...value,
          photo: value.photo || '',
          is_popular: value.is_popular || false,
        })),
      }));

      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [nextColumnName]: {
          value: '',
          photo: '',
          is_popular: false,
        },
      }));
    }
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (selectedTable && selectedTable.columns && selectedOptions) {
        if (selectedTable.columns.every((columnName) => selectedOptions[columnName]?.value)) {
          const matchingRow = selectedTable.rows.find((row) =>
            selectedTable.columns.every((columnName) => {
              const selectedValue = selectedOptions[columnName]?.value;
              const cellDataForColumn = row.cellData[selectedTable.columns.indexOf(columnName)];
              return (
                cellDataForColumn &&
                cellDataForColumn.some((option) => option && option.value === selectedValue)
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
  }, [selectedOptions, selectedTable]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          position: 'relative',
        }}
      >
        <GeneralPlaceholer className="optionHeading" text="1. Choose your options" />
        <div className="px-[20px] py-[20px]">
          <Grid className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            {selectedTable.columns.map((columnName, colIdx) => (
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
            ))}
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
            position: 'relative',
          }}
        >
          <GeneralPlaceholer className="quantityHeading" text="2. Choose Quantity & Delivery Speed" />
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
