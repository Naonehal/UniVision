import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

// Root layout component
const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Header component */}
      <Header />
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default RootLayout;
