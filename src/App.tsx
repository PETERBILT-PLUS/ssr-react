import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./src/Layout/Layout.tsx";
import Home from "./src/Components/Home/Home.tsx";
import RegisterAgent from "./src/Components/Register/RegisterAgent/RegisterAgent.tsx";
import "./App.css";
import Payment from './src/Components/PaymentPage/Payment.tsx';
import LoginAgent from './src/Components/Login/LoginAgent/LoginAgent.tsx';
import AgenceDashboadLayout from './src/Components/AgenceDashboadLayout/AgenceDashboadLayout.tsx';
import AdminDashboard from './src/Components/AgentDashboard/AdminDashboard.tsx';
import AgenceAdminProfile from './src/Components/AgenceAdminProfile/AgenceAdminProfile.tsx';
import AgenceAdminVehicules from './src/Components/AgenceAdminVehicules/AgenceAdminVehicules.tsx';
import CheckState from './src/Components/checkState/CheckState.tsx';
import CreateListing from './src/Components/CreateListing/CreateListing.tsx';
import EditVehicule from './src/Components/EditVehicule/EditVehicule.tsx';
import SingleCar from './src/Components/SingleCar/SingleCar.tsx';
import Register from './src/Components/Register/Register/Register.tsx';
import Login from './src/Components/Login/UserLogin/Login.tsx';
import UserReservations from './src/Components/UserReservations/UserReservations.tsx';
import UserProfile from './src/Components/UserProfile/UserProfile.tsx';
import PaymentConfirm from "./src/Components/Payment/Payment.tsx";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CheckAgent from './src/Components/CheckAgent/CheckAgent.tsx';
import CheckUser from './src/Components/CheckUser/CheckUser.tsx';
import AgencyNotifications from './src/Components/AgencyNotifications/AgencyNotifications.tsx';
import AgencyReservations from './src/Components/AgencyReservations/AgencyReservations.tsx';
import Apropos from './src/Components/Apropos/Apropos.tsx';
import PolitiqueConfidentialite from './src/Components/PolitiqueConfidentialite/PolitiqueConfidentialite.tsx';
import ConditionsGenerales from './src/Components/ConditionsGenerales/ConditionsGenerales.tsx';
import SuperAdminLayout from './src/Layout/SuperAdminLayout/SuperAdminLayout.tsx';
import SuperAdminUsers from './src/Components/SuperAdminUsers/SuperAdminUsers.tsx';
import SuperAdminUserReservations from './src/Components/SuperAdminUserReservations/SuperAdminUserReservations.tsx';
import SuperAdminAgencys from './src/Components/SuperAdminAgencys/SuperAdminAgencys.tsx';
import SuperAdminDashboard from './src/Components/SuperAdminDashboard/SuperAdminDashboard.tsx';
import SuperAdminReservations from './src/Components/SuperAdminReservations/SuperAdminReservations.tsx';
import AnalyticsDashboard from "./src/Components/SuperAdminAnalytics/SuperAdminAnalytics.tsx";
import Page404 from './src/Components/Page404/Page404.tsx';

function App() {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(true);
  }, []);

  const initialOptions = {
    clientId: "AUhXr6owudUIJNmKjtEUvncWpcbnscL5Xrw1oj0ex8PUavA1sQcIc7QES-SJmX0eQkCtCrTvffptTk1I",
    currency: "USD",
    intent: "capture",
  };

  if (!state) {
    return null;
  }

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <Routes>
          <Route element={<CheckState />}>
            <Route path="*" element={<Page404 />} />

            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<SuperAdminDashboard />} />
              <Route path="utilisateurs" element={<SuperAdminUsers />} />
              <Route path="get-user-reservations/:id" element={<SuperAdminUserReservations />} />
              <Route path="agences" element={<SuperAdminAgencys />} />
              <Route path="reservations" element={<SuperAdminReservations />} />
              <Route path="analytics" element={<AnalyticsDashboard />}></Route>
            </Route>

            {/* Agency Admin Routes */}
            <Route path="/agence-dashboard" element={<AgenceDashboadLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="profile" element={<AgenceAdminProfile />} />
              <Route path="vehicules" element={<AgenceAdminVehicules />} />
              <Route path="create-listing" element={<CreateListing />} />
              <Route path="edit-vehicule/:id" element={<EditVehicule />} />
              <Route path="notifications" element={<AgencyNotifications />} />
              <Route path="reservations" element={<AgencyReservations />} />
            </Route>

            {/* User Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register-agent" element={<RegisterAgent />} />
              <Route path="login-agent" element={<LoginAgent />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="a-propos" element={<Apropos />} />
              <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="conditions-generales" element={<ConditionsGenerales />} />

              {/* Protected User Routes */}
              <Route element={<CheckUser />}>
                <Route path="mes-reservations" element={<UserReservations />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="cars/:id" element={<SingleCar />} />
              </Route>

              {/* Protected Agent Routes */}
              <Route element={<CheckAgent />}>
                <Route path="payment" element={<Payment />} />
                <Route path="confirm-payment" element={<PaymentConfirm />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </PayPalScriptProvider>
    </>
  );
}

export default App;