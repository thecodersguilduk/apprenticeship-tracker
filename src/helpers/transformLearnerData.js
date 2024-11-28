import { format } from "date-fns";

export function replaceSpecialCharacters(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]+/g, '') // Remove all special characters except spaces
    .replace(/[\s/]+/g, '_')            // Replace spaces with underscores
    .toLowerCase();                  // Optionally convert to lowercase for consistency
}

export function transformLearnerData(item) {
  console.log(item);
  return {
    
      id: item.id,
      name: item.name,
      ...(Array.isArray(item.column_values)
          ? item.column_values.reduce((acc, column) => {
                if (column && column.column && column.column.title) {
                    const title = replaceSpecialCharacters(column.column.title.toLowerCase());
                    let value = "";

                    // Check if it has values (like labels) or dates
                    if (column.values && column.values.length > 0) {
                        value = column.values[0].label; // Use the first label
                    } else if (column.date) {
                        value = format(column.date, "MMMM dd, yyyy"); // Format the date
                    } else if (column.text) {
                        value = column.text;
                    } else if (column.number !== null || column.number !== undefined) {
                        value = column.number + column.symbol; // Add the symbol if it exists
                    }

                    acc[title] = value; // Add the title as key, value as value
                }
                return acc;
            }, {})
          : {}), // If column_values is undefined or not an array, use an empty object

      // Add processing specifically for 'Training Plan Connection'
      training_plan: extractTrainingPlan(item),
  };
}

export function extractTrainingPlan(item) {
  const trainingPlanColumn = item.column_values.find(
      column => column.column && column.column.title === "Training Plan Connection"
  );

  if (!trainingPlanColumn || !Array.isArray(trainingPlanColumn.linked_items)) {
      return []; // Return an empty array if no linked items found
  }

  return trainingPlanColumn.linked_items.map(linkedItem => {
      const transformedColumns = linkedItem.column_values.reduce((acc, col) => {
          acc[mapColumnNames(col.id)] = col.text || ""; // Map column ID to a readable name and use its text value
          return acc;
      }, {});

      return {
          id: linkedItem.id,
          session_name: linkedItem.name, // Use the name directly as session name
          ...transformedColumns, // Include all mapped columns
      };
  });
}

function mapColumnNames(columnId) {
  const columnMappings = {
      date__1: "date",
      status8: "type",
      dropdown__1: "trainer",
      duration: "duration",
      status__1: "status",
      long_text__1: "notes",
      // Add more mappings as needed
  };

  return columnMappings[columnId] || columnId; // Default to the raw column ID if no mapping exists
}



