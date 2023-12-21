"use client"
import { fetchDetails } from '@/actions/scraper.action'
import React, { useState } from 'react'

type ResponseType = {
  title?: string, 
  firstParagraph?: string,
  tableData:string[][]
}

function page() {
  const [data, setData] = useState<ResponseType>()
  async function getData(e:FormData) {
    const link = e.get("link")?.toString();
    console.log(link)
    let response = await fetchDetails(link || "");
    setData(response)
  }
  const periodRegex = /\./g;
  function addBrTag(match: string) {
    return match + "<br>";
  }
  return (
    <main>
      <form action={getData}>
        <input type="text" name="link" placeholder='Enter Link' />
      </form>
      <h1 className='text-center'> Web Scraper</h1>
      {data && <div>
      <h1>Title</h1>
      <pre>
        {data.title}
      </pre>
      <h1>First Paragraph</h1>
      <div dangerouslySetInnerHTML={{ __html: data.firstParagraph && data.firstParagraph.replace(periodRegex, addBrTag) || ""}} />
      <h1>Table</h1>
      { data.tableData.map((e: any, i: number) => (
        <div className='grid grid-cols-2' key={i}>
        {e.map((x: any, y: number) => (
            <p key={y}> {x} </p>
        ))}
          </div>
      ))}
      </div>}
    </main>
  )
}

export default page