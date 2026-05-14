useEffect(() => {
  const interval = setInterval(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      await axios.post("http://localhost:5000/api/business/heartbeat", {
        owner: user.name,
        name: serviceName,
        type: serviceType,
        lat,
        lng,
      });
    });
  }, 15000);

  return () => clearInterval(interval);
}, []);