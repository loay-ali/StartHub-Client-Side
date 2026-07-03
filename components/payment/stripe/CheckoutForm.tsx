import {PaymentElement} from '@stripe/react-stripe-js/checkout';

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement options = {{
        fields: {
            card: {
                billingDetails: {
                    name: "always"
                }
            }
        }
      }}/>
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;