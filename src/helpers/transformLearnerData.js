import { format } from "date-fns";

export function replaceSpecialCharacters(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]+/g, '') // Remove all special characters except spaces
    .replace(/[\s/]+/g, '_')            // Replace spaces with underscores
    .toLowerCase();                  // Optionally convert to lowercase for consistency
}

export function transformLearnerData(item) {
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
                    } else if(column.url){
                        value = column.url;
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
      ksb_matrix: extractKsbMatrix(item),
  };
}
export function extractKsbMatrix(item) {  
    const linkedItems = item.column_values?.find(
      (col) => col.column?.title === "KSB Matrix"
    )?.linked_items || [];
  
    const transformedMatrix = linkedItems.map((value) => {
      const transformedColumns = value.column_values.reduce((acc, col) => {
        acc[mapKsbMatrixColumnNames(col.id)] = col.text || "";
        return acc;
      }, {});

  
      return { id: value.name, ...transformedColumns };
    });
  
  
    return transformedMatrix;
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
          ...transformedColumns, 
      };
  });
}

function mapKsbMatrixColumnNames(columnId) {
  const columnMappings = {
      text__1: "description",
      status7__1: "status",
      numbers__1: "score",
      
      // Add more mappings as needed
  };

  return columnMappings[columnId] || columnId; // Default to the raw column ID if no mapping exists

}

function mapColumnNames(columnId) {
  const columnMappings = {
      date4: "date",
      dropdown50__1: "type",
      dropdown5__1: "trainer",
      numbers_Mjj6ySaM: "duration",
      status__1: "status",
      long_text__1: "notes",
      // Add more mappings as needed
  };

  return columnMappings[columnId] || columnId; // Default to the raw column ID if no mapping exists
}



