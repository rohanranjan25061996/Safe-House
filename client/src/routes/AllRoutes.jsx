import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateSafe } from '../components/pages/CreateSafe.jsx';
import { Home } from '../components/pages/Home';
import { Transaction } from '../components/pages/Transaction';
import NavBar from "./NavBar";

// import { CreateContract } from './CreateContract';
// import { ContractList } from './ContractList';
// import { Header } from "../Component/Header";

const AllRoutes = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            {/* <Header /> */}
            {/* <NavBar /> */}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-safe" element={<CreateSafe />} />
                <Route exact path="/transaction" element={<Transaction />} />
                <Route path="*" element={<h1>Page Not found</h1>} />
            </Routes>
        </div>
    )
}

export { AllRoutes }