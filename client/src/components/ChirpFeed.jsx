// import React, { useEffect, useState } from 'react';
// import { useSelector } from "react-redux"
// import { useEffect } from 'react';

// const ChirpFeed = () => {
//     const [feed, setFeed ] = useState(null);

//     const { currentUser } = useSelect((state) => state.user);

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const ChirpFeed = await axios.get(`/chirps/chirpFeed/${currentUser._id}`)
//         } catch (error) {}
//     };
// });

//   return (
//     <div>ChirpFeed</div>
//   )
// }

// export default ChirpFeed