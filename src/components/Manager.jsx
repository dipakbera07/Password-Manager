import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [copedIdx, setCopedIdx] = useState(null)
  const [inputTest, setInputTest] = useState(true)
  const copyRef2 = useRef([])

  const [visibilityPass, setVisibilityPass] = useState({})

  const saveToLs = (newform) => {
    localStorage.setItem("passwords", JSON.stringify(newform))
  }


  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }

  }, [])


  const eyeHandler = () => {
    if (!showPassword) {
      // alert("Show the Password")
    }
    setShowPassword(!showPassword)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // console.log(e.target.value)
    // setInputTest(!(form.site && form.username && form.password));
  }

  const savePassword = (e) => {
    if (form.site === "" || form.username === "" || form.password === "") {
      return alert("Enter all details")
    }
    toast.success('Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    console.log(form)
    const newPassword = { ...form, id: uuidv4() }
    const updatedPasswordArray = [...passwordArray, newPassword]
    setPasswordArray(updatedPasswordArray)
    saveToLs(updatedPasswordArray)
    setForm({ site: "", username: "", password: "" })

  }

  const copyChange = (e, val, idx) => {
    toast.success('Copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const text = e.target.dataset.site
    navigator.clipboard.writeText(text)
    e.target.src = "copy-done.png"
    setTimeout(() => {
      e.target.src = "copy.png"
    }, 2000);
  }

  const handleDelete = (id) => {
    alert("Delete Password")
    toast.success('Password Deleted !', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const newForm = passwordArray.filter(item => {
      return item.id != id
    })
    setPasswordArray(newForm)
    saveToLs(newForm)
  }

  const handleEdit = (e, id) => {
    const findToEdit = passwordArray.find(item => { return item.id === id })
    setForm(findToEdit);

    const newForm = passwordArray.filter(item => {
      return item.id != id
    })
    setPasswordArray(newForm)
    saveToLs(newForm)
  }

  const eyeHandler2 = (e, id) => {
    setVisibilityPass(prev => ({
      ...prev,
      [id]: !prev[id] // toggle the visibility
    }));
  }


  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className='container mx-auto lg:mycontainer '>
        <div className='text-3xl md:text-4xl font-bold text-center mt-1'>
          <span className='text-green-500 text-3xl md:text-4xl'>&lt; </span>
          Pass
          <span className='text-green-500 text-3xl md:text-4xl'> OP/&gt;</span>
        </div>
        <p className='text-center'>My Password Manager</p>

        <div className='mt-3 md:mt-5 my-1 px-5 md:px-23 flex flex-col gap-3 md:gap-5'>
          <input onChange={handleChange} className='w-full h-9 px-5 bg-white text-black rounded-full border-1 border-green-600' type="text" placeholder='Enter the URL' name='site' value={form.site} />
          <div className='flex flex-col md:flex-row justify-between relative gap-3 md:gap-0'>
            <input onChange={handleChange} className='px-5 w-[100%] md:w-[49.4%] h-9 bg-white text-black rounded-full border-1 border-green-600' type="text" value={form.username} name='username' placeholder='Enter Username'
            />
            <span onClick={eyeHandler} className='cursor-pointer absolute top-[53px] md:top-[6px] right-[15px] text-[17px]'><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> </span>
            <input onChange={handleChange} className='px-5 w-[100%] md:w-[49.4%] h-9 bg-white text-black rounded-full border-1 border-green-600' type={showPassword ? "text" : "password"} placeholder='Enter Password' name='password' value={form.password} />
          </div>

          <div className='flex justify-center item-center mb-2'>
            <button onClick={savePassword} className='gap-1 border-1 text-[15px] md:text-[17px] text-black border-black cursor-pointer    bg-green-600 rounded-full px-2 py-[2px] flex justify-center items-center hover:bg-green-500 ' >
              <lord-icon className="size-7 md:size-8 "
                src="https://cdn.lordicon.com/tsrgicte.json"
                trigger="hover"

              >
              </lord-icon>
              Save Password</button>
          </div>
        </div>
      </div>
      <div className='w-[93%] md:w-[100%] px-0 md:px-15  lg:container m-auto lg:px-20 '>
        <h1 className='text-[20px] md:text-[23px] mb-2 font-bold '>Your Passwords</h1>
        <div className='overflow-x-auto '>
        <table className='min-w-120 w-full gap-1 table-auto ' style={{ tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "38%" }} />
            <col style={{ width: "23%" }} />
            <col style={{ width: "27%" }} />
            <col style={{ width: "13%" }} />
          </colgroup>
          {passwordArray.length === 0 ?
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4 text-[17px]">
                  No Passwords to display
                </td>
              </tr>
            </tbody>
            : <thead className='bg-green-700'>
              <tr className='text-white'>
                <th className='py-2 text-[10px] md:text-[17px]'>Site</th>
                <th className='py-2 text-[10px] md:text-[17px]'>Username</th>
                <th className='py-2 text-[10px] md:text-[17px]'>Password</th>
                <th className='py-2 text-[10px] md:text-[17px]'>Action</th>
              </tr>
            </thead>
          }

          <tbody className='bg-[#caffdf]'>
            {passwordArray.map((item, idx) => {
              //  { console.log(item.site)}
              return <tr key={idx} className='w-full'>
                <td className='break-words py-2  border-1 border-white  px-2 whitespace-normal'>
                  <div className='flex justify-center items-center relative break-words whitespace-normal'>
                    <a href={item.site} className='w-full truncate pr-6 text-[12px] md:text-[17px]' target='_blank'>{item.site}</a>
                    <img data-site={item.site} id={`site-${idx}`} onClick={copyChange} className='red  h-[15px] md:h-[18px] cursor-pointer pl-3 absolute right-0' src="copy.png" alt="" />
                  </div>
                </td>
                <td className='break-words py-2 border-1 border-white px-2 whitespace-normal'>
                  <div className='flex justify-center items-center relative whitespace-normal'>
                    <span className='w-full truncate pr-6 text-[12px] md:text-[17px]'>{item.username}</span>
                    <img id={`username-${idx}`} data-site={item.username} onClick={copyChange} className=' h-[15px] md:h-[18px] cursor-pointer pl-3 absolute right-0' src="copy.png" alt="" />
                  </div>
                </td>
                <td className='break-words py-2  border-1 border-white  px-2 whitespace-normal'>
                  <div className='flex justify-center items-center relative whitespace-normal'>
                    <span className='w-[87%] md:w-full truncate pr-6 text-[12px] md:text-[17px]'>{visibilityPass[item.id]? item.password : "*".repeat(item.password.length)} </span>

                    <span ref={(el)=>{copyRef2.current[idx]=el}} onClick={(e)=>{eyeHandler2(e,item.id)}} className='cursor-pointer absolute top[-1px] md:top-[1px] right-[20px] md:right-[29px] text-[14px] md:text-[16px]'><FontAwesomeIcon icon={visibilityPass[item.id]?faEyeSlash:faEye} /> </span>

                    <img id={`password-${idx}`} data-site={item.password} onClick={(e) => { copyChange(e, item.password, idx) }} className=' h-[15px] md:h-[18px] cursor-pointer ml-3 absolute right-0' src="copy.png" alt="" />
                  </div>
                </td>
                <td className='break-words py-2 text-center border-1 border-white relative'>
                  <div className='flex justify-center items-center whitespace-normal'>
                    <FontAwesomeIcon onClick={(e) => { handleEdit(e, item.id) }} className='text-[13px] md:text-[17px]  cursor-pointer' icon={faPenToSquare} />
                    <FontAwesomeIcon onClick={() => { handleDelete(item.id) }} className='text-[13px] md:text-[17px] ml-3 md:ml-4 cursor-pointer' icon={faTrash} />
                  </div>
                </td>
              </tr>
            })}
          </tbody>
        </table>

        </div>

      </div>

    </div>
  )
}


export default Manager