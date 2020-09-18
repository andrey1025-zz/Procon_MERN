const settings = {
    dev: {
      apiUrl: 'http://localhost:4000/api'
    },
    prod: {
      apiUrl: 'http://localhost:4000/api'
    },
  };
  
  const getCurrentSettings = () => {
    if (process.env.NODE_ENV === "development")
      return settings.dev;
    return settings.prod;
  };
  
  export default getCurrentSettings();
  