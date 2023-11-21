import Sidebar from "components/Sidebar/index"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Welcome from "components/MyProject/Welcome";

export default function index(){

  useEffect(() => {
    // router.replace('/dashboard');
  }, []);

  return(
    <div className="d-flex flex-column main-container-i me-0 ms-0 w-100">
    <Welcome/>
    </div>
  )

}