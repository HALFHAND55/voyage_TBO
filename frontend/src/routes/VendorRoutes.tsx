import { Route, Navigate } from "react-router-dom";
import VendorLayout from "../layouts/VendorLayout";
import VendorAuthPage from "../pages/vendor/VendorAuthPage";

import VendorOverview from "../pages/vendor/VendorOverview";
import VendorAnalytics from "../pages/vendor/VendorAnalytics";
import EventArchivePage from "../pages/vendor/archive/EventArchivePage";
import ArchiveDetailsPage from "../pages/vendor/archive/ArchiveDetailsPage";
import ActiveEventsPage from "../pages/vendor/active-events/ActiveEventsPage";
import ActiveEventDetailsPage from "../pages/vendor/active-events/ActiveEventDetailsPage";
import PaymentsPage from "../pages/vendor/payments/PaymentsPage";
import PaymentDetailsPage from "../pages/vendor/payments/PaymentDetailsPage";
import EventDetailsPage from "../pages/vendor/EventDetailsPage";

import InventoryLayout from "../pages/vendor/inventory/InventoryLayout";
import InventoryTable from "../pages/vendor/inventory/InventoryTable";
import InventoryCalendar from "../pages/vendor/inventory/InventoryCalendar";
import InventoryHeatmap from "../pages/vendor/inventory/InventoryHeatmap";
import InventoryAllocations from "../pages/vendor/inventory/InventoryAllocations";

import SettingsLayout from "../pages/vendor/settings/SettingsLayout";
import ProfileSettings from "../pages/vendor/settings/ProfileSettings";
import SecuritySettings from "../pages/vendor/settings/SecuritySettings";
import NotificationSettings from "../pages/vendor/settings/NotificationSettings";
import PreferencesSettings from "../pages/vendor/settings/PreferencesSettings";
import DangerZone from "../pages/vendor/settings/DangerZone";

const VendorRoutes = () => (
  <>
    {/* ───── PUBLIC VENDOR AUTH ───── */}
    <Route path="/vendor" element={<VendorAuthPage />} />
    <Route path="/vendor/login" element={<VendorAuthPage initialMode="login" />} />
    <Route path="/vendor/signup" element={<VendorAuthPage initialMode="signup" />} />

    {/* ───── PROTECTED VENDOR DASHBOARD ───── */}
    <Route path="/vendor" element={<VendorLayout />}>
      <Route path="overview" element={<VendorOverview />} />
      <Route path="analytics" element={<VendorAnalytics />} />
      <Route path="archive" element={<EventArchivePage />} />
      <Route path="archive/:eventId" element={<ArchiveDetailsPage />} />
      <Route path="active-events" element={<ActiveEventsPage />} />
      <Route path="active-events/:eventId" element={<ActiveEventDetailsPage />} />
      <Route path="payments" element={<PaymentsPage />} />
      <Route path="payments/:eventId" element={<PaymentDetailsPage />} />
      <Route path="events/:eventId" element={<EventDetailsPage />} />

      <Route path="inventory" element={<InventoryLayout />}>
        <Route index element={<InventoryTable />} />
        <Route path="calendar" element={<InventoryCalendar />} />
        <Route path="heatmap" element={<InventoryHeatmap />} />
        <Route path="allocations" element={<InventoryAllocations />} />
      </Route>

      <Route path="settings" element={<SettingsLayout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="notifications" element={<NotificationSettings />} />
        <Route path="preferences" element={<PreferencesSettings />} />
        <Route path="danger" element={<DangerZone />} />
      </Route>
    </Route>
  </>
);

export default VendorRoutes;