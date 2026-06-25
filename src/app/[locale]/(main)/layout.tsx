import Header from "@/components/layout/ClientHeader";
import MouseGlow from "@/components/MouseGlow/MouseGlow";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MouseGlow/>
      <Header />
      <section className = 'pt-20'>
        {children}
      </section>
    </>
  );
}
