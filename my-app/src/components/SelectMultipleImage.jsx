import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

const Button = () => {
  const [imageChange, setImageChange] = useState([]);
  const imageSet = useRef();

  const handleBtn = () => {
    imageSet.current.click();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const fileReaderPromises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaderPromises).then((results) => {
      setImageChange(results);
    });
  };

  return (
    <div>
      <label htmlFor="image"></label>
      <div>
        <input
          className={styles.inputData}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name="image"
          ref={imageSet}
          onChange={handleImageChange}
          multiple
        />
      </div>
      <button className={styles.btn} type="button" onClick={handleBtn}>
        Images Picker
      </button>
      <div className={styles.imageBox}>
        {!imageChange.length && <p>There are no images</p>}
        {imageChange.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Button;
