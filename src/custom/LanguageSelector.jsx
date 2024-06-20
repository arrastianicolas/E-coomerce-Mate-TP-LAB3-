import useTraduction from "./UseTraduction";

const LanguageSelector = () => {
  const { setLanguage } = useTraduction();

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <select onChange={handleChangeLanguage}>
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;
