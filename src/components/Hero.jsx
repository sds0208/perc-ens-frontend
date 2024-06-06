const Hero = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
    </>
  );
};

export default Hero;
