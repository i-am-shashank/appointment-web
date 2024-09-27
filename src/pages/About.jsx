import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="my-4 flex flex-col md:flex-row gap-12 justify-start">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <div className="text-center text-2xl pt-10 text-[#707070]">
            <p>ABOUT</p>
          </div>
          <p>
            Meeta Joshi is an accomplished professional with extensive
            experience in education, project management, and social sector work.
            She served as an Assistant Professor at Amrapali University from
            2019 to 2023 and previously held the position of District
            Coordinator for the World Bank Aided Programme from 2006 to 2015,
            where she oversaw significant social sector projects, engaged with
            local communities, and presented project outcomes at various forums.</p>
            <br/>
            <p> In addition, Meeta worked as a founnder principal and led Lord
            Krishna Public School and has a strong background in teaching
            English and enhancing communication skills. Her academic
            qualifications include M.A. degrees in Rural Development,
            Psychology, and English Literature, along with certifications in
            guidance and learning disabilities. Currently, she is actively
            involved with the Wonder Brains Foundation, supporting
            underprivileged children while also working as a freelance
            counselor.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE: </b>
          <p>
            Browse through professionally designed packages to suit your requirements.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Choose your ideal session mode that suits you the best:
          </p>
          <ul className="list-disc">
            <li>📞 Phone Call</li>
            <li>💻 Video Conference</li>
            <li>🏢 In-Person Meet</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
