import React, { useState } from 'react'

import GenerateUrl from './GenerateUrl'

const Testing = () => {

  const [img , setImg] = useState();

  const handler = async (e) =>{
    e.preventDefault();
    const url = await GenerateUrl(img);
    localStorage.setItem("myurl", url);
    document.getElementById("output").innerHTML = url;
  }


  return (
    <div>
      <h1>ram </h1>
      <form onSubmit={handler}>
    <input type="file" onChange={(e)=>setImg(e.target.files[0])}/>
    <button type="submit">get the url</button>
      </form>
      <p id="output"></p>
    </div>
  )
}

export default Testing
