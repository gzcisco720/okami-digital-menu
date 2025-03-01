import { useState } from "react";
import { IMenuItem } from "../../../interfaces/menu.interface";
import Papa from "papaparse";
import { isMenuItemList } from "../../../utils/menuItem.utils";

export const useUploadFile = () => {
  const [ uploadItems, setUploadItems] = useState<IMenuItem[]>([]);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert('Invalid file or branch');
      return;
    }
    if (file.type === 'text/csv') {
      Papa.parse(file, {
        header: true,
        complete: async (result) => {
          const items = result.data;
          if (isMenuItemList(items)) {
            setUploadItems(items);
          } else {
            alert('Invalid JSON format. Please make sure the JSON file is an array of menu items.');
          }
        },
        error: (error) => {
          alert(error.message);
        }
      })
    } else if (file.type === 'application/json') {
      let items = JSON.parse(await file.text());
      if (items === null && !Array.isArray(items) && typeof items !== 'object') {
        alert('Invalid File content.');
        return;
      }
      if (typeof items === 'object') {
        items = Object.keys(items).map((key) => {
          return items[key];
        });
      }
      if (isMenuItemList(items)) {
        setUploadItems(items);
      } else {
        alert('Invalid JSON format. Please make sure the JSON file is an array of menu items.');
      }
    } else {
      alert('Invalid file type. Please upload a CSV or JSON file.');
    }
  }

  return { onFileChange, uploadItems };
}