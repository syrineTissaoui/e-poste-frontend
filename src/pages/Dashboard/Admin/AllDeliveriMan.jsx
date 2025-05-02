import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { PiArrowSquareLeftFill, PiArrowSquareRightFill } from 'react-icons/pi';

const AllDeliveryMan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:5000/api/utilisateurs/get-livreurs');
      return data;
    },
  });

  const deliveryMen = users // Change to 'admin' if needed

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeliveryMen = deliveryMen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(deliveryMen.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-3xl font-bold py-8 text-center text-blue-600 bg-yellow-200">
        Tous Les Livreurs ({deliveryMen.length})
      </h1>
      <div className="overflow-x-auto">
        <div className="min-w-full shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-gray-700">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase">Phone</th>
                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Rating</th>
                <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Parcels</th>
              </tr>
            </thead>
            <tbody>
              {currentDeliveryMen.map((deliveryMan) => (
                <tr key={deliveryMan._id}>
                  <td className="px-5 py-5 border-b bg-white text-sm">{deliveryMan.nom || 'N/A'}</td>
                  <td className="px-4 py-5 border-b bg-white text-sm">{deliveryMan.email}</td>
                  <td className="px-4 py-5 border-b bg-white text-sm">{deliveryMan.telephone || 'N/A'}</td>
                  <td className="px-5 py-5 border-b bg-white text-sm">{deliveryMan.averageRating || '0.0'}</td>
                  <td className="px-5 py-5 border-b bg-white text-sm">{deliveryMan.totalReviews || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`pr-2 rounded-lg flex items-center border text-sm font-medium ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 border-gray-300 hover:bg-gray-100'}`}
          >
            <PiArrowSquareLeftFill size={40} /> Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-5 py-2 mx-2 rounded-full border text-sm font-medium ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-gray-300 hover:bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`pl-2 rounded-lg flex items-center border text-sm font-medium ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 border-gray-300 hover:bg-gray-100'}`}
          >
            <span className="px-2">Next</span> <PiArrowSquareRightFill size={40} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
