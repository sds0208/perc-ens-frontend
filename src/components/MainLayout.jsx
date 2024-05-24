import { useState } from "react";
import Nav from "./Nav"
import List from "./List"


const MainLayout = () => {
  const [sortMethod, setSortMethod] = useState(['title']);
  return (
    <>
        <Nav />
        <List sortMethod={sortMethod}/>
    </>
  )
}

export default MainLayout