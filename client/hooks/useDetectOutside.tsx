import React, { use, useEffect } from 'react'

interface UseDetectOutside {
  ref: React.RefObject<HTMLElement|null>;
  callback: () => void;
}

const useDetectOutside = ({ref , callback}: UseDetectOutside) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        // add event listener for mousedown
        document.addEventListener('mousedown', handleClickOutside);

        // cleanup function to remove the event listener
        return () => {  
            document.removeEventListener('mousedown', handleClickOutside);
        }

       
    }
    ,[ ref, callback]);

  return ref;
}

export default useDetectOutside