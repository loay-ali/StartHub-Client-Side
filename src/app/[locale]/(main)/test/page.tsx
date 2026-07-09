import PaymentSection from "@/components/payment/Payment";

export default function TestPage() {
  return (
    <div className = 'mt-[250px]'>
      <PaymentSection 
        price = {500} 
        payment = "service"
        redirect = {() => {}}
        paymentIntent = ""
        clientSecret = ""
        additional = ""
      />
    </div>
  );
}
