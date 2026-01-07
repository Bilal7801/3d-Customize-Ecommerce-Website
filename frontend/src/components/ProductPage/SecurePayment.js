import React from "react";

const SecurePayment = () => {
    return (
        <div className="bg-gray-100 p-4 rounded !mt-12">
            <h3 className="text-lg font-bold text-left pl-8 pt-9"> Safe & Secure</h3>
            <p className="text-gray-600 text-left mt-3">
                <div className="flex item-center pl-8 space-x-3 mt-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg" alt="Visa" className="w-10" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-12" />
                </div>
                <div className="pl-8 mt-3 pr-10 text-sm font-medium">
                    We ensure secure processing of your payment information and do not retain access to your credit card details.
                </div>
                <div className="text-sm text-gray-800 font-bold pl-8 mt-8">
                    Buy now pay later with Shop Pay
                </div>
            </p>
            <div className="text-left">
                <button className="mt-4 ml-8 mb-10 bg-purple-600 text-white px-3 py-1 rounded transition-all duration-200 ease-in-out hover:bg-purple-500 cursor-pointer">
                    Shop Pay
                </button>
            </div>

        </div >
    );
};

export default SecurePayment;