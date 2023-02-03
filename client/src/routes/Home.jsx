import React from 'react';
import Header from "../components/Header";
import AddUniversity from "../components/AddUniversity";
import ShowForm from "../components/Forms";
import UniversityList from "../components/UniversityList";
const Home = () => {
  return (
    <div>
        <Header /> 
        <ShowForm />
        <UniversityList />
    </div>
  )
}

export default Home