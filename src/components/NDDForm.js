import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NDDForm = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // First, create the customer profile
        fetch('https://api.gateway.zestpayment.com/payment-engine/api/v1/web-engine/process/customer-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Api-Public-Key': 'PK_ABLKBJNOHKZ-1368654ICA8MNVM4PLHT14' 
                'API-Public-Key': 'PK_6AABAC98F020DD61E8EB20250415125102'
            },
            body: JSON.stringify({
                nddRequestType: "CREATE_CUSTOMER",
                firstName: "Temitope",
                lastName: "Ogungbesan",
                email: "temitope.ogungbesan.5@gmail.com",
                address: "Block Z4, Flat 4",
                phoneNumber: "08066707755",
                bvn: "0093674924"
            })
        })
        .then(response => response.json())
        .then(data => {
            const customerCode = data.data.customerCode;
            toast.success('Profile created successfully');

            // Then, create the mandate
            fetch('https://api.gateway.zestpayment.com/payment-engine/api/v1/web-engine/process/ndd-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Public-Key': 'PK_6AABAC98F020DD61E8EB20250415125102'
                },
                body: JSON.stringify({
                    nddRequestType: "CREATE_MANDATE",
                    accountNumber: accountNumber,
                    bankCode: "998",
                    customerCode: customerCode,
                    accountName: accountName,
                    payeeName: "OG INC NIBSS",
                    narration: "Direct Debit",
                    payeeAddress: "1230 Ahmadu bello",
                    amount: amount,
                    subscriberCode: "Merchant 2",
                    startDate: "20240412",
                    endDate: "20240412"
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    toast.success('Mandate created successfully');
                    console.log(data);
                } else {
                    // Display error toast message for mandate creation if there's an error message
                    toast.error(data.message || 'Error creating mandate');
                }
            })
        })
    };

    return (
        <div className='ndd-box'>
            <button className="green-button" style={{ marginTop: "40px" }}>
                <Link style={{ textDecoration: "none", color: "black", marginTop: "40px" }} to="/">Back to Homepage</Link>
            </button>
            <form className='form-box' onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label htmlFor="accountnumber">Account Number</label>
                    <div><input className='inputbox' type="text" id="acctnumber" name="acctnumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} /></div>
                </div>
                <div className='form-field'>
                    <label htmlFor="accountname">Account Name</label>
                    <div><input className='inputbox' type="text" id="acctname" name="acctname" value={accountName} onChange={(e) => setAccountName(e.target.value)} /></div>
                </div>
                <div className='form-field'>
                    <label htmlFor="amt">Amount</label>
                    <div><input className='inputbox' type="number" id="amt" name="amt" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
                </div>
                <button className='submitbtn' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NDDForm;
