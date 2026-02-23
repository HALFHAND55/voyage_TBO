// src/routes/PublicRoutes.tsx
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import RootGate from "./RootGate";
//import Landing from "../pages/Landing";
import Auth from "../components/Auth";
import CategoryRoleSelection from "../pages/CategoryRoleSelection";
import HostEventForm from "../pages/HostEventForm";
import HostQuestionnaire from "../pages/HostQuestionnaire";
import HostCustomize from "../pages/HostCustomize";
import HostMarketplace from "../pages/HostMarketplace";
import TokenPayment from "../pages/TokenPayment";
import GuestCodeEntry from "../pages/GuestCodeEntry";

const PublicRoutes = () => (
  <Route path="/" element={<MainLayout />}>
    <Route index element={<RootGate />} />

    <Route path="login" element={<Auth initialMode="login" />} />
    <Route path="signup" element={<Auth initialMode="signup" />} />
    <Route path="forgot-password" element={<Auth initialMode="forgot-password" />} />

    <Route path="category/:category" element={<CategoryRoleSelection />} />

    <Route path="host/create-event" element={<HostEventForm />} />
    <Route path="host/questionnaire/:category" element={<HostQuestionnaire />} />
    <Route path="host/customize" element={<HostCustomize />} />
    <Route path="host/marketplace/:category" element={<HostMarketplace />} />
    <Route path="payment/:packageId" element={<TokenPayment />} />

    <Route path="guest" element={<GuestCodeEntry />} />
  </Route>
);

export default PublicRoutes;