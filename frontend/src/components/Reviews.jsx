import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons

const Reviews = ({ review }) => {
    return (
        <div className="rounded-lg shadow-lg p-4 mb-2 transition-transform duration-300 hover:shadow-xl overflow-hidden">
            <div className="flex items-start mb-4">
                <img 
                    src={`https://i.pravatar.cc/150?u=${review.reviewerEmail}`} 
                    alt={`${review.reviewerName}'s avatar`} 
                    className="w-12 h-12 rounded-full border border-gray-300 mr-4"
                />
                <div>
                    <h3 className="text-xl font-semibold ">{review.reviewerName}</h3>
                    <span className="text-sm ">{new Date(review.date).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="flex items-center mb-1">
                {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={`h-5 w-5 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                ))}
            </div>
            <p className="mb-1 italic">{review.comment}</p>
            <div className="text-sm ">Email: <span className="font-medium">{review.reviewerEmail}</span></div>
        </div>
    );
};

export default Reviews;
