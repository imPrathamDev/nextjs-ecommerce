import connectdb from "../../../utils/connectMongo";
import Address from "../../../models/Address";
import User from "../../../models/Users";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, firstName, lastName, address, city, state, pincode, phone } = req.body;
        if (firstName.length > 0 && lastName.length > 0 && address.length > 0 && city.length > 0 && state.length > 0) {
            try {
                await connectdb();
                const countUser = await User.countDocuments({ _id: userId });
                if (countUser === 1) {
                    const verifyPincode = await fetch(`https://api.postalpincode.in/pincode/${parseInt(pincode)}`).then((response) => response.json());
                    if (verifyPincode?.[0]?.Status === 'Success') {
                        const response = await Address.create({ userId, firstName, lastName, address, city, state, pincode, phone: parseInt(phone), country: 'India' });
                        res.status(200).json({ success: true });
                    } else {
                        res.json({ success: false, error: 'Invalid Pincode' });
                    }
                } else {
                    res.json({ success: false, error: 'Invalid Request' });
                }

            } catch (error) {
                res.json({ success: false, error: error.message });
            }
        } else {
            res.json({ success: false, error: 'Invalid Request' });
        }
    } else if (req.method === 'PUT') {
        const { userId, addressId, firstName, lastName, address, city, state, pincode, phone } = req.body;
        if (firstName.length > 0 && lastName.length > 0 && address.length > 0 && city.length > 0 && state.length > 0) {
            try {
                await connectdb();
                const countUser = await User.countDocuments({ _id: userId });
                if (countUser === 1) {
                    const countAddress = await Address.countDocuments({ _id: addressId });
                    if (countAddress === 1) {
                        const verifyPincode = await fetch(`https://api.postalpincode.in/pincode/${parseInt(pincode)}`).then((response) => response.json());
                        if (verifyPincode?.[0]?.Status === 'Success') {
                            const response = await Address.findByIdAndUpdate(addressId, { userId, firstName, lastName, address, city, state, pincode, phone: parseInt(phone), country: 'India' });
                            res.status(200).json({ success: true });
                        } else {
                            res.json({ success: false, error: 'Invalid Pincode' });
                        }
                    } else {
                        res.json({ success: false, error: 'Invalid Request g' });
                    }
                } else {
                    res.json({ success: false, error: 'Invalid Request' });
                }
            } catch (error) {
                res.json({ success: false, error: error.message });
            }
        } else {
            res.json({ success: false, error: 'Invalid Request h' });
        }
    } else if (req.method === 'DELETE') {
        const { userId, addressId } = req.body;
        try {
            await connectdb();
            const countUser = await User.countDocuments({ _id: userId });
            if (countUser === 1) {
                const countAddress = await Address.countDocuments({ _id: addressId });
                if (countAddress === 1) {
                    await Address.findByIdAndDelete(addressId);
                    res.json({ success: true })
                } else {
                    res.json({ success: false, error: 'Invalid Request' });
                }
            } else {
                res.json({ success: false, error: 'Invalid Request' });
            }
        } catch (error) {

        }
    } else {
        res.json({ success: false, error: 'Invalid Request Method' });
    }
}