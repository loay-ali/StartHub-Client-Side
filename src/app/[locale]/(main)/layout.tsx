import Header from "@/components/layout/ClientHeader";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/MouseGlow/MouseGlow";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MouseGlow/>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
