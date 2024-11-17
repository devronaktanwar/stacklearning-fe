import { FaArrowRightLong } from 'react-icons/fa6';
import blinkit from '../assets/blinkit.svg';
import { Button } from './ui/button';

// Array of featured companies
const featuredCompanies = [
  { name: 'Blinkit', image: blinkit },
  { name: 'Zomato', image: blinkit },
  { name: 'Swiggy', image: blinkit },
  { name: 'Amazon', image: blinkit },
  { name: 'Flipkart', image: blinkit },
];

const FeaturedCompanyBanner = () => {
  return (
    <div>
      <div className="w-[95%] sm:w-[80%] m-auto py-8 px-12 bg-white rounded-lg border-[1px]">
        <h2 className="font-semibold text-xl sm:text-2xl text-center">
          Featured companies hiring now
        </h2>
        <div className="flex justify-center gap-8 mt-12 flex-wrap">
          {featuredCompanies.map((company, index) => (
            <div
              key={index}
              className="p-4 w-[250px] sm:w-[200px] flex flex-col gap-3 items-center border rounded-lg"
            >
              <img src={company.image} alt={company.name} className="w-3/4 sm:w-28" />
              <h2 className="font-semibold">{company.name}</h2>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button className="sm:p-6 border-1 rounded-full bg-transparent border border-primaryNew text-primaryNew text-sm sm:text-lg hover:bg-primaryNew hover:text-white flex items-center space-x-2 group">
            View all companies
            <span className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-2">
              <FaArrowRightLong />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanyBanner;
