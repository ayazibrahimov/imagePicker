import React, { useRef,useState } from 'react'
import styles from './styles.module.css'

const Button = () => {
    const[imageChange,setImageChange] = useState()
    const imageSet = useRef()

    const handleBtn = ()=>{
        imageSet.current.click()
    }


    const handleImageChange = (event) =>{
        const file = event.target.files[0];

        if(!file){
            return;
        }

        const fileReader = new FileReader()

        fileReader.onload = ()=>{
            setImageChange(fileReader.result)
        }

        fileReader.readAsDataURL(file)
       
    }


  return (
    <div>
        <label htmlFor="image"></label>
        <div>
        <input 
          className={styles.inputData}
          type="file"
          id='image' 
          accept='image/png, image/jpeg'
          name='iamge' 
          ref={imageSet}
          onChange={handleImageChange}
        //   multiple
         />  
        </div> 
        <button 
          className={styles.btn}
          type='button'
          onClick={handleBtn}
          >Image Picker</button>
          <div className={styles.imageBox}>
            {!imageChange && <p>There is no image</p> }
            {imageChange &&
                <img src={imageChange} alt="" /> }
          </div>
    </div>
  )
}

export default Button