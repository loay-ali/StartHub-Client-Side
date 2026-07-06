import Header from "@/components/layout/ClientHeader";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/MouseGlow/MouseGlow";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <MouseGlow/>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
