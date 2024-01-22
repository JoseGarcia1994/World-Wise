import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { convertToEmoji } from "../helpers/index.js";
import useUrlPosition from "../hooks/useUrlPosition.js";

import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import Message from './Message.jsx';
import Spinner from './Spinner.jsx';
import styles from "./Form.module.css";
import { useCities } from "../context/CitiesContext.jsx";
import { useNavigate } from "react-router-dom";

const BASE_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client"

const Form = () => {
  const [lat, lng] = useUrlPosition();
  const {createCity, isLoading} = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, SetGeocodingError] = useState("")
  
  useEffect(() => {
    if (!lat && !lng) return;

    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        SetGeocodingError("")

        const res = await fetch(`${BASE_Url}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if(!data.countryCode) throw new Error('That does not seem to be a city. Click somewhere else 😊');

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch(err) {
        SetGeocodingError(err.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData();
  }, [lat, lng])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng}
    }

    await createCity(newCity)
    navigate('/app/cities')
  }
  
  if (isLoadingGeocoding) return <Spinner />

  if(!lat && !lng) return <Message message="Start by clicking on the map" />

  if (geocodingError) return <Message message={geocodingError}/>

  return (
    <form 
      className={`${styles.form} ${isLoading ? styles.loading : ''}`} 
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date" 
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button type='submit' className={styles.btn}>Add</button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;