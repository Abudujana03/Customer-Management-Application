import React, { useState, useEffect, useCallback } from 'react';
const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1); 

  const fetchPhotos = useCallback(async () => {
    try {
        
      const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=office&per_page=9&client_id=YOUR_ACCESS_KEY`);
      const data = await response.json();
      console.log(data);
      if (data.results && data.results.length > 0) {
        setPhotos(data.results.map((photo: any) => photo.urls.small));
        setPage(prevPage => prevPage + 1); 
        console.log(page);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }, [page]);


  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPhotos(); 
    }, 10000);

    return () => clearInterval(interval); 
  }, [fetchPhotos]);

  return (
    <div className="grid grid-cols-3 gap-4 max-w-full max-h-screen overflow-auto">
      {photos.map((photo, index) => (
        <div key={index} className=" relative overflow-hidden w-[20rem] h-[9.5em]  border rounded-xl hover:scale-90 transition-transform duration-300 transform">
        <img
          src={photo}
          alt={`photo-${index}`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
