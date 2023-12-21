"use server"
import { JSDOM } from 'jsdom';
import axios from 'axios';

export const fetchDetails = async (link:string) => {
  try {
    const response = await axios.get(link);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const title = document.querySelector('.s-title.fw-headline')?.textContent;
    const firstParagraph = document.querySelector('.entry-content.rbct.clearfix.is-highlight-shares')?.textContent;

    let table: any = document.querySelector('.wp-block-table > table');
    let tableData: string[][] = [];

    // Iterate through each row in the table
    for (let i = 0; i < table.rows.length; i++) {
      let rowCells: string[] = [];

      // Iterate through each cell in the row
      for (let j = 0; j < table.rows[i].cells.length; j++) {
        let cell = table.rows[i].cells[j];
        
        // Extract data from each cell
        let cellData = cell.textContent.trim();
        
        // Add cell data to the array
        rowCells.push(cellData);
      }

      // Add row cells to the tableData array
      tableData.push(rowCells);
    }
    
    return { title, firstParagraph, tableData };
  } catch (error: any) {
    return error.message;
  }
};
