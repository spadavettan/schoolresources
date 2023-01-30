import React from 'react';
import Header from "../components/Header";
import AddUniversity from "../components/AddUniversity";
import UniversityList from "../components/UniversityList";
const Home = () => {
  return (
    <div>
        <Header /> 
        <AddUniversity />
        <UniversityList />
    </div>
  )
}

export default Home