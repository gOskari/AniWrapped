'use client'
import React, { useEffect, useState } from 'react';
import { FetchUserData } from '../../data_query.js';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BaseData from './BaseData.js';

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchUserData(params.name);
        // Simulate a delay for testing loading
        setTimeout(() => {
          setData(response);
          setLoading(false); // Set loading to false when the data is fetched
        }, 2000); // 2-second delay (adjust as needed)
      } catch (error) {
        // Handle errors here
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [params.name]);

  return (
    <>
    {loading ? (
      <SkeletonTheme baseColor="#0B1622" highlightColor="#151F2E">
      <div className='flex h-screen items-center justify-center flex-col'>
        <div className="flex items-center justify-center flex-col gap-10">
          <div className="">
            <Skeleton circle width={100} height={100} duration={2}/>
          </div>
          <div>
            <h1 className="text-3xl"><Skeleton width={150} height={45}/></h1>
          </div>
          <div className="text-2xl">
            <div className="flex gap-10 justify-between">
              <span><Skeleton width={300} height={35}/></span>
            </div>
            <div className="flex gap-10 justify-between">
              <span><Skeleton width={300} height={35}/></span>
            </div>
          </div>
        </div>
      </div>
      </SkeletonTheme>
    ) : (
      <div className='flex h-screen items-center justify-center flex-col'>
        <BaseData data={data}/>
      </div>
    )}
    </>
  );
}
