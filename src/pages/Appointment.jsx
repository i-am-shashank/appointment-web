import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { packId } = useParams();
    const { packages, currencySymbol, backendUrl, token, getPackagesData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [packInfo, setPackInfo] = useState(null);
    const [slots, setSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    const fetchPackInfo = () => {
        const pack = packages.find(doc => doc._id === packId);
        setPackInfo(pack);
    };

    const getAvailableSlots = async () => {
        const today = new Date();
        const allSlots = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            const endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            // Set starting hour for today or future dates
            if (i === 0) {
                currentDate.setHours(today.getHours() > 10 ? today.getHours() + 1 : 10, today.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10, 0);
            }

            const timeSlots = [];

            while (currentDate < endTime) {
                const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

                const isSlotAvailable = !packInfo.slots_booked[slotDate]?.includes(formattedTime);
                if (isSlotAvailable) {
                    timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            allSlots.push(timeSlots);
        }

        setSlots(allSlots);
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment');
            return navigate('/login');
        }

        const date = slots[slotIndex][0]?.datetime;
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { packId, slotDate, slotTime }, { headers: { token } });
            toast[data.success ? 'success' : 'error'](data.message);
            if (data.success) {
                getPackagesData();
                navigate('/my-appointments');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (packages.length > 0) {
            fetchPackInfo();
        }
    }, [packages]);

    useEffect(() => {
        if (packInfo) {
            getAvailableSlots();
        }
    }, [packInfo]);

    if (!packInfo) return null;
    console.log('yo');
    
    return (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={packInfo.image} alt={packInfo.name} />

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                        {packInfo.name} <img className='w-5' src={assets.verified_icon} alt="Verified" />
                    </p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>{packInfo.duration} minutes</button>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="Info" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{packInfo.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>Package fee: <span className='text-gray-800'>{currencySymbol}{packInfo.fees}</span></p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {slots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0]?.datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {slots[slotIndex]?.map((item, index) => (
                        <p
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>
        </div>
    );
};

export default Appointment;
