const getTransictionURL = (product) => {
    let upi = {
        pa: import.meta.env.VITE_UPI_ID,
        pn: product.name,
        tn: "Appointment- Talk to Thrive",
        am: product.fees,
        cu: "INR"
    }
    let upiLink = new URLSearchParams(upi).toString();
    return `upi://pay?${upiLink}`;
}

export { getTransictionURL }