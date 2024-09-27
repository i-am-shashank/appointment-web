import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {QRCodeSVG} from 'qrcode.react'
import { getTransictionURL } from '../helpers'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.packData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <div className='flex'>
                                <p className='text-[#262626] text-base font-semibold'>{item.packData.name}</p>
                                <p className='ml-2 py-0.5 px-2 border text-xs rounded-full'>{item.packData.duration} minutes</p>
                            </div>
                            <p>{item.packData.about}</p>

                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div>
                            {/* {upiLink} */}
                            <QRCodeSVG value={getTransictionURL(item)} size={128} /> {/* Generate and display QR code */}
                        </div>    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments