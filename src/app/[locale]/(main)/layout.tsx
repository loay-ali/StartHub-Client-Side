import Header from "@/components/layout/ClientHeader";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <section className = 'pt-20'>
        {children}
      </section>
      <Footer />
    </>
  );
}
