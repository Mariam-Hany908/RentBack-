/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SupportModal } from './components/SupportModal';
import { BookingFlowModal } from './views/BookingFlowModal';
import { HomeView } from './views/HomeView';
import { CategoriesView } from './views/CategoriesView';
import { CategoryListingView } from './views/CategoryListingView';
import { ProductDetailsView } from './views/ProductDetailsView';
import { OwnerWizardView } from './views/OwnerWizardView';
import { RentalTrackingView } from './views/RentalTrackingView';
import { RenterDashboardView } from './views/RenterDashboardView';
import { OwnerDashboardView } from './views/OwnerDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { DisputeSystemView } from './views/DisputeSystemView';
import { IdentityVerificationView } from './views/IdentityVerificationView';
import { AnimatePresence, motion } from 'motion/react';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'categories':
        return <CategoriesView />;
      case 'category_listing':
        return <CategoryListingView />;
      case 'product_details':
        return <ProductDetailsView />;
      case 'owner_wizard':
        return <OwnerWizardView />;
      case 'rental_tracking':
        return <RentalTrackingView />;
      case 'renter_dashboard':
        return <RenterDashboardView />;
      case 'owner_dashboard':
        return <OwnerDashboardView />;
      case 'admin_dashboard':
        return <AdminDashboardView />;
      case 'disputes':
        return <DisputeSystemView />;
      case 'identity_verification':
        return <IdentityVerificationView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BookingFlowModal />
      <SupportModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

