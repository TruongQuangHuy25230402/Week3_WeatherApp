// WeatherApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const API_KEY = '8f6452fa4aea027a27500e1a8dc1fcf1'; // Sử dụng API key của bạn

  // Hàm hiển thị ngày và giờ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    if (city === '') {
      setError('Vui lòng nhập tên thành phố');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(''); // Xóa thông báo lỗi nếu có
    } catch (err) {
      setError('Không tìm thấy thành phố này');
      setWeatherData(null);
    }
  };


   // Hàm định dạng ngày theo kiểu dd/mm/yyyy
   const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dự báo thời tiết</h1>

      {/* Hiển thị ngày giờ hiện tại */}
      <h2>Ngày giờ hiện tại: {formatDate(currentDateTime)} {currentDateTime.toLocaleTimeString()}</h2>

      <input
        type="text"
        placeholder="Nhập tên thành phố"
        value={city}
        onChange={handleCityChange}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={fetchWeather} style={{ padding: '10px', marginLeft: '10px' }}>
        Xem thời tiết
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Nhiệt độ: {weatherData.main.temp}°C</p>
          <p>Độ ẩm: {weatherData.main.humidity}%</p>
          <p>Hướng gió: {weatherData.wind.deg}°</p>
          <p>Áp suất khí quyển: {weatherData.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
