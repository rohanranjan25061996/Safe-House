import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateSafe } from '../components/pages/CreateSafe.jsx';
import { Home } from '../components/pages/Home';
import { SendTransaction } from '../components/pages/SendTransaction';
import { ConfirmTransaction } from '../components/pages/ConfirmTransaction';

const AllRoutes = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-safe" element={<CreateSafe />} />
                <Route exact path="/send-transaction" element={<SendTransaction />} />
                <Route exact path="/confirm-transaction" element={<ConfirmTransaction />} />
                <Route path="*" element={<h1>Page Not found</h1>} />
            </Routes>
        </div>
    )
}

export { AllRoutes }