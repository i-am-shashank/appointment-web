import { useState, useRef } from 'react';

// Manually import all images from ../assets/help_img
import img1 from '../assets/help_images/img_1.jpg';
import img2 from '../assets/help_images/img_2.jpg';
import img3 from '../assets/help_images/img_3.jpg';
import img4 from '../assets/help_images/img_4.jpg';
import img5 from '../assets/help_images/img_5.jpg';
import img6 from '../assets/help_images/img_6.jpg';
import img7 from '../assets/help_images/img_7.jpg';
import img8 from '../assets/help_images/img_8.jpg';
import img9 from '../assets/help_images/img_9.jpg';
import img10 from '../assets/help_images/img_10.jpg';
import img11 from '../assets/help_images/img_11.jpg';
import img12 from '../assets/help_images/img_12.jpg';
import img13 from '../assets/help_images/img_13.jpg';
import img14 from '../assets/help_images/img_14.jpg';
import img15 from '../assets/help_images/img_15.jpg';
import img16 from '../assets/help_images/img_16.jpg';
import img17 from '../assets/help_images/img_17.jpg';
import img18 from '../assets/help_images/img_18.jpg';
import img19 from '../assets/help_images/img_19.jpg';

const SalesPitch = () => {
    // Array of all imported images
    const images = [
        img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
        img11, img12, img13, img14, img15, img16, img17, img18, img19
    ];

    // State to track which image index is zoomed
    const [zoomedIndex, setZoomedIndex] = useState(null);

    // Reference for the gallery container
    const galleryRef = useRef(null);

    // Function to handle click on an image (to zoom in)
    const handleImageClick = (index) => {
        setZoomedIndex(index);
    };

    // Function to handle closing the zoomed image
    const closeZoom = () => {
        setZoomedIndex(null);
    };

    // Function to show the next image
    const showNextImage = (e) => {
        e.stopPropagation(); // Prevent closing zoom on button click
        setZoomedIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to show the previous image
    const showPrevImage = (e) => {
        e.stopPropagation(); // Prevent closing zoom on button click
        setZoomedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Scroll gallery to the left
    const scrollLeft = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollBy({
                left: -200, // Amount to scroll
                behavior: 'smooth',
            });
        }
    };

    // Scroll gallery to the right
    const scrollRight = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollBy({
                left: 200, // Amount to scroll
                behavior: 'smooth',
            });
        }
    };

    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <h1 className='text-3xl font-medium'>A part of our earning goes to..</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                We help hundreds of children with education, food, general awareness, all free of cost.
            </p>


            {/* Horizontal scrollable gallery */}
            <div
                className='flex gap-4 pt-5 w-full overflow-x-auto px-8 no-scrollbar scroll-smooth'
                ref={galleryRef}
            >
                {/* Gallery images */}
                {images.map((imgSrc, index) => (
                    <img
                        key={index}
                        src={imgSrc}
                        alt={`gallery-img-${index + 1}`}
                        className='w-32 h-32 object-cover rounded-lg cursor-pointer flex-shrink-0'
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </div>

            <div className='flex gap-2 text-primary'>
                {/* Left Scroll Button */}
                <button
                    onClick={scrollLeft}
                    className='text-5xl px-5 py-2 rounded-md hover:scale-110 active:scale-90 transition-transform duration-300 ease-in-out'
                >
                    ◄
                </button>

                {/* Right Scroll Button */}
                <button
                    onClick={scrollRight}
                    className='text-5xl px-5 py-2 rounded-md hover:scale-110 active:scale-90 transition-transform duration-300 ease-in-out'
                >
                    ►
                </button>
            </div>


            {/* Zoomed image overlay */}
            {zoomedIndex !== null && (
                <div
                    className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center p-4'
                    onClick={closeZoom}
                >
                    {/* Left arrow button */}
                    <button
                        onClick={showPrevImage}
                        className='absolute left-40 text-white text-3xl px-4 py-2 rounded-full bg-gray-800 bg-opacity-50'
                    >
                        &#8592;
                    </button>

                    {/* Zoomed image */}
                    <img
                        src={images[zoomedIndex]}
                        alt={`zoomed-img-${zoomedIndex}`}
                        className='max-w-full max-h-full object-contain rounded-md'
                    />

                    {/* Right arrow button */}
                    <button
                        onClick={showNextImage}
                        className='absolute right-40 text-white text-3xl px-4 py-2 rounded-full bg-gray-800 bg-opacity-50'
                    >
                        &#8594;
                    </button>
                </div>
            )}
        </div>
    );
};

export default SalesPitch;
