import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const publicKey = 'PK_6AABAC98F020DD61E8EB20250415125102';

// toast.configure();

const api = axios.create({
    baseURL: 'https://api.gateway.zestpayment.com/vas/api/v1',
    headers: {
    Authorization: `Bearer ${publicKey}`
    }
});


const VASpage = () => {
    const handleGetMyBillers = async () => {
        try {
        const response = await api.get('/biller/merchants/getMyBillers?pageNumber=0&pageSize=50');
        console.log("My billers:", response.data);
        toast.success('Successfully fetched billers');
        } catch (error) {
        console.error('Error fetching billers:', error);
        toast.error('Error fetching billers');
        }
    };
    
    const validateInternetSubscription = async () => {
        try {
            const payload = {
                "customerId": "07062174036",
                "requestId": 12300
            };
        const response = await api.post(`biller/validate/vtu`, payload);
        console.log('Validation response:', response.data);
        toast.success('Successfully validated vtu subscription');
        handlePayment();
        } catch (error) {
        console.error('Error validating vtu subscription:', error);
        toast.error('Error validating vtu subscription');
        }
    };

    const handlePayment = async () => {
        try {
            const payload = {
                billerId: 'MTN-AIRTIME',
                customerId: '07062174036',
                requestId: '412131',
                // customerName: 'Sabelo Dlangamandla SABZA',
                // customerAddress: 'isolo',
                amount: '100'
            }
        const response = await api.post(`biller/payment/vtu`, payload);
        console.log('Payment response', response.data);
        toast.success('Successfully made vtu payment');
        } catch (error) {
            console.error('Error making vtu payment:', error);
            if (error.response && error.response.data && error.response.data.message === "insufficient wallet balance") {
                toast.error('Insufficient wallet balance');
            } else {
                toast.error('Error making vtu payment');
            }
        }
    };
    
return (
    <div className='vas-box'>
    <h2>VAS Platform Testing</h2>
    <button className="green-button">
    <Link style={{textDecoration: "none", color: "black"}} to="/">Back to Homepage</Link>
    </button>
    <div className='vasbtns'>
    <button className='vasbtn' style={{marginRight:"10px"}} onClick={handleGetMyBillers}>Get My Billers</button>
    <button className='vasbtn' onClick={validateInternetSubscription}>Make Payment</button>
    </div>
    </div>
);
};

export default VASpage;
