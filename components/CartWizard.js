import React from "react";

function CartWizard({ activeStep = 1 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["userLogin", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-inidigo-500 text-indigo-500"
                : "border-grey-400 text-grey-400"
            }`}
          >
            <span className="bg-slate-200 rounded-full py-1 px-2">
              {index + 1}
            </span>
            &nbsp;
            {step}
          </div>
        )
      )}
    </div>
  );
}

export default CartWizard;
