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
        toast.error(error.response.message);
        }
    };

    const validateArtimePayment = async () => {
        try {
            const payload = {
                "customerId": "07062174036",
                "requestId": 12300
            };
        const response = await api.post(`biller/validate/vtu`, payload);
        console.log('Validation response:', response.data);
        toast.success('Successfully validated vtu- Airtime subscription');
        handleAirtimePayment();
        } catch (error) {
        console.error('Error validating vtu- Airtime subscription:', error);
        toast.error(error.response.message);
        }
    };

    const handleAirtimePayment = async () => {
        try {
            const payload = {
                billerId: 'MTN-AIRTIME',
                customerId: '09036461453',
                requestId: '412132',
                amount: '200'
            }
        const response = await api.post(`biller/payment/vtu`, payload);
        console.log('Payment response', response.data);
        toast.success('Successfully made vtu-Airtime payment');
        } catch (error) {
            console.error('Error making vtu-Airtime payment:', error);
            if (error.response && error.response.data && error.response.data.message === "insufficient wallet balance") {
                toast.error('Insufficient wallet balance');
            } else {
                toast.error(error.message);
            }
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
        toast.success('Successfully validated vtu-Data subscription');
        handleDataPayment();
        } catch (error) {
        console.error('Error validating vtu-Data subscription:', error);
        toast.error('Error validating vtu-Data subscription');
        }
    };

    const handleDataPayment = async () => {
        try {
            const payload ={
                "billerId": "MTN-DATA",
                "customerId": "09036461453",
                "requestId": "12473434",
                "amount": 100,
                "bouquetCode": "MTN100MB1Day100"
            }
        const response = await api.post(`biller/payment/vtu`, payload);
        console.log('Payment response', response.data);
        toast.success('Successfully made vtu-Data payment');
        } catch (error) {
            console.error('Error making vtu-Data payment:', error);
            if (error.response && error.response.data && error.response.data.message === "insufficient wallet balance") {
                toast.error('Insufficient wallet balance');
            } else {
                toast.error('Error making vtu-Data payment');
            }
        }
    };

    const validateDiscoPayment = async () => {
        try {
            const payload = 
                {
                    "billerId": "IBEDCA",
                    "customerId": "62420187593",
                    "requestId": 9090909091
                };
        const response = await api.post(`biller/validate/disco`, payload);
        console.log('Validation response:', response.data);
        toast.success('Successfully validated disco payment');
        handleDiscoPayment();
        } catch (error) {
        console.error('Error validating disco payment:', error);
        toast.error('Error validating disco payment');
        }
    };

    const handleDiscoPayment = async () => {
        try {
            const payload =
            {
                "billerId": "IBEDCA",
                "customerId": "62420187593",
                "requestId": "7996909",
                "amount": 300,
                "customerName": "MR LANRE BENSON",
                "customerAddress": "I, 10, SPARKLIGHT ESTATEIBAFO OGUN"
            }
        const response = await api.post(`biller/payment/disco`, payload);
        console.log('Payment response', response.data);
        toast.success('Successfully made disco payment');
        } catch (error) {
            console.error('Error making disco payment:', error);
            if (error.response && error.response.data && error.response.data.message === "insufficient wallet balance") {
                toast.error('Insufficient wallet balance');
            } else {
                toast.error(error.response.data.data.message);
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
    <button className='vasbtn' style={{marginRight:"10px"}} onClick={validateArtimePayment}>Purchase airtime</button>
    <button className='vasbtn' style={{marginRight:"10px"}} onClick={validateInternetSubscription}>Purchase Data</button>
    <button className='vasbtn' onClick={validateDiscoPayment}>Pay Disco bill</button>
    </div>
    </div>
);
};

export default VASpage;
